import { Button } from "@/src/components/common/Button";

const SECONDARY_ACTIVITIES = [
  { label: "초록해듀오" },
  { label: "초록프로젝트" },
  { label: "AI 워크숍" },
  { label: "밋업" },
];

export function IntroSection() {
  return (
    <section className="bg-bg-base py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">

        {/* 인용구 */}
        <blockquote className="relative pl-0">
          <span
            className="block text-5xl leading-none text-chorok-500 select-none md:text-6xl"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="mt-2 text-xl leading-relaxed text-text-primary md:text-2xl">
            좋은 교육 경험을 더 많은 사람에게 나누고 싶은 마음에서 시작했습니다.
            <br />
            <strong className="font-bold">
              배움은 혼자보다 함께할 때 더 멀리 갑니다.
            </strong>
          </p>
          <footer className="mt-4 text-lg text-text-muted md:text-xl">
            — 브라운, 우아한테크코스 백엔드 코치
          </footer>
        </blockquote>

        <div className="mt-16 flex flex-col gap-16">

          {/* ── 상시 운영 ── */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="shrink-0 text-sm font-medium text-text-muted">
                상시 운영
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            {/* 초록스터디 — 메인 카드 */}
            <div className="rounded-2xl bg-white p-8 shadow-xl md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="relative inline-flex h-3 w-3" aria-hidden="true">
                  <span className="absolute -inset-0.5 inline-flex animate-ping rounded-full bg-chorok-400 opacity-75 [animation-duration:2s]" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-chorok-500" />
                </span>
                <h3 className="text-2xl font-bold text-text-primary">
                  초록스터디
                </h3>
                <span className="inline-flex items-center rounded-full border border-chorok-300 bg-chorok-50 px-3 py-0.5 text-xs font-semibold text-chorok-700">
                  현재 모집 중
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
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
            <div className="mb-6 flex items-center gap-4">
              <span className="shrink-0 text-sm font-medium text-text-muted">
                함께 열리는 활동들
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {SECONDARY_ACTIVITIES.map(({ label }) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-text-primary"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-text-muted">
              시즌마다 열리는 활동으로, 별도 공지를 통해 모집합니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
