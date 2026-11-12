"use client";

import { useEffect, useRef } from "react";

type Speck = {
  u: number;
  v: number;
  z: number;
  phase: number;
  drift: number;
};

function makeSpecks(count: number): Speck[] {
  return Array.from({ length: count }, (_, index) => {
    const band = index % 3;
    const z = band === 0 ? 0.42 : band === 1 ? 0.72 : 1;
    return {
      u: Math.random(),
      v: Math.random(),
      z,
      phase: Math.random() * Math.PI * 2,
      drift: 0.22 + Math.random() * 0.38,
    };
  });
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
    let width = 0;
    let height = 0;
    let specks = makeSpecks(width < 700 ? 48 : 84);
    let visible = true;
    let running = true;
    let frame = 0;
    let last = 0;

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
      specks = makeSpecks(width < 700 ? 52 : 90);
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

    function draw(time: number) {
      ctx.clearRect(0, 0, width, height);
      const seconds = time / 1000;

      orb(
        width * (0.22 + Math.sin(seconds * 0.23) * 0.06),
        height * (0.3 + Math.cos(seconds * 0.19) * 0.05),
        Math.max(width, height) * 0.42,
        "52, 91, 212",
        0.5,
      );
      orb(
        width * (0.78 + Math.cos(seconds * 0.17) * 0.05),
        height * (0.22 + Math.sin(seconds * 0.21) * 0.06),
        Math.max(width, height) * 0.34,
        "98, 72, 190",
        0.4,
      );
      orb(
        width * (0.55 + Math.sin(seconds * 0.15) * 0.08),
        height * (0.82 + Math.cos(seconds * 0.18) * 0.04),
        Math.max(width, height) * 0.36,
        "24, 150, 160",
        0.32,
      );

      const horizon = height * 0.08;
      const floor = height * 1.08;
      const rows = 16;
      const pan = (seconds * 0.35) % 1;
      ctx.lineWidth = 1;
      for (let i = 0; i < rows; i += 1) {
        const p = ((i / rows) + pan) % 1;
        const y = horizon + (floor - horizon) * p * p;
        const alpha = 0.05 + p * 0.28;
        ctx.strokeStyle = `rgba(186, 206, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(-20, y);
        ctx.lineTo(width + 20, y);
        ctx.stroke();
        const pulse = ((seconds * 0.22 + i * 0.07) % 1) * (width + 120) - 60;
        const shine = ctx.createLinearGradient(pulse - 70, y, pulse + 70, y);
        shine.addColorStop(0, "rgba(255,255,255,0)");
        shine.addColorStop(0.5, `rgba(230, 240, 255, ${0.18 + p * 0.35})`);
        shine.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = shine;
        ctx.beginPath();
        ctx.moveTo(pulse - 70, y);
        ctx.lineTo(pulse + 70, y);
        ctx.stroke();
      }

      const cols = width < 700 ? 7 : 11;
      const drift = seconds * 0.12;
      for (let i = 0; i < cols; i += 1) {
        const p = ((i / cols) + drift) % 1;
        const spreadTop = width * 0.18;
        const spreadBottom = width * 1.35;
        const x1 = width * 0.5 + (p - 0.5) * spreadTop;
        const x2 = width * 0.5 + (p - 0.5) * spreadBottom;
        ctx.strokeStyle = "rgba(186, 206, 255, 0.16)";
        ctx.beginPath();
        ctx.moveTo(x1, horizon);
        ctx.lineTo(x2, floor);
        ctx.stroke();
      }

      const points = specks.map((speck) => {
        const speed = 28 * speck.drift * speck.z;
        const x = ((speck.u * width + seconds * speed) % (width + 40)) - 20;
        const y =
          ((speck.v * height + Math.sin(seconds * 0.8 + speck.phase) * 22 * speck.z) % (height + 30)) -
          15;
        const twinkle = 0.28 + 0.72 * Math.abs(Math.sin(seconds * 1.6 + speck.phase));
        return { x, y, z: speck.z, twinkle };
      });

      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        if (a.z < 0.6) continue;
        for (let j = i + 1; j < points.length; j += 1) {
          const b = points[j];
          if (b.z < 0.6) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const limit = width < 700 ? 78 : 110;
          if (dist > limit) continue;
          ctx.strokeStyle = `rgba(190, 214, 255, ${(1 - dist / limit) * 0.28})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const point of points) {
        const radius = (point.z < 0.5 ? 1.1 : point.z < 0.8 ? 1.7 : 2.5) * (width < 700 ? 1.15 : 1);
        ctx.fillStyle = `rgba(244, 248, 255, ${0.25 + 0.7 * point.twinkle * point.z})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
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
      frame = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
