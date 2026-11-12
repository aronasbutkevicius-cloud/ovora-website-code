"use client";

import { useEffect, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type Speck = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  blue: boolean;
};

const BLOBS = [
  { color: [90, 176, 220], alpha: 0.5, rx: 0.46, ry: 0.4, sx: 0.18, sy: 0.3, px: 0.55, py: 0.42 },
  { color: [150, 206, 232], alpha: 0.42, rx: 0.38, ry: 0.34, sx: 0.78, sy: 0.22, px: 0.4, py: 0.62 },
  { color: [214, 196, 242], alpha: 0.36, rx: 0.34, ry: 0.3, sx: 0.62, sy: 0.68, px: 0.48, py: 0.36 },
  { color: [168, 224, 208], alpha: 0.32, rx: 0.4, ry: 0.28, sx: 0.32, sy: 0.78, px: 0.33, py: 0.5 },
  { color: [255, 255, 255], alpha: 0.48, rx: 0.2, ry: 0.16, sx: 0.48, sy: 0.42, px: 0.7, py: 0.55 },
] as const;

const WAVES = [
  { base: 0.22, amp: 0.045, freq: 1.6, speed: 0.55, alpha: 0.16, width: 1 },
  { base: 0.36, amp: 0.06, freq: 2.2, speed: 0.42, alpha: 0.2, width: 1.15 },
  { base: 0.52, amp: 0.05, freq: 1.3, speed: 0.7, alpha: 0.14, width: 0.9 },
  { base: 0.68, amp: 0.07, freq: 2.8, speed: 0.36, alpha: 0.18, width: 1.05 },
  { base: 0.82, amp: 0.04, freq: 1.9, speed: 0.62, alpha: 0.12, width: 0.85 },
] as const;

function buildMolecule() {
  const atoms: Vec3[] = [];
  const bonds: Array<[number, number]> = [];
  const count = 13;
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const angle = t * Math.PI * 3.15;
    atoms.push({
      x: Math.cos(angle) * 0.64,
      y: (t - 0.5) * 1.9,
      z: Math.sin(angle) * 0.64,
    });
    if (i > 0) bonds.push([i - 1, i]);
    if (i % 3 === 1) {
      const side = atoms.length;
      atoms.push({
        x: Math.cos(angle) * 1.08,
        y: (t - 0.5) * 1.9 + 0.05,
        z: Math.sin(angle) * 1.08,
      });
      bonds.push([i, side]);
    }
  }
  return { atoms, bonds };
}

const MOLECULE = buildMolecule();

function rotate(point: Vec3, yaw: number, pitch: number): Vec3 {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const x1 = point.x * cosY + point.z * sinY;
  const z1 = -point.x * sinY + point.z * cosY;
  const cosX = Math.cos(pitch);
  const sinX = Math.sin(pitch);
  return {
    x: x1,
    y: point.y * cosX - z1 * sinX,
    z: point.y * sinX + z1 * cosX,
  };
}

function makeSpecks(): Speck[] {
  return Array.from({ length: 46 }, (_, index) => {
    const depth = index % 3;
    const seed = (index + 1) * 19.17;
    const dirX = Math.sin(seed) > 0 ? 1 : -1;
    const dirY = Math.cos(seed * 0.8) > 0 ? 1 : -1;
    return {
      x: (Math.sin(seed) * 0.5 + 0.5),
      y: (Math.cos(seed * 1.37) * 0.5 + 0.5),
      vx: dirX * (0.015 + depth * 0.012),
      vy: dirY * (0.008 + depth * 0.007),
      r: depth === 0 ? 1.4 : depth === 1 ? 2.3 : 3.5,
      alpha: depth === 0 ? 0.32 : depth === 1 ? 0.48 : 0.62,
      blue: index % 2 === 0,
    };
  });
}

type HeroVariant = "field" | "ornament";

/**
 * Transparent full-bleed field. Ornament is the homepage: meshes, contour
 * waves, guilloche linework, and drifting specks. Field is the quieter
 * backdrop kept on sign-in pages.
 */
export function HeroLumen({
  className = "",
  variant = "field",
}: {
  className?: string;
  variant?: HeroVariant;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const canvas: HTMLCanvasElement = node;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    const particles: Particle[] = Array.from({ length: 42 }, (_, index) => {
      const seed = (index + 1) * 17.13;
      return {
        x: Math.sin(seed) * 0.5 + 0.5,
        y: Math.cos(seed * 1.7) * 0.5 + 0.5,
        vx: Math.sin(seed * 0.37) * 0.045 + 0.03,
        vy: Math.cos(seed * 0.53) * 0.04 - 0.02,
        r: 1.1 + (index % 5) * 0.45,
      };
    });
    const specks = makeSpecks();

    let frame = 0;
    let running = false;
    let lastNow = 0;
    let visible = true;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motion.matches;
    let width = 0;
    let height = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const area = width * height;
      const cap = area > 700_000 ? 1.25 : 1.6;
      const dpr = Math.min(window.devicePixelRatio || 1, cap);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function edgeFade(x: number, y: number) {
      const nx = x / width;
      const ny = y / height;
      const dx = Math.min(nx, 1 - nx) / 0.12;
      const dy = Math.min(ny, 1 - ny) / 0.14;
      const t = Math.max(0, Math.min(1, Math.min(dx, dy)));
      return t * t * (3 - 2 * t);
    }

    function paintMeshes(t: number, mobile: boolean) {
      for (const blob of BLOBS) {
        const x = width * (blob.sx + Math.sin(t * blob.px) * (mobile ? 0.08 : 0.1));
        const y = height * (blob.sy + Math.cos(t * blob.py + blob.sx) * (mobile ? 0.07 : 0.09));
        const room = Math.min(x, y, width - x, height - y) - 3;
        const desired = Math.max(width, height) * (blob.rx + Math.sin(t * 0.28 + blob.py) * 0.02);
        const radius = Math.min(desired, room);
        if (radius < 20) continue;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const [r, g, b] = blob.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blob.alpha})`);
        gradient.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${blob.alpha * 0.22})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function paintWaves(t: number, mobile: boolean) {
      const steps = mobile ? 36 : 56;
      for (const wave of WAVES) {
        ctx.lineWidth = wave.width;
        let previousX = 0;
        let previousY = 0;
        for (let step = 0; step <= steps; step += 1) {
          const u = step / steps;
          const x = u * width;
          const ripple =
            Math.sin(u * Math.PI * 2 * wave.freq + t * wave.speed) * wave.amp +
            Math.sin(u * Math.PI * 2 * (wave.freq * 0.45) - t * wave.speed * 0.65) * wave.amp * 0.45;
          const y = height * (wave.base + ripple);
          if (step > 0) {
            const fade = Math.min(edgeFade(previousX, previousY), edgeFade(x, y));
            if (fade > 0.04) {
              ctx.strokeStyle = `rgba(14, 110, 156, ${wave.alpha * fade})`;
              ctx.beginPath();
              ctx.moveTo(previousX, previousY);
              ctx.lineTo(x, y);
              ctx.stroke();
            }
          }
          previousX = x;
          previousY = y;
        }
      }
    }

    function paintRing(
      cx: number,
      cy: number,
      ring: number,
      wobble: number,
      lobes: number,
      phase: number,
      alpha: number,
      samples: number,
    ) {
      ctx.lineWidth = 0.85;
      let previous: { x: number; y: number } | null = null;
      for (let step = 0; step <= samples; step += 1) {
        const angle = (step / samples) * Math.PI * 2;
        const breathe = ring + wobble * Math.sin(lobes * angle + phase);
        const x = cx + breathe * Math.cos(angle);
        const y = cy + breathe * Math.sin(angle) * 0.9;
        if (previous) {
          const fade = Math.min(edgeFade(previous.x, previous.y), edgeFade(x, y));
          if (fade > 0.04) {
            ctx.strokeStyle = `rgba(14, 108, 152, ${alpha * fade})`;
            ctx.beginPath();
            ctx.moveTo(previous.x, previous.y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
        previous = { x, y };
      }
    }

    function paintOrnament(t: number, mobile: boolean) {
      const phase = reduced ? 0.6 : t * 0.4;
      const cx = width * (mobile ? 0.84 : 0.73);
      const cy = height * (mobile ? 0.13 : 0.46);
      const radius = Math.min(width, height) * (mobile ? 0.16 : 0.28);
      const rings = mobile ? 4 : 7;
      const samples = mobile ? 160 : 240;
      for (let index = 0; index < rings; index += 1) {
        const ring = radius * (0.38 + index * 0.09);
        const wobble = radius * (0.012 + (index % 3) * 0.006);
        const lobes = 14 + index * 3;
        const spin = index % 2 === 0 ? phase : -phase * 0.75;
        paintRing(cx, cy, ring, wobble, lobes, spin + index * 0.35, 0.11 + (index % 2) * 0.05, samples);
      }
      if (!mobile) {
        const offset = radius * 0.72;
        for (let index = 0; index < 4; index += 1) {
          const ring = radius * (0.22 + index * 0.07);
          paintRing(
            cx + offset,
            cy + radius * 0.55,
            ring,
            radius * 0.01,
            12 + index * 2,
            -phase * 0.6 + index,
            0.1,
            160,
          );
        }
      }
    }

    function paintSpecks(dt: number, mobile: boolean) {
      const count = mobile ? 26 : specks.length;
      for (let index = 0; index < count; index += 1) {
        const speck = specks[index];
        speck.x += speck.vx * dt;
        speck.y += speck.vy * dt;
        if (speck.x < -0.04) speck.x = 1.04;
        if (speck.x > 1.04) speck.x = -0.04;
        if (speck.y < -0.04) speck.y = 1.04;
        if (speck.y > 1.04) speck.y = -0.04;
        const x = speck.x * width;
        const y = speck.y * height;
        const fade = edgeFade(x, y);
        if (fade < 0.04) continue;
        const room = Math.min(x, y, width - x, height - y) - 1;
        const glowRadius = Math.min(speck.r * 3.2, room);
        if (glowRadius < 1.5) continue;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        const [r, g, b] = speck.blue ? [186, 224, 242] : [255, 255, 255];
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${speck.alpha * fade})`);
        glow.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${speck.alpha * 0.35 * fade})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawField(t: number, dt: number, mobile: boolean) {
      const count = mobile ? 18 : particles.length;
      for (let i = 0; i < count; i += 1) {
        const particle = particles[i];
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        if (particle.x < -0.05) particle.x = 1.05;
        if (particle.x > 1.05) particle.x = -0.05;
        if (particle.y < -0.05) particle.y = 1.05;
        if (particle.y > 1.05) particle.y = -0.05;
      }

      ctx.lineWidth = 1;
      const fieldLimit = mobile ? height * 0.4 : height;
      for (let i = 0; i < count; i += 1) {
        for (let j = i + 1; j < count; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const ax = a.x * width;
          const ay = a.y * height;
          const bx = b.x * width;
          const by = b.y * height;
          if (mobile && (ay > fieldLimit || by > fieldLimit)) continue;
          const dist = Math.hypot(ax - bx, ay - by);
          const limit = mobile ? 118 : 150;
          if (dist > limit) continue;
          const alpha = (1 - dist / limit) * 0.34 * edgeFade((ax + bx) / 2, (ay + by) / 2);
          ctx.strokeStyle = `rgba(12, 96, 138, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      for (let i = 0; i < count; i += 1) {
        const particle = particles[i];
        const x = particle.x * width;
        const y = particle.y * height;
        if (mobile && y > fieldLimit) continue;
        const alpha = 0.45 + (i % 4) * 0.1;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * edgeFade(x, y)})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.r + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      const yaw = reduced ? 0.6 : t * 0.72;
      const pitch = 0.45 + Math.sin(t * 0.18) * (reduced ? 0 : 0.18);
      const originX = width * (mobile ? 0.82 : 0.74);
      const originY = height * (mobile ? 0.08 : 0.44);
      const scale = Math.min(width, height) * (mobile ? 0.082 : 0.26);
      const projected = MOLECULE.atoms.map((atom) => {
        const spun = rotate(atom, yaw, pitch);
        return {
          x: originX + spun.x * scale,
          y: originY + spun.y * scale,
          z: spun.z,
        };
      });

      ctx.lineWidth = 1.6;
      for (const [from, to] of MOLECULE.bonds) {
        const a = projected[from];
        const b = projected[to];
        const fade = Math.min(edgeFade(a.x, a.y), edgeFade(b.x, b.y));
        if (fade < 0.04) continue;
        const depth = ((a.z + b.z) * 0.5 + 1.4) / 2.6;
        ctx.strokeStyle = `rgba(10, 88, 124, ${(0.35 + depth * 0.5) * fade})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      const order = projected.map((point, index) => ({ point, index })).sort((a, b) => a.point.z - b.point.z);
      for (const item of order) {
        const point = item.point;
        const depth = (point.z + 1.4) / 2.6;
        const radius = 3.2 + depth * 4.2;
        const fade = edgeFade(point.x, point.y);
        const room = Math.min(point.x, point.y, width - point.x, height - point.y) - 1;
        if (fade < 0.04 || room < 3) continue;
        const glowRadius = Math.min(radius * 2.4, room);
        const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, glowRadius);
        glow.addColorStop(0, `rgba(255, 255, 255, ${0.85 * fade})`);
        glow.addColorStop(0.45, `rgba(126, 196, 228, ${(0.35 + depth * 0.25) * fade})`);
        glow.addColorStop(1, "rgba(126, 196, 228, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = item.index % 4 === 0 ? `rgba(232, 220, 255, ${0.95 * fade})` : `rgba(255, 255, 255, ${0.95 * fade})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(12, 106, 150, ${0.65 * fade})`;
        ctx.stroke();
      }
    }

    function draw(time: number, dt: number) {
      if (width < 2 || height < 2) return;
      ctx.clearRect(0, 0, width, height);
      const mobile = width < 760;
      const t = time * 0.001;
      paintMeshes(t, mobile);
      if (variant === "ornament") {
        paintWaves(t, mobile);
        paintOrnament(t, mobile);
        paintSpecks(dt, mobile);
        return;
      }
      drawField(t, dt, mobile);
    }

    function tick(now: number) {
      if (!running) return;
      const dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 0.016;
      lastNow = now;
      draw(now, dt);
      frame = window.requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }

    function start() {
      if (running || reduced) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    }

    function sync() {
      resize();
      if (reduced || !visible || document.hidden) {
        stop();
        lastNow = 0;
        draw(reduced ? 1200 : performance.now(), 0);
        return;
      }
      start();
    }

    const stage = canvas.parentElement;
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw(reduced ? 1200 : performance.now(), 0);
    });
    if (stage) resizeObserver.observe(stage);

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0.02 },
    );
    observer.observe(canvas);

    const onResize = () => sync();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", sync);
    const onMotion = () => {
      reduced = motion.matches;
      sync();
    };
    motion.addEventListener("change", onMotion);

    sync();

    return () => {
      stop();
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotion);
    };
  }, [variant]);

  return (
    <div className={`lumen-stage ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="lumen-canvas" />
    </div>
  );
}
