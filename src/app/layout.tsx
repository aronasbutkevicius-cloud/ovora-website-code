import type { Metadata } from "next";
import { Anek_Telugu, Marcellus, Poppins, Roboto } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { TidioChat } from "@/components/TidioChat";
import "./globals.css";

const anek = Anek_Telugu({
  variable: "--font-anek",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Ovora Labs — Premium Research Grade Peptides",
    template: "%s | Ovora Labs",
  },
  description:
    "Ovora Labs is a USA-based supplier of research-grade peptides with a 99%+ purity guarantee. Sold strictly for laboratory and research use only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <link rel="preconnect" href="https://code.tidio.co" />
      </head>
      <body
        className={`${anek.variable} ${poppins.variable} ${roboto.variable} ${marcellus.variable} font-sans antialiased`}
      >
        <SiteShell>{children}</SiteShell>
        <TidioChat />
      </body>
    </html>
  );
}
