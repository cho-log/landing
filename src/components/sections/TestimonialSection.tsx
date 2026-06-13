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

    // scrollLeft(정수 전용·매 프레임 reflow) 대신 transform으로 구동한다.
    // 소수 position을 그대로 translate3d에 넣어 서브픽셀 부드러움 + GPU 합성.
    let rafId = 0;
    let position = 0; // 누적 이동량(px), 소수 유지
    let halfWidth = 0; // inner.scrollWidth / 2 — 매 프레임 읽지 않고 캐시
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;
    let dragDistance = 0;
    let activePointerId: number | null = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const measure = () => {
      halfWidth = inner.scrollWidth / 2;
    };
    measure();

    const tick = () => {
      if (!isDragging && !prefersReducedMotion) {
        position += AUTO_SCROLL_PX_PER_FRAME;
      }
      if (halfWidth > 0) {
        if (position >= halfWidth) position -= halfWidth;
        else if (position < 0) position += halfWidth;
      }
      inner.style.transform = `translate3d(${-position}px, 0, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartPos = position;
      dragDistance = 0;
      activePointerId = e.pointerId;
      container.setPointerCapture(e.pointerId);
      container.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      dragDistance = Math.abs(dx);
      position = dragStartPos - dx;
    };
    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      if (activePointerId !== null) {
        container.releasePointerCapture(activePointerId);
        activePointerId = null;
      }
      container.style.cursor = "";
    };

    const onClickCapture = (e: MouseEvent) => {
      if (dragDistance > DRAG_THRESHOLD_PX) {
        e.preventDefault();
        e.stopPropagation();
        dragDistance = 0;
      }
    };

    // 트랙패드/휠 가로 스크롤 — 가로 의도일 때만 가로채고 세로 페이지 스크롤은 통과
    const onWheel = (e: WheelEvent) => {
      const dx =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (dx === 0) return;
      e.preventDefault();
      position += dx;
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(inner);

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("click", onClickCapture, true);
    container.addEventListener("wheel", onWheel, { passive: false });

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("click", onClickCapture, true);
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        cursor-grab select-none overflow-hidden [touch-action:pan-y]
        [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
      "
    >
      <div
        ref={innerRef}
        className="flex gap-5 py-2 [width:max-content] [will-change:transform]"
      >
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
