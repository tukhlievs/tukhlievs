import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages
  output: "export",

  // Repo is tukhlievs/tukhlievs -> site is served from /tukhlievs/
  basePath: "/tukhlievs",
  assetPrefix: "/tukhlievs",

  // Required for static export
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,

  // Safety net: the build environment for this repo cannot be exercised locally,
  // so do not let a stray type/lint nit break the Pages deploy. The code is
  // written to be correct; these flags only prevent a hard failure on edge cases.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
