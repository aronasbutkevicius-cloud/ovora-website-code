import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { TidioChat } from "@/components/TidioChat";
import { getSession } from "@/lib/auth/session";
import { ogImage, rootDescription, rootTitle, siteName } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en" data-mode="light">
      <head>
        <link rel="preconnect" href="https://code.tidio.co" />
      </head>
      <body className={`${fraunces.variable} ${outfit.variable} font-sans antialiased`}>
        <SiteShell session={session}>{children}</SiteShell>
        <TidioChat />
      </body>
    </html>
  );
}
