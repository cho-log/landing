import { Button } from "@/src/components/common/Button";

const SECONDARY_ACTIVITIES = [
  { label: "초록해듀오", color: "text-duo-600" },
  { label: "초록프로젝트", color: "text-project-600" },
  { label: "AI 워크숍", color: "text-text-secondary" },
  { label: "밋업", color: "text-text-secondary" },
];

export function IntroSection() {
  return (
    <section className="bg-bg-base py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">

        {/* 섹션 제목 */}
        <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          초록은 어떤 곳인가요
        </h2>

        {/* 인용구 */}
        <blockquote className="mt-6 border-l-4 border-chorok-500 pl-5 text-base leading-relaxed text-text-secondary italic md:text-lg">
          "좋은 교육 경험을 더 많은 사람에게 나누고 싶은 마음에서 시작했습니다.
          배움은 혼자보다 함께할 때 더 멀리 갑니다."
        </blockquote>

        <div className="mt-12 flex flex-col gap-10">

          {/* ── 상시 운영 ── */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              상시 운영
            </p>

            {/* 초록스터디 — 메인 카드 */}
            <div className="rounded-2xl border border-chorok-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-text-primary">
                  초록스터디 🟢
                </h3>
                <span className="inline-flex items-center rounded-full bg-chorok-100 px-2.5 py-0.5 text-xs font-semibold text-chorok-700">
                  현재 모집 중
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                검증된 커리큘럼 · 코드리뷰 문화 · 14주 운영
              </p>
              <div className="mt-6">
                <Button href="/about" variant="ghost">
                  자세히 보기
                </Button>
              </div>
            </div>
          </div>

          {/* ── 함께 열리는 활동들 ── */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              함께 열리는 활동들
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {SECONDARY_ACTIVITIES.map(({ label, color }, i) => (
                <span key={label} className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${color}`}>{label}</span>
                  {i < SECONDARY_ACTIVITIES.length - 1 && (
                    <span className="text-border" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-text-muted">
              시즌마다 열리는 활동으로, 별도 공지를 통해 모집합니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
