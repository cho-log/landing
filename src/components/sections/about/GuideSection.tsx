import { Button } from "@/src/components/common/Button";

// TODO: 실제 운영 가이드 링크로 교체
const GUIDE_PREVIEW_URL = "https://REPLACE_ME";

const CHECKLIST = [
  "주차별 모임 진행 상세 스크립트",
  "역대 리드들의 실전 노하우 모음",
  "역대 리드 디스코드 채널 액세스",
];

export function GuideSection() {
  return (
    <section className="bg-primary py-24 text-on-primary">
      <div className="mx-auto max-w-3xl px-4 md:px-6">

        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-inverse-primary">
            가장 많이 듣는 질문
          </p>
          <blockquote className="mt-4 text-3xl font-bold leading-snug tracking-tight text-on-primary md:text-4xl">
            "리드 잘 할 수 있을까?"
          </blockquote>
          <p className="mt-5 text-base leading-relaxed text-on-primary-container">
            걱정하지 않아도 됩니다. 초록은 리드가 혼자 설계하지 않아도 되도록
            <br className="hidden md:block" />
            검증된 운영 가이드를 함께 제공합니다.
          </p>
        </div>

        <div className="my-12 border-t border-primary-container" />

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
          <div className="flex-1">
            <p className="mb-6 text-sm font-semibold text-inverse-primary">
              선발 후 제공되는 것
            </p>
            <ul className="flex flex-col gap-4">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3 w-3 text-on-secondary"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed text-on-primary-container">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-lg border border-primary-container bg-primary-container/50 px-6 py-6 md:min-w-[220px]">
            <div>
              <p className="text-sm font-semibold text-on-primary">운영 가이드 기본편</p>
              <p className="mt-1 text-xs leading-relaxed text-inverse-primary">
                실제로 어떤 내용인지
                <br />
                미리 확인해보세요.
              </p>
            </div>
            <Button
              href={GUIDE_PREVIEW_URL}
              external
              variant="ghost"
              className="text-inverse-primary hover:text-on-primary"
            >
              미리보기
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
