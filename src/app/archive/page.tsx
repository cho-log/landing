import type { Metadata } from "next";
import { Button } from "@/src/components/common/Button";

export const metadata: Metadata = {
  title: "아카이브",
  description:
    "초록의 역대 스터디 기록, 리드 회고, 역대 리드 목록을 한눈에 확인하세요.",
  openGraph: {
    url: "https://chorok.dev/archive",
    title: "아카이브 | 초록",
    description:
      "초록의 역대 스터디 기록, 리드 회고, 역대 리드 목록을 한눈에 확인하세요.",
  },
};
import { PageBanner } from "@/src/components/common/PageBanner";
import { blur } from "@/src/generated/blur";
import { NetworkStatsSection } from "@/src/components/sections/archive/NetworkStatsSection";
import { ProgramTimelineSection } from "@/src/components/sections/archive/ProgramTimelineSection";
import { CommunityLeadsSection } from "@/src/components/sections/archive/CommunityLeadsSection";
import { TestimonialArchiveSection } from "@/src/components/sections/archive/TestimonialArchiveSection";
import { SITE_LINKS } from "@/src/lib/links";

export default function ArchivePage() {
  return (
    <>
      <PageBanner
        imageSrc="/archive-banner.webp"
        title="아카이브"
        label="ARCHIVE"
        objectPosition="center 45%"
        blurDataURL={blur["archive-banner"]}
      />

      {/* 1. 네트워크 수치 */}
      <NetworkStatsSection />

      {/* 2. 프로그램 타임라인 */}
      <ProgramTimelineSection />

      {/* 3. 함께한 모임 & 리드 */}
      <CommunityLeadsSection />

      {/* 4. 후기 모음 */}
      <TestimonialArchiveSection />

      <section className="bg-surface-container py-24">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            다음 초록스터디
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
            다음 사람은 당신일 수 있습니다.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
            배운 것을 나누고 싶은 마음이 있다면, 그걸로 충분합니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={SITE_LINKS.applyForm} external size="lg">
              스터디 개설 신청
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
