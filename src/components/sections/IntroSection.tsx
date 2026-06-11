"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
  const textRef = useFadeIn();
  const imageRef = useFadeIn();

  return (
    <section id="intro" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-12 md:items-center md:gap-10">
          <div
            ref={textRef}
            className="translate-y-8 opacity-0 transition-all duration-700 ease-out md:col-span-7 md:order-1"
          >
            <p className="text-xl leading-relaxed font-semibold text-on-surface md:text-2xl">
              초록은 배움을 나눔으로 잇는 커뮤니티입니다. 좋은 교육을 경험한
              사람들이 그 경험을 다시 누군가에게 전하고, 함께 성장하는 흐름을
              만들어가고 있습니다.
            </p>
            <div className="mt-8 flex flex-col gap-6">
              <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
                나눔의 형태는 하나가 아닙니다. 초록에서는 스터디, 멘토링,
                프로젝트, AI 워크숍, 밋업처럼 여러 방식의 배움과 나눔이
                열려왔습니다. 누군가는 커리큘럼을 만들어 스터디를 이끌고,
                누군가는 리뷰어로 피드백을 건네고, 누군가는 함께 만들고 모이는
                자리를 엽니다.
              </p>
              <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
                무엇을 시도하든 혼자 감당하기는 쉽지 않습니다. 초록은 그 부담을
                줄이고, 한 번 나눔을 경험한 사람이 다시 누군가의 배움을 이끄는
                선순환이 이어지도록 환경을 만들어갑니다. 우아한테크코스에서
                시작된 교육 방식을 토대로 출발했습니다.
              </p>
            </div>
          </div>

          <div
            ref={imageRef}
            className="translate-y-8 opacity-0 transition-all delay-150 duration-700 ease-out md:col-span-5 md:order-2"
          >
            <Image
              src="/intro-leaves.png"
              alt="함께 학습하고 협업하는 초록이 캐릭터 일러스트"
              width={1380}
              height={1100}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="mx-auto h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
