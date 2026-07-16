import Image from "next/image";
import { NasalSpray } from "@/components/NasalSpray";
import { Vial } from "@/components/Vial";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  className?: string;
  /** Prefer photo when available */
  preferPhoto?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function ProductVisual({
  product,
  className = "h-40 w-auto",
  preferPhoto = true,
  sizes = "(max-width: 768px) 50vw, 240px",
  priority = false,
}: Props) {
  if (preferPhoto && product.image) {
    return (
      <Image
        src={product.image}
        alt={`${product.name} ${product.dose} research vial`}
        width={640}
        height={960}
        className={`object-contain ${className}`}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  if (product.form === "nasal") {
    return (
      <NasalSpray
        name={product.name}
        dose={product.dose}
        theme={product.theme}
        className={className}
      />
    );
  }

  return (
    <Vial
      name={product.name}
      dose={product.dose}
      theme={product.theme}
      className={className}
    />
  );
}
