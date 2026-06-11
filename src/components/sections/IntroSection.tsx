"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/src/components/common/Button";

const SECONDARY_ACTIVITIES = [
  { label: "초록해듀오" },
  { label: "초록프로젝트" },
  { label: "AI 워크숍" },
  { label: "밋업" },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-8");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function IntroSection() {
  const quoteRef = useFadeIn();
  const studyRef = useFadeIn();
  const activitiesRef = useFadeIn();

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">

        <div
          ref={quoteRef}
          className="translate-y-8 opacity-0 transition-all duration-700 ease-out"
        >
          <blockquote className="relative pl-0">
            <span
              className="block text-5xl leading-none text-secondary select-none md:text-6xl"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="mt-2 text-xl leading-relaxed text-on-surface md:text-2xl">
              좋은 교육 경험을 더 많은 사람에게 나누고 싶은 마음에서 시작했습니다.
              <br />
              <strong className="font-bold">
                배움은 혼자보다 함께할 때 더 멀리 갑니다.
              </strong>
            </p>
            <footer className="mt-4 text-lg text-outline md:text-xl">
              — 브라운, 우아한테크코스 백엔드 코치
            </footer>
          </blockquote>
        </div>

        <div className="mt-16 flex flex-col gap-16">

          <div
            ref={studyRef}
            className="translate-y-8 opacity-0 transition-all duration-700 delay-150 ease-out"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="shrink-0 text-sm font-medium text-outline">
                상시 운영
              </span>
              <span className="h-px flex-1 bg-outline-variant" aria-hidden="true" />
            </div>

            <div className="group relative overflow-hidden rounded-lg bg-surface-container-lowest p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] md:p-10">
              <span className="absolute left-0 top-0 h-0 w-1 rounded-full bg-gradient-to-b from-secondary-fixed-dim to-primary transition-all duration-500 group-hover:h-full" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="relative inline-flex h-3 w-3" aria-hidden="true">
                  <span className="absolute -inset-0.5 inline-flex animate-ping rounded-full bg-secondary-fixed-dim opacity-75 [animation-duration:2s]" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary" />
                </span>
                <h3 className="text-2xl font-bold text-on-surface">
                  초록스터디
                </h3>
                <span className="inline-flex items-center rounded-full border border-secondary-fixed-dim bg-secondary-container px-3 py-0.5 text-xs font-semibold text-on-secondary-container">
                  현재 모집 중
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                검증된 커리큘럼 · 코드리뷰 문화 · 14주 운영
              </p>
              <div className="mt-6">
                <Button href="/about" variant="ghost">
                  자세히 보기
                </Button>
              </div>
            </div>
          </div>

          <div
            ref={activitiesRef}
            className="translate-y-8 opacity-0 transition-all duration-700 delay-300 ease-out"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="shrink-0 text-sm font-medium text-outline">
                함께 열리는 활동들
              </span>
              <span className="h-px flex-1 bg-outline-variant" aria-hidden="true" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {SECONDARY_ACTIVITIES.map(({ label }) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-1.5 text-sm font-medium text-on-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-on-primary hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-outline">
              시즌마다 열리는 활동으로, 별도 공지를 통해 모집합니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
