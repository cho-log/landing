"use client";

import { useEffect, useRef, useState } from "react";

/* ── 시안 B-중력: 떨어져 쌓이는 버블 ────────────────────────────
   값 비례 반지름의 원 7개가 위에서 떨어져 바닥에 쌓인다(중력 + 원-원 충돌 + 벽/바닥).
   커서가 가까이 가면 흩어졌다가 다시 가라앉음. 새 의존성 없이 단일 rAF 물리 시뮬.
   진입 시 낙하 + count-up. reduced-motion이면 정적 배치. (프리뷰용 self-contained) */

const INTRO = "2023년 11월부터, 초록은 이만큼 넓어졌습니다.";
const AS_OF = "2026.6";

const BOX_H = 78; // 컨테이너 가로 100 기준 세로 비율

type Kind = "net" | "act";
/* r: 반지름(가로% 단위), cx/cy: reduced-motion 정적 배치용 */
const NODES: {
  value: number;
  label: string;
  kind: Kind;
  r: number;
  cx: number;
  cy: number;
}[] = [
  { value: 434, label: "디스코드 멤버", kind: "act", r: 18.0, cx: 26, cy: 42 },
  { value: 246, label: "미션 PR 제출자", kind: "act", r: 14.91, cx: 60, cy: 26 },
  { value: 170, label: "역대 밋업 참여", kind: "act", r: 13.32, cx: 64, cy: 58 },
  { value: 33, label: "리드·멘토", kind: "net", r: 8.95, cx: 22, cy: 14 },
  { value: 25, label: "개설된 스터디", kind: "act", r: 8.5, cx: 16, cy: 68 },
  { value: 15, label: "함께한 대학", kind: "net", r: 7.82, cx: 40, cy: 12 },
  { value: 6, label: "초록 자체 프로그램", kind: "net", r: 6.97, cx: 86, cy: 44 },
];

/* 물리 튜닝 상수 */
const G = 1600; // 중력 가속(px/s²) — 살짝 낮춰 더미를 더 잘 휘젓게
const WALL_E = 0.3; // 벽/바닥 반발
const COLL_E = 0.2; // 충돌 반발
const FLOOR_FRICTION = 0.9;
const AIR_X = 0.995;
const AIR_Y = 0.999;
const STIR_R = 0.34; // 커서 영향 반경(가로 대비)
const STIR = 16000; // 커서 휘젓기 세기 — 중력 이겨 가볍게 흩어지도록
const VMAX = 1900; // 속도 상한
const SLEEP_V = 4; // 정지 임계

function fontFor(value: number) {
  if (value >= 200) return "text-3xl md:text-4xl";
  if (value >= 100) return "text-2xl md:text-3xl";
  if (value >= 30) return "text-xl md:text-2xl";
  if (value >= 15) return "text-lg md:text-xl";
  return "text-base md:text-lg";
}

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);
  return count;
}

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

function useGravity(active: boolean) {
  const boxRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0, inside: false });

  useEffect(() => {
    if (!active) return;
    const box = boxRef.current;
    if (!box) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const radPx = (W: number) => NODES.map((n) => (n.r / 100) * W);
    const mass = NODES.map((n) => n.r * n.r);

    // 정적 배치 헬퍼 (reduced-motion 또는 초기 좌표)
    const place = (i: number, x: number, y: number) => {
      const el = bubbleRefs.current[i];
      const W = box.clientWidth;
      const rad = (NODES[i].r / 100) * W;
      if (el) el.style.transform = `translate(${x - rad}px, ${y - rad}px)`;
    };

    if (reduce) {
      const W = box.clientWidth;
      const H = box.clientHeight;
      NODES.forEach((n, i) =>
        place(i, (n.cx / 100) * W, (n.cy / BOX_H) * H),
      );
      return;
    }

    // 초기 낙하 위치 — 위에서 가로로 펼쳐 staggered
    const W0 = box.clientWidth;
    const rad0 = radPx(W0);
    const bodies: Body[] = NODES.map((n, i) => ({
      x: W0 * ((i + 0.5) / NODES.length),
      y: -rad0[i] - i * 46,
      vx: 0,
      vy: 0,
    }));

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const W = box.clientWidth;
      const H = box.clientHeight;
      const rad = radPx(W);
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.033) dt = 0.033;

      const p = pointer.current;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        b.vy += G * dt;

        // 커서 휘젓기 (repel)
        if (p.inside) {
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

        // 속도 상한
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
              // 법선 방향 상대속도 → 임펄스
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
        // 벽/바닥
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

      // 정지 슬립 + transform 적용
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (Math.hypot(b.vx, b.vy) < SLEEP_V && b.y >= H - rad[i] - 1) {
          b.vx = 0;
          b.vy = 0;
        }
        const el = bubbleRefs.current[i];
        if (el)
          el.style.transform = `translate(${(b.x - rad[i]).toFixed(2)}px, ${(b.y - rad[i]).toFixed(2)}px)`;
      }

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

export function NetworkStatsSectionGravity() {
  const { ref, active } = useInViewOnce();
  const { boxRef, bubbleRefs, onPointerMove, onPointerLeave } =
    useGravity(active);
  const counts = [
    useCountUp(NODES[0].value, active),
    useCountUp(NODES[1].value, active),
    useCountUp(NODES[2].value, active),
    useCountUp(NODES[3].value, active),
    useCountUp(NODES[4].value, active),
    useCountUp(NODES[5].value, active),
    useCountUp(NODES[6].value, active),
  ];

  return (
    <section ref={ref} className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <p className="text-center text-base text-on-surface-variant md:text-lg">
          {INTRO}
        </p>

        <div
          ref={boxRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative mx-auto mt-8 aspect-[100/78] w-full max-w-[560px] overflow-hidden"
        >
          {NODES.map((node, i) => {
            const tone =
              node.kind === "net"
                ? "bg-primary text-on-primary"
                : "bg-secondary-container text-on-secondary-container";
            return (
              <div
                key={node.label}
                ref={(el) => {
                  bubbleRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 will-change-transform"
                style={{ width: `${node.r * 2}%` }}
              >
                <div
                  className={`flex aspect-square w-full flex-col items-center justify-center gap-0.5 rounded-full px-2 text-center ${tone}`}
                >
                  <span
                    className={`font-bold leading-none tracking-tight tabular-nums ${fontFor(node.value)}`}
                  >
                    {counts[i]}
                  </span>
                  <span className="text-[10px] leading-tight opacity-90 md:text-[11px]">
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-right text-xs text-outline">{AS_OF} 기준</p>
      </div>
    </section>
  );
}
