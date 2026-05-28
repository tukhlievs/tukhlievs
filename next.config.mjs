/** @type {import('next').NextConfig} */

// In CI (GitHub Pages) the site is served at /tukhlievs/.
// In local dev NEXT_PUBLIC_BASE_PATH is unset → runs at /.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // Only list packages that are actually imported in the codebase.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
