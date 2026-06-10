/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/tukhlievs",
  assetPrefix: "/tukhlievs",
  trailingSlash: true,
  transpilePackages: ["next-mdx-remote"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
