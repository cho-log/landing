import { Button } from "@/src/components/common/Button";

interface FeaturedStudy {
  id: string;
  name: string;
  tagline: string;
  weeks: number;
  leadCount: number;
  memberCount: number;
  tags: string[];
  retrospectiveUrl?: string;
  githubUrl?: string;
}

const FEATURED: FeaturedStudy[] = [
  {
    id: "greedy",
    name: "그리디 알고리즘 스터디",
    tagline: "교내 개발 생태계에 선한 영향력을",
    weeks: 15,
    leadCount: 4,
    memberCount: 6,
    tags: ["알고리즘", "그리디", "코드리뷰"],
    retrospectiveUrl: "https://REPLACE_ME/greedy-retro",
    githubUrl: "https://github.com/REPLACE_ME/greedy",
  },
  {
    id: "scg",
    name: "스프링 코어 가이드 스터디",
    tagline: "스프링을 깊게, 함께",
    weeks: 14,
    leadCount: 1,
    memberCount: 10,
    tags: ["Spring", "Java", "OOP"],
    retrospectiveUrl: "https://REPLACE_ME/scg-retro",
    githubUrl: "https://github.com/REPLACE_ME/scg",
  },
];

function FeaturedCard({ study }: { study: FeaturedStudy }) {
  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-chorok-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">

      {/* 상단 */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-chorok-100 px-3 py-1 text-xs font-semibold text-chorok-700">
            🟢 대표 스터디
          </span>
          <div className="flex flex-wrap gap-1.5">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-bg-base px-2 py-0.5 text-xs text-text-secondary ring-1 ring-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="mt-5 text-xl font-bold text-text-primary md:text-2xl">
          {study.name}
        </h3>
        <p className="mt-2 text-sm italic text-text-secondary">
          "{study.tagline}"
        </p>
      </div>

      {/* 중단 — 통계 */}
      <div className="my-7 grid grid-cols-3 divide-x divide-border rounded-2xl bg-chorok-50 py-5">
        <Stat label="운영 기간" value={study.weeks} unit="주" />
        <Stat label="리드" value={study.leadCount} unit="명" />
        <Stat label="스터디원" value={study.memberCount} unit="명" />
      </div>

      {/* 하단 — 링크 */}
      <div className="flex flex-wrap items-center gap-3">
        {study.retrospectiveUrl && (
          <Button href={study.retrospectiveUrl} external size="sm">
            회고 보기
          </Button>
        )}
        {study.githubUrl && (
          <Button href={study.githubUrl} external variant="secondary" size="sm">
            GitHub
          </Button>
        )}
      </div>
    </article>
  );
}

function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 px-4">
      <span className="text-2xl font-bold tabular-nums text-chorok-700">
        {value}
        <span className="ml-0.5 text-sm font-semibold text-chorok-400">{unit}</span>
      </span>
      <span className="text-xs text-text-muted">{label}</span>
    </div>
  );
}

export function FeaturedStudySection() {
  return (
    <section className="bg-bg-base py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          대표 스터디
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          초록의 정체성을 만들어온 스터디들
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {FEATURED.map((study) => (
            <FeaturedCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
