"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/src/components/common/Button";
import type { Testimonial } from "@/src/types";
import { testimonials } from "@/src/data/testimonials";
import { getDailySeed, seededShuffle } from "@/src/lib/dailySeed";

const FEATURED_COUNT = 8;
const AUTO_SCROLL_PX_PER_FRAME = 0.5; // ≈ 30px/sec at 60fps
const DRAG_THRESHOLD_PX = 5;

/* hydration mismatch 방지용 — 서버는 false, 클라이언트는 마운트 직후 true */
const subscribe = () => () => {};
function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/* ── 카드 ─────────────────────────────────────────────────────── */
function TestimonialCard({ text, name, affiliation, role }: Testimonial) {
  return (
    <Link
      href="/archive#testimonials"
      draggable={false}
      className="
        group/card relative flex h-[320px] w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl
        bg-surface-container-lowest p-6
        shadow-[0_4px_24px_rgba(0,0,0,0.04)]
        transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        md:w-[360px]
      "
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-1 -top-4 select-none font-serif text-[88px] leading-none text-primary/10"
      >
        “
      </span>
      <blockquote className="line-clamp-8 whitespace-pre-line text-[15px] leading-relaxed text-on-surface-variant">
        {text}
      </blockquote>
      <div className="mt-auto border-t border-outline-variant/60 pt-3">
        <p className="text-sm font-semibold text-on-surface">{name}</p>
        <p className="mt-1 text-xs text-outline">
          {affiliation} · {role}
        </p>
      </div>
    </Link>
  );
}

/* ── 스크롤 트랙 (드래그 가능 + 자동 마퀴) ──────────────────────── */
function ScrollTrack({ items }: { items: Testimonial[] }) {
  const doubled = [...items, ...items];
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    let rafId = 0;
    // float 누적 — 브라우저는 scrollLeft를 정수로 라운딩하므로,
    // 소수 누적값을 별도로 유지하고 매 프레임 floor해서 대입한다.
    let virtualScrollLeft = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;
    let dragDistance = 0;

    const tick = () => {
      const halfWidth = inner.scrollWidth / 2;
      if (halfWidth > 0) {
        if (!isDragging) {
          virtualScrollLeft += AUTO_SCROLL_PX_PER_FRAME;
        }
        if (virtualScrollLeft >= halfWidth) virtualScrollLeft -= halfWidth;
        else if (virtualScrollLeft < 0) virtualScrollLeft += halfWidth;
        container.scrollLeft = Math.floor(virtualScrollLeft);
      }
      rafId = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      // 마우스만 드래그 — 터치는 native scroll 그대로
      if (e.pointerType !== "mouse") return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartScrollLeft = virtualScrollLeft;
      dragDistance = 0;
      container.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      dragDistance = Math.abs(dx);
      virtualScrollLeft = dragStartScrollLeft - dx;
    };
    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = "";
    };

    const onClickCapture = (e: MouseEvent) => {
      if (dragDistance > DRAG_THRESHOLD_PX) {
        e.preventDefault();
        e.stopPropagation();
        dragDistance = 0;
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("click", onClickCapture, true);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        cursor-grab select-none overflow-x-auto
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
      "
    >
      <div ref={innerRef} className="flex gap-5 py-2 [width:max-content]">
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ── 섹션 ─────────────────────────────────────────────────────── */
export function TestimonialSection() {
  // SSR: CSV 원래 순서대로 첫 N개 (hydration mismatch 방지)
  // Hydration 직후: 날짜 시드 셔플 결과로 교체
  const isClient = useIsClient();
  const featured: Testimonial[] = isClient
    ? seededShuffle(testimonials, getDailySeed(), FEATURED_COUNT)
    : testimonials.slice(0, FEATURED_COUNT);

  return (
    <section className="overflow-hidden bg-background py-24">
      <div className="mx-auto mb-12 max-w-4xl px-4 text-center md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
          후기로 보는 초록
        </h2>
      </div>

      <ScrollTrack items={featured} />

      <div className="mt-8 flex justify-center px-4">
        <Button href="/archive#testimonials" variant="ghost" size="lg">
          후기 모두 보기
        </Button>
      </div>
    </section>
  );
}
