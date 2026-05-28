import { Button } from "@/src/components/common/Button";

// TODO: 실제 구글폼 URL로 교체
const GOOGLE_FORM_URL = "https://forms.gle/REPLACE_ME";

export function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">

      {/* 배경 이미지 — hero-bg 클래스로 나중에 교체 */}
      <div
        className="hero-bg absolute inset-0 bg-chorok-950"
        aria-hidden="true"
      />

      {/* 어두운 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        <h1 className="text-6xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
          배움에서 나눔으로
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-white/75 md:text-2xl">
          좋은 교육 경험을 더 많은 사람에게 전하는 개발자 커뮤니티
        </p>
        <div className="mt-8">
          <Button href={GOOGLE_FORM_URL} external size="lg">
            리드 신청하기
          </Button>
        </div>
      </div>
    </section>
  );
}
