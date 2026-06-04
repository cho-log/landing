import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/landing",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
