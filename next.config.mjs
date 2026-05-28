/** @type {import('next').NextConfig} */

// In CI (GitHub Pages) the site is served at /tukhlievs/.
// In local dev NEXT_PUBLIC_BASE_PATH is unset, so basePath becomes "" and the
// app runs at /. The same build works in both environments.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // next/image's optimizer is not available on static hosts.
    unoptimized: true,
  },
  // We typecheck via `npm run typecheck` in CI; skipping ESLint during build
  // keeps the workflow green even before you add an ESLint config locally.
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei"],
  },
};

export default nextConfig;
