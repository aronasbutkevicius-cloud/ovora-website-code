import { formatPrice } from "@/lib/money";
import { amountUntilFreeShipping, freeShippingProgress } from "@/lib/shipping";

export function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = amountUntilFreeShipping(subtotal);
  const unlocked = remaining <= 0 && subtotal > 0;
  const progress = freeShippingProgress(subtotal);
  const percent = Math.round(progress * 100);

  return (
    <div>
      <p className="text-sm font-medium text-[#1e2235] leading-snug">
        {unlocked
          ? "You've unlocked free shipping!"
          : `You're ${formatPrice(remaining)} away from free shipping`}
      </p>
      <div
        className="mt-2 h-2 rounded-full bg-[#e4e8f5] overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={
          unlocked
            ? "Free shipping unlocked"
            : `${formatPrice(remaining)} away from free shipping`
        }
      >
        <div
          className="h-full rounded-full bg-[#7a8fd4] transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
