"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  variantSlug: string;
  familySlug: string;
  name: string;
  dose: string;
  price: number;
  quantity: number;
  image?: string;
  form: "injectable" | "nasal" | "accessory";
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  ready: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (variantSlug: string, quantity: number) => void;
  removeItem: (variantSlug: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "ovora-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.variantSlug === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    const qty = Math.max(1, Math.floor(quantity));
    setItems((prev) => {
      const existing = prev.find((row) => row.variantSlug === item.variantSlug);
      if (existing) {
        return prev.map((row) =>
          row.variantSlug === item.variantSlug
            ? { ...row, quantity: row.quantity + qty }
            : row,
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  }, []);

  const setQuantity = useCallback((variantSlug: string, quantity: number) => {
    const qty = Math.floor(quantity);
    setItems((prev) => {
      if (qty <= 0) return prev.filter((row) => row.variantSlug !== variantSlug);
      return prev.map((row) =>
        row.variantSlug === variantSlug ? { ...row, quantity: qty } : row,
      );
    });
  }, []);

  const removeItem = useCallback((variantSlug: string) => {
    setItems((prev) => prev.filter((row) => row.variantSlug !== variantSlug));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      ready,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [items, itemCount, subtotal, ready, addItem, setQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
