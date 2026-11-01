import type { Metadata } from "next";
import { Anek_Telugu, Marcellus, Poppins, Roboto } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { TidioChat } from "@/components/TidioChat";
import { getSiteUrl, siteName, supportEmail } from "@/lib/site";
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

const description =
  "Ovora Labs is a USA-based supplier of research-grade peptides with a 99%+ purity guarantee. Sold strictly for laboratory and research use only.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Ovora Labs — Premium Research Grade Peptides",
    template: "%s | Ovora Labs",
  },
  description,
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: "Ovora Labs — Premium Research Grade Peptides",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovora Labs — Premium Research Grade Peptides",
    description,
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
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: getSiteUrl(),
    email: supportEmail,
    description,
  };

  return (
    <html lang="en" data-mode="light">
      <head>
        <link rel="preconnect" href="https://code.tidio.co" />
      </head>
      <body
        className={`${anek.variable} ${poppins.variable} ${roboto.variable} ${marcellus.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <SiteShell>{children}</SiteShell>
        <TidioChat />
      </body>
    </html>
  );
}
