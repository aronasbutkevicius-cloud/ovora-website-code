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

const BLOBS = [
  { color: [90, 176, 220], alpha: 0.62, rx: 0.42, ry: 0.38, sx: 0.22, sy: 0.28, px: 0.9, py: 0.7 },
  { color: [120, 190, 230], alpha: 0.5, rx: 0.36, ry: 0.32, sx: 0.78, sy: 0.22, px: 0.6, py: 1.1 },
  { color: [210, 186, 245], alpha: 0.48, rx: 0.34, ry: 0.3, sx: 0.68, sy: 0.62, px: 0.8, py: 0.55 },
  { color: [150, 214, 196], alpha: 0.46, rx: 0.4, ry: 0.3, sx: 0.3, sy: 0.74, px: 0.5, py: 0.85 },
  { color: [255, 255, 255], alpha: 0.55, rx: 0.22, ry: 0.18, sx: 0.52, sy: 0.4, px: 1.3, py: 0.9 },
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

/**
 * Flowing ice/pearl field, drifting bonds, and a slowly tumbling backbone.
 * The canvas stays transparent. Every glow ends at alpha 0 inside the frame,
 * so the field has no painted rectangle.
 */
export function HeroLumen({ className = "" }: { className?: string }) {
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
        x: (Math.sin(seed) * 0.5 + 0.5),
        y: (Math.cos(seed * 1.7) * 0.5 + 0.5),
        vx: Math.sin(seed * 0.37) * 0.045 + 0.03,
        vy: Math.cos(seed * 0.53) * 0.04 - 0.02,
        r: 1.1 + (index % 5) * 0.45,
      };
    });

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
      const dx = Math.min(nx, 1 - nx) / 0.14;
      const dy = Math.min(ny, 1 - ny) / 0.16;
      const t = Math.max(0, Math.min(1, Math.min(dx, dy)));
      return t * t * (3 - 2 * t);
    }

    function draw(time: number, dt: number) {
      if (width < 2 || height < 2) return;
      ctx.clearRect(0, 0, width, height);

      const mobile = width < 760;
      const t = time * 0.001;

      for (const blob of BLOBS) {
        const x = width * (blob.sx + Math.sin(t * blob.px * 1.7) * (mobile ? 0.1 : 0.14));
        const y = height * (blob.sy + Math.cos(t * blob.py * 1.7 + blob.sx) * (mobile ? 0.09 : 0.12));
        const room = Math.min(x, y, width - x, height - y) - 2;
        const desired = Math.max(width, height) * (blob.rx + Math.sin(t * 0.35 + blob.py) * 0.03);
        const radius = Math.min(desired, room);
        if (radius < 24) continue;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const [r, g, b] = blob.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blob.alpha})`);
        gradient.addColorStop(0.42, `rgba(${r}, ${g}, ${b}, ${blob.alpha * 0.28})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

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
  }, []);

  return (
    <div className={`lumen-stage ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="lumen-canvas" />
    </div>
  );
}
