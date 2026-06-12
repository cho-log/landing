import { SITE_LINKS } from "@/src/lib/links";

export function IdentitySection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xl leading-relaxed font-semibold text-on-surface md:text-2xl">
          초록은 배움을 나눔으로 잇는 커뮤니티입니다.{" "}
          <br className="hidden md:block" />
          좋은 교육을 경험한 사람들이 그 경험을 다시 누군가에게 전하고,
          <br className="hidden md:block" />
          함께 성장하는 흐름을 만들어가고 있습니다.
        </p>
        <div className="mt-8 flex flex-col gap-6">
          <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
            나눔의 형태는 하나가 아닙니다. 초록에서는 스터디, 멘토링, 프로젝트,
            AI 워크숍, 밋업처럼 여러 방식의 배움과 나눔이 열려왔습니다. 누군가는
            커리큘럼을 만들어 스터디를 이끌고, 누군가는 리뷰어로 피드백을
            건네고, 누군가는 함께 만들고 모이는 자리를 엽니다.
          </p>
          <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
            무엇을 시도하든 혼자 감당하기는 쉽지 않습니다. 초록은 그 부담을
            줄이고, 한 번 나눔을 경험한 사람이 다시 누군가의 배움을 이끄는
            선순환이 이어지도록 환경을 만들어갑니다. 우아한테크코스에서 시작된
            교육 방식을 토대로 출발했습니다.
          </p>
        </div>

        <a
          href={SITE_LINKS.brunchIntro}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-baseline gap-3"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            더 읽기
          </span>
          <span
            aria-hidden="true"
            className="text-primary transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
          <span className="text-sm text-on-surface-variant transition-colors group-hover:text-on-surface">
            류성현,{" "}
            <cite className="not-italic">
              &ldquo;초록 스터디: 배움에서 나눔으로&rdquo;
            </cite>{" "}
            · Brunch, 2024.12
          </span>
        </a>
      </div>
    </section>
  );
}
