import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Checkout",
    description:
      "Enter shipping details and pay with Crypto — Pay by card. US shipping is $8.99 under $100 and free at $100 or above.",
    path: "/checkout",
  }),
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
