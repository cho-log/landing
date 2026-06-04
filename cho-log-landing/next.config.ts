import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // GitHub Pages: 정적 HTML 내보내기
  images: {
    unoptimized: true,       // 정적 export에서 Image 최적화 비활성화
  },
};

export default nextConfig;
