import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Put <title> and canonical in the initial <head> for every user agent.
  // Next otherwise streams metadata for Googlebot, so the only <title> in the
  // first HTML chunk is the logo SVG ("Ovora Labs").
  htmlLimitedBots: /.*/,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0, must-revalidate",
          },
          { key: "CDN-Cache-Control", value: "no-store" },
          { key: "Vercel-CDN-Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/store/injectable-vials",
        destination: "/store/lyophilized-peptides",
        permanent: true,
      },
      {
        source: "/store/nasal-sprays",
        destination: "/store",
        permanent: true,
      },
      {
        source: "/store/accessories",
        destination: "/store/laboratory-supplies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
