import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/src/components/common/Header";
import { Footer } from "@/src/components/common/Footer";

const SITE_URL = "https://cho-log.github.io/landing";
const OG_IMAGE = `${SITE_URL}/og-image.png`; // public/og-image.png 파일 필요

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "초록 | 배움에서 나눔으로",
    template: "%s | 초록",
  },
  description:
    "좋은 교육 경험을 더 많은 사람에게 전하는 개발자 커뮤니티. 초록스터디 리드를 모집합니다.",

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "초록",
    title: "초록 | 배움에서 나눔으로",
    description:
      "좋은 교육 경험을 더 많은 사람에게 전하는 개발자 커뮤니티. 초록스터디 리드를 모집합니다.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "초록" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "초록 | 배움에서 나눔으로",
    description:
      "좋은 교육 경험을 더 많은 사람에게 전하는 개발자 커뮤니티.",
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
