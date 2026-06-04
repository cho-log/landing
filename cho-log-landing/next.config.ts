import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",                          // GitHub Pages: 정적 HTML 내보내기
  basePath: isProd ? "/landing" : "",        // https://cho-log.github.io/landing/
  assetPrefix: isProd ? "/landing/" : "",    // _next/static 에셋 경로 보정
  images: {
    unoptimized: true,                       // 정적 export에서 Image 최적화 비활성화
  },
};

export default nextConfig;
