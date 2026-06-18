"use client";

import { useEffect, useRef, useState } from "react";
import { archiveStats } from "@/src/data/stats";

/* ── 네트워크 수치: 떨어져 쌓이는 버블 ───────────────────────────
   값 비례 반지름의 원 7개가 위에서 떨어져 바닥에 쌓인다(중력 + 원-원 충돌 + 벽/바닥).
   커서가 가까이 가면 더미를 가볍게 휘젓고 다시 가라앉는다. 새 의존성 없이 단일 rAF 물리 시뮬.
   숫자는 최종값을 단 채 낙하한다(낙하 자체가 연출). reduced-motion이면 동일 물리를 동기로 돌려 정적 안착(접근성). */

/* 초록 그라데이션: 디자인 시스템 초록 7토큰(surface-tint 포함)을 명도순으로 정렬한 램프.
   값이 클수록 진한 초록 — 명도가 단조롭게 진→연으로 흐른다. */
const GREEN_RAMP: { bg: string; text: string }[] = [
  { bg: "bg-primary", text: "text-on-primary" }, // #163826 가장 큰 값
  { bg: "bg-primary-container", text: "text-on-primary" }, // #2d4f3c
  { bg: "bg-surface-tint", text: "text-white" }, // #436651
  { bg: "bg-secondary", text: "text-on-secondary" }, // #4a654f
  { bg: "bg-secondary-fixed-dim", text: "text-on-secondary-fixed" }, // #b0ceb4
  { bg: "bg-secondary-container", text: "text-on-secondary-container" }, // #c9e7cc
  { bg: "bg-primary-fixed", text: "text-on-primary-fixed" }, // #c5ecd2 가장 작은 값
];

/* 값 내림차순 랭크(0=최대) → 램프 인덱스. 동률은 안정적으로 입력 순서 유지. */
const RANK = archiveStats.items
  .map((it, i) => ({ i, value: it.value }))
  .sort((a, b) => b.value - a.value || a.i - b.i)
  .reduce<Record<number, number>>((acc, it, rank) => {
    acc[it.i] = rank;
    return acc;
  }, {});

/* stats 단일 소스에서 파생: 반지름은 값 비례 r = 5.5 + 0.6·√value (가로% 단위),
   색은 값 순 초록 램프(GREEN_RAMP[랭크]). */
const NODES = archiveStats.items.map((it, i) => ({
  value: it.value,
  label: it.label,
  tone: GREEN_RAMP[RANK[i]],
  r: 5.5 + 0.6 * Math.sqrt(it.value),
}));

/* 물리 튜닝 상수 */
const G = 1600; // 중력 가속(px/s²)
const WALL_E = 0.3; // 벽/바닥 반발
const COLL_E = 0.2; // 충돌 반발
const FLOOR_FRICTION = 0.9;
const AIR_X = 0.995;
const AIR_Y = 0.999;
const STIR_R = 0.34; // 커서 영향 반경(가로 대비)
const STIR = 16000; // 커서 휘젓기 세기 — 중력 이겨 가볍게 흩어지도록
const VMAX = 1900; // 속도 상한
const SLEEP_V = 4; // 정지 임계
const SETTLE_STEPS = 480; // reduced-motion 정적 안착 스텝 수

function useInViewOnce(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, active };
}

type Body = { x: number; y: number; vx: number; vy: number };
type Pointer = { x: number; y: number; inside: boolean };

function useGravity(active: boolean) {
  const boxRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = useRef<Pointer>({ x: 0, y: 0, inside: false });

  useEffect(() => {
    if (!active) return;
    const box = boxRef.current;
    if (!box) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // 모바일(< md): 좁은 폭 과밀 + 영구 rAF 루프로 버벅이므로 정적 안착으로 렌더.
    // 터치는 커서 stir 이점도 없어 정적이 자연스럽다.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isStatic = reduce || isMobile;

    const radPx = (W: number) => NODES.map((n) => (n.r / 100) * W);
    const mass = NODES.map((n) => n.r * n.r);

    // 초기 낙하 위치 — 위에서 가로로 펼쳐 staggered
    const W0 = box.clientWidth;
    const rad0 = radPx(W0);
    const bodies: Body[] = NODES.map((n, i) => ({
      x: W0 * ((i + 0.5) / NODES.length),
      y: -rad0[i] - i * 46,
      vx: 0,
      vy: 0,
    }));

    // 한 스텝 적분: 중력 + (옵션)커서 휘젓기 + 충돌/벽 + 슬립
    const step = (dt: number, p: Pointer | null) => {
      const W = box.clientWidth;
      const H = box.clientHeight;
      const rad = radPx(W);

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        b.vy += G * dt;

        if (p && p.inside) {
          const dx = b.x - p.x;
          const dy = b.y - p.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const R = STIR_R * W;
          if (dist < R) {
            // 큰 버블도 충분히 반응하도록 가벼운 size scale (0.55~1.3)
            const sizeScale = Math.min(1.3, Math.max(0.55, 8 / NODES[i].r));
            const f = (1 - dist / R) * STIR * sizeScale;
            b.vx += (dx / dist) * f * dt;
            b.vy += (dy / dist) * f * dt;
          }
        }

        b.vx *= AIR_X;
        b.vy *= AIR_Y;

        const sp = Math.hypot(b.vx, b.vy);
        if (sp > VMAX) {
          b.vx = (b.vx / sp) * VMAX;
          b.vy = (b.vy / sp) * VMAX;
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }

      // 충돌 해소 (위치 보정 + 임펄스) — 안정성 위해 다중 패스
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i];
            const c = bodies[j];
            const dx = c.x - a.x;
            const dy = c.y - a.y;
            const d = Math.hypot(dx, dy) || 0.0001;
            const minD = rad[i] + rad[j];
            if (d < minD) {
              const nx = dx / d;
              const ny = dy / d;
              const overlap = minD - d;
              const wsum = mass[i] + mass[j];
              a.x -= nx * overlap * (mass[j] / wsum);
              a.y -= ny * overlap * (mass[j] / wsum);
              c.x += nx * overlap * (mass[i] / wsum);
              c.y += ny * overlap * (mass[i] / wsum);
              const rvn = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
              if (rvn < 0) {
                const imp = (-(1 + COLL_E) * rvn) / wsum;
                a.vx -= imp * mass[j] * nx;
                a.vy -= imp * mass[j] * ny;
                c.vx += imp * mass[i] * nx;
                c.vy += imp * mass[i] * ny;
              }
            }
          }
        }
        for (let i = 0; i < bodies.length; i++) {
          const b = bodies[i];
          if (b.x < rad[i]) {
            b.x = rad[i];
            b.vx = -b.vx * WALL_E;
          } else if (b.x > W - rad[i]) {
            b.x = W - rad[i];
            b.vx = -b.vx * WALL_E;
          }
          if (b.y > H - rad[i]) {
            b.y = H - rad[i];
            b.vy = -b.vy * WALL_E;
            b.vx *= FLOOR_FRICTION;
          }
        }
      }

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (Math.hypot(b.vx, b.vy) < SLEEP_V && b.y >= H - rad[i] - 1) {
          b.vx = 0;
          b.vy = 0;
        }
      }
    };

    const apply = () => {
      const W = box.clientWidth;
      const rad = radPx(W);
      for (let i = 0; i < bodies.length; i++) {
        const el = bubbleRefs.current[i];
        if (el)
          el.style.transform = `translate(${(bodies[i].x - rad[i]).toFixed(2)}px, ${(bodies[i].y - rad[i]).toFixed(2)}px)`;
      }
    };

    // reduced-motion / 모바일: 애니메이션 없이 동기로 안착시킨 뒤 한 번만 배치(rAF 루프 미시작 → 정적)
    if (isStatic) {
      for (let s = 0; s < SETTLE_STEPS; s++) step(1 / 60, null);
      apply();
      return;
    }

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.033) dt = 0.033;
      step(dt, pointer.current);
      apply();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    pointer.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    };
  };
  const onPointerLeave = () => {
    pointer.current.inside = false;
  };

  return { boxRef, bubbleRefs, onPointerMove, onPointerLeave };
}

/**
 * 아카이브 상단 네트워크 수치 — 값 비례 버블이 중력으로 떨어져 쌓이는 인터랙티브 비주얼.
 * 메인 HistorySection(2×2 카운트업)과 형태로 차별화하고, 기준일 라벨로 스냅샷임을 명시한다.
 */
export function NetworkStatsSection() {
  const { ref, active } = useInViewOnce();
  const { boxRef, bubbleRefs, onPointerMove, onPointerLeave } =
    useGravity(active);

  return (
    <section ref={ref} className="-mt-40 bg-background md:-mt-48">
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <div
          ref={boxRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative mx-auto h-[540px] w-full max-w-[680px] overflow-hidden md:h-[640px]"
        >
          {NODES.map((node, i) => {
            return (
              <div
                key={node.label}
                ref={(el) => {
                  bubbleRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 will-change-transform"
                style={{ width: `${node.r * 2}%`, containerType: "inline-size" }}
              >
                <div
                  className={`flex aspect-square w-full flex-col items-center justify-center gap-0.5 rounded-full px-2 text-center ${node.tone.bg} ${node.tone.text}`}
                >
                  <span
                    className="font-bold leading-none tracking-tight tabular-nums"
                    style={{ fontSize: "clamp(0.85rem,24cqw,3.75rem)" }}
                  >
                    {node.value}
                  </span>
                  <span className="text-[11px] leading-tight opacity-90 md:text-xs">
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="pointer-events-none absolute bottom-0 right-4 text-xs text-outline md:right-6">
          {archiveStats.asOf} 기준
        </p>
      </div>
    </section>
  );
}
