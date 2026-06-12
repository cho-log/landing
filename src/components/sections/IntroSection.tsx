"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
              초록은 배움을 나눔으로 잇는 커뮤니티입니다.{" "}
              <br className="hidden md:block" />
              좋은 교육을 경험한 사람들이 그 경험을 다시 누군가에게 전하고,{" "}
              <br className="hidden md:block" />
              함께 성장하는 흐름을 만들어가고 있습니다.
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-base font-semibold text-primary transition-colors hover:text-on-primary-container md:text-lg"
              >
                초록 더 알아보기
                <span aria-hidden="true">→</span>
              </Link>
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
