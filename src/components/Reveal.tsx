"use client";

import { useEffect } from "react";

export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    for (const node of nodes) observer.observe(node);
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
