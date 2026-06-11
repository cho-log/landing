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
import { FeaturedStudySection } from "@/src/components/sections/archive/FeaturedStudySection";
import { StudyArchiveSection } from "@/src/components/sections/archive/StudyArchiveSection";
import { LeadReviewSection } from "@/src/components/sections/archive/LeadReviewSection";
import { LeadListSection } from "@/src/components/sections/archive/LeadListSection";

// TODO: 실제 링크로 교체
const LINKS = {
  googleForm: "https://forms.gle/REPLACE_ME",
  discord:    "https://discord.gg/REPLACE_ME",
};

export default function ArchivePage() {
  return (
    <>
      {/* 1. 대표 스터디 */}
      <FeaturedStudySection />

      {/* 2. 전체 스터디 아카이브 (필터 + 정렬) */}
      <StudyArchiveSection />

      {/* 3. 리드 회고 큐레이션 */}
      <LeadReviewSection />

      {/* 4. 역대 리드 목록 */}
      <LeadListSection />

      <section className="bg-primary py-24 text-on-primary">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-inverse-primary">
            다음 초록스터디
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            다음 사람은 당신일 수 있습니다.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-on-primary-container">
            배운 것을 나누고 싶은 마음이 있다면, 그걸로 충분합니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={LINKS.googleForm} external size="lg">
              리드 신청하기
            </Button>
            <Button
              href={LINKS.discord}
              external
              variant="secondary"
              size="lg"
              className="border-inverse-primary text-inverse-primary hover:bg-primary-container"
            >
              디스코드 입장 →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
