"use client";

import { useEffect, useRef } from "react";

type Speck = {
  u: number;
  v: number;
  z: number;
  phase: number;
  drift: number;
};

type Node = [number, number, number];

const NODES: Node[] = (() => {
  const ring: Node[] = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    ring.push([Math.cos(angle), Math.sin(angle), 0]);
  }
  return [...ring, [0, 0, 0.92], [0, 0, -0.92], [0, 0, 0]];
})();

const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [0, 8],
  [2, 8],
  [4, 8],
  [1, 6],
  [3, 6],
  [5, 6],
  [0, 7],
  [2, 7],
  [4, 7],
  [1, 7],
  [3, 7],
  [5, 7],
];

function makeSpecks(count: number): Speck[] {
  return Array.from({ length: count }, (_, index) => {
    const band = index % 3;
    const z = band === 0 ? 0.4 : band === 1 ? 0.7 : 1;
    return {
      u: Math.random(),
      v: Math.random(),
      z,
      phase: Math.random() * Math.PI * 2,
      drift: 0.22 + Math.random() * 0.36,
    };
  });
}

function project(node: Node, yaw: number, pitch: number) {
  const [x, y, z] = node;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = x * cy + z * sy;
  const z1 = z * cy - x * sy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const y2 = y * cp - z1 * sp;
  const z2 = y * sp + z1 * cp;
  const depth = 2.6 / (2.6 + z2);
  return { x: x1 * depth, y: y2 * depth, depth, z: z2 };
}

export function HeroAurora() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const surface: HTMLCanvasElement = canvas;
    const context = surface.getContext("2d", { alpha: true });
    if (!context) return;
    const ctx = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let width = 0;
    let height = 0;
    let specks = makeSpecks(36);
    let visible = true;
    let running = true;
    let frame = 0;
    let last = 0;
    let aimX = 0;
    let aimY = 0;
    let aimScroll = 0;
    let parallaxX = 0;
    let parallaxY = 0;
    let parallaxScroll = 0;

    const desktop = () => finePointer && width >= 900;

    function resize() {
      const parent = surface.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      surface.width = Math.max(1, Math.floor(width * dpr));
      surface.height = Math.max(1, Math.floor(height * dpr));
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      specks = makeSpecks(width < 700 ? 28 : 62);
    }

    function onPointer(event: PointerEvent) {
      if (!desktop()) return;
      const rect = surface.getBoundingClientRect();
      aimX = (event.clientX - rect.left) / rect.width - 0.5;
      aimY = (event.clientY - rect.top) / rect.height - 0.5;
    }

    function onScroll() {
      if (!desktop()) return;
      aimScroll = Math.min(window.scrollY, height) / Math.max(height, 1);
    }

    function orb(x: number, y: number, radius: number, rgb: string, alpha: number) {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, `rgba(${rgb}, ${alpha})`);
      glow.addColorStop(0.4, `rgba(${rgb}, ${alpha * 0.16})`);
      glow.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawMolecule(seconds: number, shiftX: number, shiftY: number) {
      const mobile = width < 700;
      const originX = width * (mobile ? 0.76 : 0.8) + shiftX * 1.35;
      const originY = height * (mobile ? 0.16 : 0.46) + shiftY * 1.15;
      const scale = mobile ? 54 : Math.min(158, width * 0.12);
      const yaw = reduce ? 0.6 : seconds * 0.32;
      const pitch = 0.45 + Math.sin(seconds * 0.2) * 0.18;
      const projected = NODES.map((node) => project(node, yaw, pitch));

      EDGES.forEach(([from, to], index) => {
        const a = projected[from];
        const b = projected[to];
        const shimmer = 0.28 + 0.55 * (0.5 + 0.5 * Math.sin(seconds * 2.1 + index * 0.7));
        ctx.strokeStyle = `rgba(214, 226, 255, ${shimmer})`;
        ctx.lineWidth = mobile ? 1 : 1.35;
        ctx.beginPath();
        ctx.moveTo(originX + a.x * scale, originY + a.y * scale);
        ctx.lineTo(originX + b.x * scale, originY + b.y * scale);
        ctx.stroke();
      });

      projected.forEach((point, index) => {
        const pulse = 0.75 + 0.25 * Math.sin(seconds * 2.4 + index);
        const nucleus = index === NODES.length - 1;
        const radius = (nucleus ? 4.2 : 2.5) * pulse * (mobile ? 0.85 : 1);
        ctx.fillStyle = nucleus
          ? `rgba(126, 224, 234, ${0.75 + 0.25 * pulse})`
          : `rgba(238, 244, 255, ${0.55 + 0.4 * point.depth})`;
        ctx.beginPath();
        ctx.arc(originX + point.x * scale, originY + point.y * scale, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function draw(time: number) {
      if (desktop()) {
        parallaxX += (aimX - parallaxX) * 0.06;
        parallaxY += (aimY - parallaxY) * 0.06;
        parallaxScroll += (aimScroll - parallaxScroll) * 0.08;
      }
      const shiftX = parallaxX * 26;
      const shiftY = parallaxY * 16 + parallaxScroll * 22;
      ctx.clearRect(0, 0, width, height);
      const seconds = time / 1000;
      const mobile = width < 700;

      orb(
        width * (0.22 + Math.sin(seconds * 0.23) * 0.06) + shiftX * 0.4,
        height * (0.3 + Math.cos(seconds * 0.19) * 0.05) + shiftY * 0.3,
        Math.max(width, height) * 0.42,
        "52, 91, 212",
        0.46,
      );
      orb(
        width * (0.78 + Math.cos(seconds * 0.17) * 0.05) - shiftX * 0.25,
        height * (0.22 + Math.sin(seconds * 0.21) * 0.06) + shiftY * 0.2,
        Math.max(width, height) * (mobile ? 0.28 : 0.32),
        "98, 72, 190",
        0.36,
      );
      orb(
        width * (0.55 + Math.sin(seconds * 0.15) * 0.08),
        height * (0.82 + Math.cos(seconds * 0.18) * 0.04) - shiftY * 0.2,
        Math.max(width, height) * 0.34,
        "24, 150, 160",
        0.28,
      );

      const horizon = height * 0.08 + shiftY * 0.35;
      const floor = height * 1.08 + shiftY * 0.35;
      const rows = mobile ? 9 : 14;
      const pan = (seconds * 0.28) % 1;
      ctx.lineWidth = 1;
      for (let i = 0; i < rows; i += 1) {
        const p = ((i / rows) + pan) % 1;
        const y = horizon + (floor - horizon) * p * p;
        const alpha = 0.05 + p * 0.26;
        ctx.strokeStyle = `rgba(186, 206, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(-40, y);
        ctx.lineTo(width + 40, y);
        ctx.stroke();
        const pulse = ((seconds * 0.2 + i * 0.09) % 1) * (width + 140) - 70;
        const shine = ctx.createLinearGradient(pulse - 80, y, pulse + 80, y);
        shine.addColorStop(0, "rgba(255,255,255,0)");
        shine.addColorStop(0.5, `rgba(236, 244, 255, ${0.16 + p * 0.32})`);
        shine.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = shine;
        ctx.beginPath();
        ctx.moveTo(pulse - 80, y);
        ctx.lineTo(pulse + 80, y);
        ctx.stroke();
      }

      const cols = mobile ? 5 : 10;
      const drift = seconds * 0.1 + parallaxX * 0.08;
      for (let i = 0; i < cols; i += 1) {
        const p = ((i / cols) + drift) % 1;
        const x1 = width * 0.5 + (p - 0.5) * width * 0.18 + shiftX * 0.2;
        const x2 = width * 0.5 + (p - 0.5) * width * 1.35 + shiftX;
        ctx.strokeStyle = "rgba(186, 206, 255, 0.15)";
        ctx.beginPath();
        ctx.moveTo(x1, horizon);
        ctx.lineTo(x2, floor);
        ctx.stroke();
      }

      const points = specks.map((speck) => {
        const speed = 26 * speck.drift * speck.z;
        const x = ((speck.u * width + seconds * speed) % (width + 40)) - 20 + shiftX * speck.z;
        const y =
          ((speck.v * height + Math.sin(seconds * 0.75 + speck.phase) * 18 * speck.z) % (height + 30)) -
          15 +
          shiftY * speck.z;
        const twinkle = 0.28 + 0.72 * Math.abs(Math.sin(seconds * 1.5 + speck.phase));
        return { x, y, z: speck.z, twinkle };
      });

      const linkLimit = mobile ? 68 : 104;
      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        if (a.z < 0.65) continue;
        for (let j = i + 1; j < points.length; j += 1) {
          const b = points[j];
          if (b.z < 0.65) continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > linkLimit) continue;
          ctx.strokeStyle = `rgba(190, 214, 255, ${(1 - dist / linkLimit) * 0.24})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const point of points) {
        const radius = point.z < 0.5 ? 1 : point.z < 0.8 ? 1.6 : 2.3;
        ctx.fillStyle = `rgba(244, 248, 255, ${0.22 + 0.68 * point.twinkle * point.z})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      drawMolecule(seconds, shiftX, shiftY);
    }

    function tick(now: number) {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (now - last < 16) return;
      last = now;
      draw(now);
    }

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(surface);
    window.addEventListener("resize", resize);

    if (reduce) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      frame = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
