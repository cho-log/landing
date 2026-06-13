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
    <section id="intro" className="scroll-mt-24 bg-background py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <div
          ref={textRef}
          className="translate-y-8 opacity-0 transition-all duration-700 ease-out"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
            ABOUT CHOLOG
          </p>
          <p className="mt-4 text-2xl leading-relaxed font-semibold text-balance text-on-surface md:text-3xl">
            초록은 배움을 나눔으로 잇는 커뮤니티입니다.
            <br className="hidden md:block" />
            좋은 교육을 경험한 사람들이
            <br className="hidden md:block" />
            그 경험을 다시 누군가에게 전하고,
            <br className="hidden md:block" />
            함께 성장하는 흐름을 만들어가고 있습니다.
          </p>
        </div>

        <div
          ref={imageRef}
          className="mx-auto mt-10 max-w-[24rem] translate-y-8 opacity-0 transition-all delay-150 duration-700 ease-out md:mt-12"
        >
          <Image
            src="/intro-leaves.webp"
            alt="함께 학습하고 협업하는 초록이 캐릭터 일러스트"
            width={1380}
            height={1100}
            sizes="(min-width: 768px) 28rem, 70vw"
            className="h-auto w-full"
          />
        </div>

        <div className="mt-16">
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-base font-semibold text-primary transition-colors hover:text-on-primary-container md:text-lg"
          >
            초록 더 알아보기
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
