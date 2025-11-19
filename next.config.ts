import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Use repo name as base path only in production (so local dev stays clean)
  basePath: isProd ? "/mediator-oop" : undefined,
  assetPrefix: isProd ? "/mediator-oop/" : undefined,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
