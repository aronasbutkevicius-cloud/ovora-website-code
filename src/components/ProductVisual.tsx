import { CutoutImage } from "@/components/CutoutImage";
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
      <CutoutImage
        src={product.image}
        alt={`${product.name} ${product.dose} research vial`}
        className={`object-contain ${className}`}
        sizes={sizes}
        priority={priority}
        shadow="soft"
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
