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
import { ActivitiesSection } from "@/src/components/sections/about/ActivitiesSection";
import { StudyDetailSection } from "@/src/components/sections/about/StudyDetailSection";
import { GuideSection } from "@/src/components/sections/about/GuideSection";

// TODO: 실제 링크로 교체
const LINKS = {
  googleForm: "https://forms.gle/REPLACE_ME",
  discord:    "https://discord.gg/REPLACE_ME",
};

export default function AboutPage() {
  return (
    <>
      {/* ── 1. 히어로 ──────────────────────────────── */}
      <section className="bg-bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-right md:px-6">
          <h1 className="text-5xl font-bold tracking-tight text-chorok-700 md:text-6xl">
            초록
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary md:text-xl">
            함께 성장하는 개발자 커뮤니티
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
            <Button href={LINKS.googleForm} external size="lg">
              리드 신청하기
            </Button>
            <Button href={LINKS.discord} external variant="secondary" size="lg">
              디스코드 입장하기
            </Button>
          </div>
        </div>
      </section>

      {/* ── 2. 활동 소개 ────────────────────────────── */}
      <ActivitiesSection />

      {/* ── 3. 초록스터디 차별점 ────────────────────── */}
      <StudyDetailSection />

      {/* ── 4. 운영 가이드 ──────────────────────────── */}
      <GuideSection />

      {/* ── 5. 마무리 CTA ───────────────────────────── */}
      <section className="bg-bg-base py-24">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            함께할 준비가 됐나요?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            궁금한 점은 디스코드에서 운영진에게 직접 물어보세요.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={LINKS.googleForm} external size="lg">
              리드 신청하기
            </Button>
            <Button href={LINKS.discord} external variant="secondary" size="lg">
              디스코드 입장 →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
