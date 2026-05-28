import { Button } from "@/src/components/common/Button";

type Status = "recruiting" | "closed" | "seasonal";

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  recruiting: {
    label: "현재 모집 중",
    className: "bg-chorok-100 text-chorok-700",
  },
  closed: {
    label: "현재 모집 마감",
    className: "bg-gray-100 text-gray-500",
  },
  seasonal: {
    label: "시즌제",
    className: "bg-project-100 text-project-700",
  },
};

const CORE_ACTIVITIES = [
  {
    emoji: "🟢",
    name: "초록스터디",
    status: "recruiting" as Status,
    accentClass: "border-chorok-200 bg-white",
    labelClass: "text-chorok-700",
    what: "14주 단위 리드 중심 학습 모임",
    who: "배운 것을 전하고 싶은 리드 + 스터디원",
    features: ["검증된 운영 가이드", "코드 리뷰 문화"],
    cta: { label: "리드 신청하기", href: "https://forms.gle/REPLACE_ME", external: true },
  },
  {
    emoji: "🟣",
    name: "초록해듀오",
    status: "closed" as Status,
    accentClass: "border-duo-200 bg-white",
    labelClass: "text-duo-600",
    what: "멘토-멘티 매칭 학습 모임",
    who: "1:1 밀도 있는 학습이 필요한 사람",
    features: ["멘토와 멘티 매칭", "자율적 운영"],
    cta: null,
  },
  {
    emoji: "🟠",
    name: "초록프로젝트",
    status: "seasonal" as Status,
    accentClass: "border-project-200 bg-white",
    labelClass: "text-project-600",
    what: "실전 협업 팀 프로젝트",
    who: "학습한 것을 실제로 적용해보고 싶은 사람",
    features: ["팀 단위 운영"],
    cta: null,
  },
];

const OTHER_ACTIVITIES = ["AI 활용 워크숍", "초록 밋업"];

export function ActivitiesSection() {
  return (
    <section className="bg-bg-base py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">

        {/* 섹션 제목 */}
        <h2 className="max-w-2xl text-3xl font-bold leading-snug tracking-tight text-text-primary md:text-4xl">
          초록에는 다양한 방식으로
          <br />
          함께 배울 수 있는 활동들이 있습니다.
        </h2>

        {/* 핵심 활동 카드 */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CORE_ACTIVITIES.map((activity) => {
            const status = STATUS_CONFIG[activity.status];
            return (
              <article
                key={activity.name}
                className={`flex flex-col rounded-2xl border p-6 shadow-sm ${activity.accentClass}`}
              >
                {/* 헤더 */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-lg font-bold ${activity.labelClass}`}>
                    {activity.emoji} {activity.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* 본문 */}
                <dl className="mt-5 flex flex-col gap-4 text-sm">
                  <div>
                    <dt className="mb-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
                      무엇을
                    </dt>
                    <dd className="text-text-primary">{activity.what}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
                      누가
                    </dt>
                    <dd className="text-text-primary">{activity.who}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
                      특징
                    </dt>
                    <dd>
                      <ul className="flex flex-wrap gap-x-1 gap-y-1.5">
                        {activity.features.map((f) => (
                          <li
                            key={f}
                            className="rounded-md bg-bg-base px-2 py-0.5 text-xs text-text-secondary ring-1 ring-border"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                {/* CTA */}
                {activity.cta && (
                  <div className="mt-auto pt-6">
                    <Button
                      href={activity.cta.href}
                      external={activity.cta.external}
                      size="sm"
                      className="w-full"
                    >
                      {activity.cta.label}
                    </Button>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* 그 외 활동 */}
        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-xl bg-bg-surface px-6 py-4 ring-1 ring-border">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            그 외 활동
          </span>
          <span className="text-border" aria-hidden="true">|</span>
          {OTHER_ACTIVITIES.map((name, i) => (
            <span key={name} className="flex items-center gap-3">
              <span className="text-sm text-text-secondary">{name}</span>
              {i < OTHER_ACTIVITIES.length - 1 && (
                <span className="text-border" aria-hidden="true">·</span>
              )}
            </span>
          ))}
          <p className="w-full pt-0.5 text-xs text-text-muted">
            시즌마다 열리는 활동으로, 별도 공지를 통해 모집합니다.
          </p>
        </div>

      </div>
    </section>
  );
}
