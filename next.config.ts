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
};

export default nextConfig;
