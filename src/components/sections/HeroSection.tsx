import Image from "next/image";
import { Button } from "@/src/components/common/Button";
import { blur } from "@/src/generated/blur";

export function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center">
      {/* 배경 이미지 */}
      <Image
        src="/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blur.hero}
        className="object-cover"
        aria-hidden="true"
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        <h1 className="text-6xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
          배움에서 나눔으로
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-white/75 md:text-2xl">
          성장과 나눔으로 함께하는 개발자 커뮤니티
        </p>
        <div className="mt-8">
          <Button
            href="#intro"
            size="lg"
            className="!bg-white/10 !text-white !border !border-white/40 backdrop-blur-sm hover:!bg-white/20 !px-10"
          >
            더보기
          </Button>
        </div>
      </div>

      {/* 하단 스크롤 유도 화살표 */}
      <a
        href="#intro"
        aria-label="다음 섹션으로 스크롤"
        className="absolute bottom-32 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
