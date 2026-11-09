"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Soft alpha shadow, applied only after the cutout has decoded. */
  shadow?: "soft" | "float" | "none";
};

const shadowClass = {
  none: "",
  soft: "vial-cutout-shadow",
  float: "vial-cutout-shadow-float",
} as const;

/**
 * Transparent vial cutouts. next/image sets `color: transparent`, which makes
 * Chrome paint a filled rectangle until the alpha channel decodes. A CSS
 * drop-shadow on that frame, especially under a transform animation, keeps
 * the rectangle on screen. A plain img gets the shadow only after load.
 */
export function CutoutImage({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
  shadow = "soft",
}: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) setReady(true);
  }, [src]);

  return (
    // Plain img on purpose: next/image injects color:transparent, which paints a box behind alpha.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={485}
      height={963}
      sizes={sizes}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onLoad={() => setReady(true)}
      className={`vial-cutout ${ready ? shadowClass[shadow] : ""} ${className}`}
    />
  );
}
