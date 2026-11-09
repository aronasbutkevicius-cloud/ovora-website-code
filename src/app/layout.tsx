import type { Metadata } from "next";
import { Anek_Telugu, Marcellus, Poppins, Roboto } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { TidioChat } from "@/components/TidioChat";
import { ogImage, rootDescription, rootTitle, siteName } from "@/lib/site";
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
  metadataBase: new URL("https://ovoralabs.com"),
  title: {
    default: rootTitle,
    template: "%s | Ovora Labs",
  },
  description: rootDescription,
  applicationName: siteName,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: rootTitle,
    description: rootDescription,
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: rootTitle,
    description: rootDescription,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
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
