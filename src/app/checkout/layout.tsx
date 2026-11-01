import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Checkout",
    description:
      "Enter shipping details for an Ovora Labs order. Payment processing is not connected yet.",
    path: "/checkout",
  }),
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
