#!/usr/bin/env python3
"""Rebuild Ovora Labs vial photos from the approved GHK-CU master.

The master photo is copied unchanged except for two label strings: the
product name (where "GHK-CU" sits) and the strength (where "50 MG" sits).
Removal fills those pixels from the label's own neighbors, so the vial,
cap, lighting, background, molecule, wave, and the rest of the label stay
put. Nothing here is generative.

Rerun from the repo root:

    pip install -r scripts/requirements-product-images.txt
    python scripts/generate_product_images.py

Nasal sprays are skipped. A vial photo would show the wrong container;
the site draws those with the nasal-spray illustration.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
REFERENCE = ROOT / "scripts" / "assets" / "ghk-cu-reference.jpg"
FONT_PATH = ROOT / "scripts" / "fonts" / "Montserrat-Variable.ttf"
PRODUCTS_TS = ROOT / "src" / "data" / "products.ts"
OUT_DIR = ROOT / "public" / "images" / "products"
CONTACT_SHEET = ROOT / "scripts" / "contact-sheet.jpg"

# Measured on the 1086×1448 master. Ink edges, not the em box.
NAME_LEFT = 384
NAME_TOP = 634
NAME_BASELINE = 669
NAME_MAX_RIGHT = 610  # stays left of the rule's terminal dot (~x622)
NAME_SIZE = 50
NAME_TRACKING = 3.0
NAME_WEIGHT = 520

DOSE_RIGHT = 665
DOSE_TOP = 1042
DOSE_BASELINE = 1056
DOSE_MIN_LEFT = 530  # clear of "Research Use Only"
DOSE_SIZE = 20
DOSE_TRACKING = 0.5
DOSE_WEIGHT = 660

# Darkest cores of the master type, sampled inside the letter strokes.
INK = (18, 32, 52)
SUPERSAMPLE = 4
WEBP_QUALITY = 92

# Regions the script is allowed to change. Everything outside must match
# the master pixel for pixel before the WebP encode.
NAME_EDIT = (600, 692, 350, 640)  # y0, y1, x0, x1
DOSE_EDIT = (1020, 1090, 520, 730)

GHK_SLUG = "ghk-cu-50mg"


def load_products(path: Path) -> list[dict[str, str]]:
    text = path.read_text()
    start = text.index("export const products")
    end = text.index("];", start)
    products: list[dict[str, str]] = []
    for match in re.finditer(r"\{([^{}]+)\}", text[start:end]):
        raw = match.group(1)

        def field(name: str) -> str | None:
            found = re.search(rf'{name}:\s*"([^"]*)"', raw)
            return found.group(1) if found else None

        slug = field("slug")
        name = field("name")
        dose = field("dose")
        form = field("form")
        if not slug or not name or not dose or not form:
            raise SystemExit(f"Could not parse a product block:\n{raw}")
        products.append({"slug": slug, "name": name, "dose": dose, "form": form})
    if not products:
        raise SystemExit(f"No products parsed from {path}")
    return products


def label_name(name: str) -> str:
    """Catalog name, set in the master's uppercase label style."""
    return name.upper()


def label_dose(dose: str) -> str:
    """'50MG' -> '50 MG', '2000IU' -> '2000 IU', '5+5MG' -> '5+5 MG'."""
    compact = re.sub(r"\s+", "", dose).upper()
    match = re.match(r"(.+?)(MG|ML|IU)$", compact)
    if not match:
        return compact
    return f"{match.group(1)} {match.group(2)}"


def load_font(size_px: float, weight: float) -> ImageFont.FreeTypeFont:
    font = ImageFont.truetype(str(FONT_PATH), max(1, int(round(size_px))))
    values: list[float] = []
    for axis in font.get_variation_axes() or []:
        axis_name = axis["name"].decode().lower()
        if "weight" in axis_name or axis_name == "wght":
            values.append(float(min(axis["maximum"], max(axis["minimum"], weight))))
        else:
            values.append(float(axis["default"]))
    if values:
        font.set_variation_by_axes(values)
    return font


def render_text(text: str, size: float, tracking: float, weight: float) -> Image.Image:
    """Supersampled string. Tracking is extra pixels between glyphs at 1x."""
    scale = SUPERSAMPLE
    font = load_font(size * scale, weight)
    widths = [font.getlength(ch) for ch in text]
    width = int(sum(widths) + tracking * scale * max(0, len(text) - 1) + scale * 8)
    height = int(size * scale * 2.6) + 4
    canvas = Image.new("RGBA", (max(width, 4), max(height, 4)), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    x = float(scale)
    for char, advance in zip(text, widths):
        draw.text((x, scale), char, font=font, fill=INK + (255,))
        x += advance + tracking * scale
    canvas = canvas.resize(
        (max(1, canvas.size[0] // scale), max(1, canvas.size[1] // scale)),
        Image.Resampling.LANCZOS,
    )
    alpha = np.array(canvas.getchannel("A"))
    ys, xs = np.where(alpha > 8)
    if len(xs) == 0:
        raise SystemExit(f"Rendered text was empty: {text!r}")
    return canvas.crop((int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1))


def fit_width(text: str, size: float, tracking: float, weight: float, limit: int) -> Image.Image:
    """Shrink size and tracking together until the ink fits in `limit` pixels."""
    rendered = render_text(text, size, tracking, weight)
    for _ in range(8):
        if rendered.size[0] <= limit:
            return rendered
        factor = limit / rendered.size[0]
        size *= factor
        tracking *= factor
        rendered = render_text(text, size, tracking, weight)
    if rendered.size[0] > limit + 1:
        raise SystemExit(f"{text!r} is {rendered.size[0]}px wide; limit is {limit}px")
    return rendered


def horizontal_fill(image: np.ndarray, mask: np.ndarray) -> np.ndarray:
    """Replace masked pixels by interpolating the row's own unmasked neighbors.

    Wave lines on this label run across the row, so a horizontal blend keeps
    them continuous through the old type. The name sits on a smooth gradient
    and comes back the same way.
    """
    out = image.copy()
    ys, xs = np.where(mask > 0)
    if len(ys) == 0:
        return out
    width = image.shape[1]
    for y in range(int(ys.min()), int(ys.max()) + 1):
        row = mask[y] > 0
        x = 0
        while x < width:
            if not row[x]:
                x += 1
                continue
            x0 = x
            while x < width and row[x]:
                x += 1
            x1 = x
            if x0 == 0 or x1 >= width:
                continue
            left = image[y, x0 - 1].astype(np.float32)
            right = image[y, x1].astype(np.float32)
            span = x1 - x0
            t = (np.arange(1, span + 1) / (span + 1))[:, None]
            out[y, x0:x1] = np.round(left * (1 - t) + right * t).astype(np.uint8)
    return out


def text_mask(luminance: np.ndarray, box: tuple[int, int, int, int], kernel: int, delta: float, dilate: int) -> np.ndarray:
    """Dark type against the local label, then a halo so JPEG ringing goes too."""
    y0, y1, x0, x1 = box
    roi = luminance[y0:y1, x0:x1]
    element = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kernel, kernel))
    closed = cv2.morphologyEx(roi, cv2.MORPH_CLOSE, element)
    ink = (closed - roi) > delta
    mask = np.zeros(luminance.shape, np.uint8)
    mask[y0:y1, x0:x1] = ink.astype(np.uint8) * 255
    element = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    mask = cv2.dilate(mask, element, iterations=dilate)
    clip = np.zeros_like(mask)
    pad = dilate + 2
    height, width = luminance.shape
    clip[max(0, y0 - pad) : min(height, y1 + pad), max(0, x0 - pad) : min(width, x1 + pad)] = 255
    return cv2.bitwise_and(mask, clip)


def cleared_master(source: np.ndarray) -> np.ndarray:
    luminance = source.mean(axis=2).astype(np.float32)
    name = text_mask(luminance, (612, 688, 360, 630), kernel=31, delta=7, dilate=8)
    # Keep the rule, its dot, and the OVORA mark.
    name[688:, :] = 0
    name[:, 626:] = 0
    name[:612, :] = 0
    dose = text_mask(luminance, (1026, 1078, 570, 700), kernel=19, delta=9, dilate=6)
    # Keep "Research Use Only" and the purity badge.
    dose[:1030, :] = 0
    dose[:, :560] = 0
    filled = horizontal_fill(source, name)
    return horizontal_fill(filled, dose)


def paste(base: Image.Image, sprite: Image.Image, x: int, y: int) -> None:
    if x < 0 or y < 0 or x + sprite.size[0] > base.size[0] or y + sprite.size[1] > base.size[1]:
        raise SystemExit(f"Text at ({x},{y}) size {sprite.size} falls off the {base.size} canvas")
    base.paste(sprite, (x, y), sprite)


def compose(master: np.ndarray, blank: np.ndarray, name: str, dose: str) -> tuple[np.ndarray, dict]:
    image = Image.fromarray(blank).convert("RGBA")
    name_sprite = fit_width(name, NAME_SIZE, NAME_TRACKING, NAME_WEIGHT, NAME_MAX_RIGHT - NAME_LEFT)
    name_y = NAME_BASELINE - name_sprite.size[1] + 1
    paste(image, name_sprite, NAME_LEFT, name_y)

    dose_sprite = fit_width(dose, DOSE_SIZE, DOSE_TRACKING, DOSE_WEIGHT, DOSE_RIGHT - DOSE_MIN_LEFT)
    dose_x = DOSE_RIGHT - dose_sprite.size[0] + 1
    dose_y = DOSE_BASELINE - dose_sprite.size[1] + 1
    paste(image, dose_sprite, dose_x, dose_y)

    out = np.array(image.convert("RGB"))
    assert_only_label_text_changed(master, out)
    info = {
        "name_px": name_sprite.size,
        "dose_px": dose_sprite.size,
        "name_scaled": name_sprite.size[1] < 34,
    }
    return out, info


def assert_only_label_text_changed(master: np.ndarray, edited: np.ndarray) -> None:
    editable = np.zeros(master.shape[:2], dtype=bool)
    for y0, y1, x0, x1 in (NAME_EDIT, DOSE_EDIT):
        editable[y0:y1, x0:x1] = True
    delta = np.abs(edited.astype(np.int16) - master.astype(np.int16)).max(axis=2)
    outside = int(delta[~editable].max())
    if outside != 0:
        raise SystemExit(f"Pixels outside the name/dose areas changed (max delta {outside})")


def save_webp(image: Image.Image, path: Path) -> None:
    image.save(path, format="WEBP", quality=WEBP_QUALITY, method=6)


def build_contact_sheet(items: list[tuple[str, str, str, Path]]) -> None:
    columns = 4
    thumb_w = 320
    pad = 18
    caption_h = 58
    label_font = load_font(22, 560)
    meta_font = load_font(15, 440)
    sample = Image.open(items[0][3])
    thumb_h = int(round(thumb_w * sample.size[1] / sample.size[0]))
    rows = (len(items) + columns - 1) // columns
    sheet_w = columns * thumb_w + (columns + 1) * pad
    sheet_h = 64 + rows * (thumb_h + caption_h + pad) + pad
    sheet = Image.new("RGB", (sheet_w, sheet_h), (244, 245, 247))
    draw = ImageDraw.Draw(sheet)
    draw.text((pad, 16), "Ovora Labs vial labels", font=load_font(28, 620), fill=(30, 34, 53))
    for index, (name, dose, slug, path) in enumerate(items):
        col = index % columns
        row = index // columns
        x = pad + col * (thumb_w + pad)
        y = 64 + row * (thumb_h + caption_h + pad)
        thumb = Image.open(path).convert("RGB").resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        sheet.paste(thumb, (x, y))
        draw.text((x, y + thumb_h + 6), f"{name}   {dose}", font=label_font, fill=(30, 34, 53))
        draw.text((x, y + thumb_h + 32), slug, font=meta_font, fill=(90, 98, 120))
    CONTACT_SHEET.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(CONTACT_SHEET, quality=86, optimize=True)
    artifact = Path("/opt/cursor/artifacts/contact-sheet.jpg")
    artifact.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(artifact, quality=86, optimize=True)


def main() -> None:
    if not REFERENCE.exists():
        raise SystemExit(f"Missing master photo: {REFERENCE}")
    if not FONT_PATH.exists():
        raise SystemExit(f"Missing font: {FONT_PATH}")

    products = load_products(PRODUCTS_TS)
    master = np.array(Image.open(REFERENCE).convert("RGB"))
    blank = cleared_master(master)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # Sanity: retyping the master strings must land on the original ink box.
    probe = render_text("GHK-CU", NAME_SIZE, NAME_TRACKING, NAME_WEIGHT)
    if abs(probe.size[0] - 218) > 4 or abs(probe.size[1] - 36) > 2:
        raise SystemExit(f"GHK-CU metrics drifted: {probe.size}, expected about 218×36")

    written: list[tuple[str, str, str, Path]] = []
    print(f"{'slug':22} {'label':16} {'dose':10} {'name px':12} note")
    for product in products:
        if product["form"] == "nasal":
            print(f"{product['slug']:22} {'—':16} {product['dose']:10} {'':12} skipped (nasal spray)")
            continue
        name = label_name(product["name"])
        dose = label_dose(product["dose"])
        dest = OUT_DIR / f"{product['slug']}.webp"
        if product["slug"] == GHK_SLUG:
            if name != "GHK-CU" or dose != "50 MG":
                raise SystemExit(f"GHK-CU catalog values changed ({name!r} {dose!r}); the master would no longer match")
            composed = master
            note = "untouched master"
            name_px = "—"
        else:
            composed, info = compose(master, blank, name, dose)
            note = "name scaled to the rule" if info["name_scaled"] else ""
            name_px = f"{info['name_px'][0]}×{info['name_px'][1]}"
        save_webp(Image.fromarray(composed), dest)
        written.append((name, dose, product["slug"], dest))
        print(f"{product['slug']:22} {name:16} {dose:10} {name_px:12} {note}")

    build_contact_sheet(written)
    print(f"\nWrote {len(written)} images to {OUT_DIR}")
    print(f"Contact sheet: {CONTACT_SHEET}")


if __name__ == "__main__":
    try:
        main()
    except BrokenPipeError:
        sys.exit(0)
