"use client";

import { useEffect, useRef, useState } from "react";

/* ── 시안 B: 인터랙티브 버블 차트 ───────────────────────────────
   값 비례 반지름(r = 5.5 + 0.6·√value)의 원 7개를 겹치지 않게 군집 배치.
   네트워크(forest) / 활동(sage) 2톤. 진입 시 bloom + count-up.
   모션: 아이들 부유 + 커서 패럴럭스 드리프트 + 근처 버블 repel — 단일 rAF에서
   세 변위를 합산해 transform 하나로 적용(lerp로 부드럽게). reduced-motion이면 정적.
   (프리뷰용 self-contained) */

const INTRO = "2023년 11월부터, 초록은 이만큼 넓어졌습니다.";
const AS_OF = "2026.6";

const BOX_H = 78; // 컨테이너 가로 100 기준 세로 비율

type Kind = "net" | "act";
/* cx: 가로%(=left), cy: 세로(0~78), r: 반지름(가로% 단위) */
const NODES: {
  value: number;
  label: string;
  kind: Kind;
  cx: number;
  cy: number;
  r: number;
}[] = [
  { value: 434, label: "디스코드 멤버", kind: "act", cx: 26, cy: 42, r: 18.0 },
  { value: 246, label: "미션 PR 제출자", kind: "act", cx: 60, cy: 26, r: 14.91 },
  { value: 170, label: "역대 밋업 참여", kind: "act", cx: 64, cy: 58, r: 13.32 },
  { value: 33, label: "리드·멘토", kind: "net", cx: 22, cy: 14, r: 8.95 },
  { value: 25, label: "개설된 스터디", kind: "act", cx: 16, cy: 68, r: 8.5 },
  { value: 15, label: "함께한 대학", kind: "net", cx: 40, cy: 12, r: 7.82 },
  { value: 6, label: "초록 자체 프로그램", kind: "net", cx: 86, cy: 44, r: 6.97 },
];

const R_MIN = 6.97;
const R_MAX = 18.0;

/* 모션 튜닝 상수 (px 기준, 프리뷰에서 조절) */
const FLOAT_AMP = 7; // 부유 진폭
const PARALLAX = 16; // 패럴럭스 최대 변위
const REPEL_STRENGTH = 46; // repel 세기
const REPEL_R_FRAC = 0.34; // repel 영향 반경(컨테이너 가로 대비)
const LERP = 0.12;

/* 큰 버블일수록 덜 움직임(질량감): r=R_MAX→0.4, r=R_MIN→1.0 */
function mobility(r: number) {
  return 1 - 0.6 * ((r - R_MIN) / (R_MAX - R_MIN));
}

function fontFor(value: number) {
  if (value >= 200) return "text-3xl md:text-4xl";
  if (value >= 100) return "text-2xl md:text-3xl";
  if (value >= 30) return "text-xl md:text-2xl";
  if (value >= 15) return "text-lg md:text-xl";
  return "text-base md:text-lg";
}

const DELAY = [
  "delay-[0ms]",
  "delay-[90ms]",
  "delay-[180ms]",
  "delay-[270ms]",
  "delay-[360ms]",
  "delay-[450ms]",
  "delay-[540ms]",
];

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

/* 부유 + 패럴럭스 + repel을 단일 rAF로 구동해 각 버블 transform에 적용 */
function useBubbleMotion(active: boolean) {
  const boxRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = useRef({ x: 0.5, y: 0.5, inside: false });
  const cur = useRef(NODES.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    if (!active) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const loop = () => {
      const box = boxRef.current;
      if (box) {
        const W = box.clientWidth;
        const H = box.clientHeight;
        const t = performance.now() / 1000;
        const p = pointer.current;

        NODES.forEach((node, i) => {
          const el = bubbleRefs.current[i];
          if (!el) return;
          const m = mobility(node.r);

          // 1) 아이들 부유 (연속, lerp 불필요)
          const fx = Math.sin(t * (0.55 + (i % 3) * 0.12) + i * 1.7) * FLOAT_AMP;
          const fy =
            Math.cos(t * (0.45 + (i % 2) * 0.15) + i * 2.3) * FLOAT_AMP * 0.85;

          // 목표 변위 (패럴럭스 + repel) — 포인터 안에 있을 때만
          let tx = 0;
          let ty = 0;
          if (p.inside) {
            // 2) 패럴럭스: 포인터 반대 방향으로 깊이감 드리프트
            tx += -(p.x - 0.5) * PARALLAX * m;
            ty += -(p.y - 0.5) * PARALLAX * m;

            // 3) repel: 포인터에 가까운 버블을 바깥으로
            const bx = (node.cx / 100) * W;
            const by = (node.cy / BOX_H) * H;
            const dx = bx - p.x * W;
            const dy = by - p.y * H;
            const dist = Math.hypot(dx, dy) || 0.0001;
            const R = REPEL_R_FRAC * W;
            if (dist < R) {
              const push = (1 - dist / R) * REPEL_STRENGTH * m;
              tx += (dx / dist) * push;
              ty += (dy / dist) * push;
            }
          }

          const c = cur.current[i];
          c.x += (tx - c.x) * LERP;
          c.y += (ty - c.y) * LERP;

          el.style.transform = `translate(${(c.x + fx).toFixed(2)}px, ${(c.y + fy).toFixed(2)}px)`;
        });
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
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      inside: true,
    };
  };
  const onPointerLeave = () => {
    pointer.current.inside = false;
  };

  return { boxRef, bubbleRefs, onPointerMove, onPointerLeave };
}

export function NetworkStatsSectionV3() {
  const { ref, active } = useInViewOnce();
  const { boxRef, bubbleRefs, onPointerMove, onPointerLeave } =
    useBubbleMotion(active);
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
          className="relative mx-auto mt-8 aspect-[100/78] w-full max-w-[560px]"
        >
          {NODES.map((node, i) => {
            const tone =
              node.kind === "net"
                ? "bg-primary text-on-primary"
                : "bg-secondary-container text-on-secondary-container";
            return (
              // 1) 중심 고정 래퍼
              <div
                key={node.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${node.cx}%`,
                  top: `${(node.cy / BOX_H) * 100}%`,
                  width: `${node.r * 2}%`,
                }}
              >
                {/* 2) 모션 레이어 (JS transform) */}
                <div
                  ref={(el) => {
                    bubbleRefs.current[i] = el;
                  }}
                  className="will-change-transform"
                >
                  {/* 3) 버블 본체 (진입 bloom) */}
                  <div
                    className={`flex aspect-square w-full flex-col items-center justify-center gap-0.5 rounded-full px-2 text-center ${tone} ${DELAY[i]} transition-all duration-700 ease-out ${
                      active ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    }`}
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
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-right text-xs text-outline">{AS_OF} 기준</p>
      </div>
    </section>
  );
}
