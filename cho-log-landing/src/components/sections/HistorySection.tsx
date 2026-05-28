"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 246, unit: "명", label: "총 활동 멤버" },
  { value: 25,  unit: "개", label: "스터디" },
  { value: 170, unit: "명", label: "밋업 총 참여" },
];

/* ── 카운트업 훅 ─────────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart — 빠르게 올라오다 부드럽게 착지
      const eased = 1 - Math.pow(1 - progress, 4);
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
  unit,
  label,
  active,
}: (typeof STATS)[number] & { active: boolean }) {
  const count = useCountUp(value, active);

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white px-8 py-10 shadow-sm ring-1 ring-chorok-100">
      <p className="flex items-end gap-1 tabular-nums">
        <span className="text-6xl font-bold leading-none tracking-tight text-chorok-700 md:text-7xl">
          {count.toLocaleString()}
        </span>
        <span className="mb-1.5 text-xl font-semibold text-chorok-400">
          {unit}
        </span>
      </p>
      <p className="text-sm font-medium text-text-secondary">{label}</p>
    </div>
  );
}

/* ── 섹션 ────────────────────────────────────────────────────── */
export function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

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

  return (
    <section ref={sectionRef} className="bg-chorok-50 py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">

        <h2 className="text-center text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          역대 활동 히스토리
        </h2>
        <p className="mt-3 text-center text-sm text-text-secondary">
          초록이 함께 걸어온 시간들
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} active={active} />
          ))}
        </div>

      </div>
    </section>
  );
}
