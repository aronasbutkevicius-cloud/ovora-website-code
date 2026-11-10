"use client";

import { useCallback, useEffect, useState } from "react";
import type { CartQuote } from "@/lib/pricing";

export function useServerQuote(
  items: { variantSlug: string; quantity: number }[],
  ready: boolean,
) {
  const [quote, setQuote] = useState<CartQuote | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const key = JSON.stringify(
    items.map((item) => ({ variantSlug: item.variantSlug, quantity: item.quantity })),
  );

  const reload = useCallback(async () => {
    if (!ready) return;
    setLoading(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: JSON.parse(key) as { variantSlug: string; quantity: number }[],
        }),
      });
      const data = (await response.json()) as CartQuote & { error?: string };
      if (!response.ok) {
        setError(data.error || "The cart total could not be calculated.");
        setQuote(null);
      } else {
        setError("");
        setQuote(data);
      }
    } catch {
      setError("The cart total could not be calculated.");
      setQuote(null);
    } finally {
      setLoading(false);
    }
  }, [key, ready]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { quote, error, loading, reload };
}
