import type { Metadata } from "next";
import { HeroSection } from "@/src/components/sections/HeroSection";

export const metadata: Metadata = {
  title: "초록 | 배움에서 나눔으로",
  description:
    "좋은 교육 경험을 더 많은 사람에게 전하는 개발자 커뮤니티. 초록스터디 리드를 모집합니다.",
  openGraph: {
    url: "https://chorok.dev",
    title: "초록 | 배움에서 나눔으로",
    description:
      "좋은 교육 경험을 더 많은 사람에게 전하는 개발자 커뮤니티. 초록스터디 리드를 모집합니다.",
  },
};
import { IntroSection } from "@/src/components/sections/IntroSection";
import { HistorySection } from "@/src/components/sections/HistorySection";
import { TestimonialSection } from "@/src/components/sections/TestimonialSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <HistorySection />
      <TestimonialSection />
    </>
  );
}
