import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // Repo is tukhlievs/tukhlievs → site lives at tukhlievs.github.io/tukhlievs
  basePath: "/tukhlievs",
  assetPrefix: "/tukhlievs",

  // Required for static export
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
