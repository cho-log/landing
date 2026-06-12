import { Button } from "@/src/components/common/Button";
import { SITE_LINKS } from "@/src/lib/links";

type Status = "recruiting" | "closed" | "seasonal";

const STATUS_CONFIG: Record<Status, { label: string; badgeClass: string }> = {
  recruiting: {
    label: "현재 모집 중",
    badgeClass: "border border-secondary-fixed-dim bg-secondary-container text-on-secondary-container",
  },
  closed: {
    label: "현재 모집 마감",
    badgeClass: "border border-outline-variant bg-surface-container text-outline",
  },
  seasonal: {
    label: "시즌제",
    badgeClass: "border border-project bg-project-container text-on-project-container",
  },
};

const CORE_ACTIVITIES = [
  {
    name: "초록스터디",
    status: "recruiting" as Status,
    dotColor: "bg-secondary",
    topBorder: "border-t-primary",
    what: "14주 단위 리드 중심 학습 모임",
    who: "배운 것을 전하고 싶은 리드 + 스터디원",
    features: ["검증된 운영 가이드", "코드 리뷰 문화"],
    cta: { label: "리드 신청하기", href: SITE_LINKS.applyForm, external: true, variant: "primary" as const },
  },
  {
    name: "초록해듀오",
    status: "closed" as Status,
    dotColor: "bg-duo",
    topBorder: "border-t-duo",
    what: "멘토-멘티 매칭 학습 모임",
    who: "1:1 밀도 있는 학습이 필요한 사람",
    features: ["멘토와 멘티 매칭", "자율적 운영"],
    cta: { label: "다음 기수 알림 받기", href: "#", external: false, variant: "secondary" as const },
  },
  {
    name: "초록프로젝트",
    status: "seasonal" as Status,
    dotColor: "bg-project",
    topBorder: "border-t-project",
    what: "실전 협업 팀 프로젝트",
    who: "학습한 것을 실제로 적용해보고 싶은 사람",
    features: ["팀 단위 운영"],
    cta: { label: "시즌 공지 받기", href: "#", external: false, variant: "secondary" as const },
  },
];

const OTHER_ACTIVITIES = ["AI 활용 워크숍", "초록 밋업"];

export function ActivitiesSection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">

        <h2 className="max-w-2xl text-3xl font-bold leading-snug tracking-tight text-on-surface md:text-4xl">
          초록에는 다양한 방식으로
          <br />
          함께 배울 수 있는 활동들이 있습니다.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CORE_ACTIVITIES.map((activity) => {
            const status = STATUS_CONFIG[activity.status];
            return (
              <article
                key={activity.name}
                className={`flex flex-col rounded-lg border-t-4 ${activity.topBorder} bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block h-3 w-3 rounded-full ${activity.dotColor}`}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold text-on-surface">
                      {activity.name}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.badgeClass}`}
                  >
                    {status.label}
                  </span>
                </div>

                <dl className="mt-6 flex flex-col gap-5 text-sm">
                  <div>
                    <dt className="mb-1.5 flex items-center gap-1.5 text-xs text-outline">
                      <span aria-hidden="true">◎</span> 무엇을
                    </dt>
                    <dd className="font-semibold text-on-surface">{activity.what}</dd>
                  </div>
                  <div>
                    <dt className="mb-1.5 flex items-center gap-1.5 text-xs text-outline">
                      <span aria-hidden="true">👤</span> 누가
                    </dt>
                    <dd className="font-semibold text-on-surface">{activity.who}</dd>
                  </div>
                  <div>
                    <dt className="mb-1.5 flex items-center gap-1.5 text-xs text-outline">
                      <span aria-hidden="true">☆</span> 특징
                    </dt>
                    <dd>
                      <ul className="flex flex-wrap gap-2">
                        {activity.features.map((f) => (
                          <li
                            key={f}
                            className="rounded-full border border-outline-variant bg-background px-3 py-1 text-xs font-medium text-on-surface-variant"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto pt-6">
                  <Button
                    href={activity.cta.href}
                    external={activity.cta.external}
                    variant={activity.cta.variant}
                    size="lg"
                    className="w-full"
                  >
                    {activity.cta.label}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-lg bg-surface-container-lowest px-6 py-4 ring-1 ring-outline-variant">
          <span className="text-xs font-semibold uppercase tracking-widest text-outline">
            그 외 활동
          </span>
          <span className="text-outline-variant" aria-hidden="true">|</span>
          {OTHER_ACTIVITIES.map((name, i) => (
            <span key={name} className="flex items-center gap-3">
              <span className="text-sm text-on-surface-variant">{name}</span>
              {i < OTHER_ACTIVITIES.length - 1 && (
                <span className="text-outline-variant" aria-hidden="true">·</span>
              )}
            </span>
          ))}
          <p className="w-full pt-0.5 text-xs text-outline">
            시즌마다 열리는 활동으로, 별도 공지를 통해 모집합니다.
          </p>
        </div>

      </div>
    </section>
  );
}
