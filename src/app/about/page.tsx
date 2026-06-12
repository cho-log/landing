import type { Metadata } from "next";
import { Button } from "@/src/components/common/Button";

export const metadata: Metadata = {
  title: "초록 소개",
  description:
    "초록스터디, 초록해듀오, 초록프로젝트 — 초록의 다양한 활동과 운영 가이드를 소개합니다.",
  openGraph: {
    url: "https://chorok.dev/about",
    title: "초록 소개 | 초록",
    description:
      "초록스터디, 초록해듀오, 초록프로젝트 — 초록의 다양한 활동과 운영 가이드를 소개합니다.",
  },
};
import { PageBanner } from "@/src/components/common/PageBanner";
import { IdentitySection } from "@/src/components/sections/about/IdentitySection";
import { ActivitiesSection } from "@/src/components/sections/about/ActivitiesSection";
import { StudyDetailSection } from "@/src/components/sections/about/StudyDetailSection";
import { SITE_LINKS } from "@/src/lib/links";

export default function AboutPage() {
  return (
    <>
      <PageBanner
        imageSrc="/about-banner.jpeg"
        title="초록 소개"
        label="ABOUT"
        objectPosition="center 35%"
      />

      <IdentitySection />

      <ActivitiesSection />

      <StudyDetailSection />

      <section className="bg-background py-24">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
            함께할 준비가 됐나요?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
            궁금한 점은 디스코드에서 운영진에게 직접 물어보세요.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={SITE_LINKS.applyForm} external size="lg">
              리드 신청하기
            </Button>
            <Button
              href={SITE_LINKS.discord}
              external
              variant="secondary"
              size="lg"
            >
              디스코드 입장 →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
