"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/src/components/common/Button";
import { SectionHeader } from "@/src/components/common/SectionHeader";

const STATS = [
  { value: 434, label: "디스코드 멤버" },
  { value: 246, label: "미션 PR 제출자" },
  { value: 25, label: "개설된 스터디 수" },
  { value: 170, label: "역대 밋업 참여" },
];

/* 등장 stagger 지연 — index 매핑 (Tailwind JIT가 정적으로 인식하도록 전체 클래스명 명시) */
const DELAY = ["delay-0", "delay-100", "delay-200", "delay-300"];

/* ── 카운트업 훅 ─────────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic — 앞쪽 쏠림이 덜해 숫자가 또렷이 올라가는 게 보임
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

/* ── 개별 숫자 카드 ──────────────────────────────────────────── */
function StatCard({
  value,
  label,
  index,
  revealed,
  counting,
}: (typeof STATS)[number] & {
  index: number;
  revealed: boolean;
  counting: boolean;
}) {
  const count = useCountUp(value, counting);

  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-lg bg-surface-container-lowest px-4 py-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] sm:px-6 sm:py-8 ${DELAY[index]} ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <p className="flex items-center gap-1 tabular-nums">
        <span className="text-4xl font-bold leading-none tracking-tight text-primary sm:text-5xl">
          {count.toLocaleString()}
        </span>
        <span className="text-2xl font-semibold leading-none text-secondary sm:text-3xl">
          +
        </span>
      </p>
      <p className="text-sm font-medium text-on-surface-variant">{label}</p>
    </div>
  );
}

/* ── 섹션 ────────────────────────────────────────────────────── */
export function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false); // 섹션 등장 reveal
  const [countActive, setCountActive] = useState(false); // 카운트업

  /* 섹션 진입 → 좌측 컬럼·버튼 등장 */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect(); // 한 번만 실행
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* 숫자 카드가 화면에 들어오면 → 카운트업 시작 (속도는 duration으로 조절) */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountActive(true);
          observer.disconnect(); // 한 번만 실행
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* 좌측 — 라벨 / 헤드라인 / 일러스트 */}
          <div
            className={`transition-all duration-700 ease-out ${
              active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <SectionHeader eyebrow="SINCE 2023.11" title="숫자로 보는 초록" />
            {/* TODO: 사진 준비되면 image-sources/history-growth.png 교체 후 npm run optimize:images (초록이 자라나는 과정) */}
            <Image
              src="/history-growth.webp"
              alt="초록이 자라나는 과정 일러스트"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 36vw, 80vw"
              className="mt-8 h-auto w-4/5 mx-auto lg:mx-0"
            />
          </div>

          {/* 우측 — 2×2 숫자 카드 */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4 sm:gap-6">
            {STATS.map((stat, index) => (
              <StatCard
                key={stat.label}
                {...stat}
                index={index}
                revealed={active}
                counting={countActive}
              />
            ))}
          </div>
        </div>

        {/* 하단 — 아카이브로 잇는 진입점 */}
        <div
          className={`mt-12 flex justify-center transition-all duration-700 ease-out delay-300 ${
            active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Button href="/archive" variant="ghost" size="lg">
            아카이브에서 더 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
