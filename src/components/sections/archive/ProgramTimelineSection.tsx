import type { Program } from "@/src/types";
import { programs } from "@/src/data/programs";

/* colorKey → accent 클래스 (Tailwind JIT가 정적으로 인식하도록 전체 클래스명 명시) */
const ACCENT: Record<
  Program["colorKey"],
  { dot: string; period: string; chip: string }
> = {
  study: { dot: "bg-primary", period: "text-primary", chip: "bg-primary/10 text-primary" },
  project: { dot: "bg-project", period: "text-project", chip: "bg-project/10 text-project" },
  duo: { dot: "bg-duo", period: "text-duo", chip: "bg-duo/10 text-duo" },
  projectAi: { dot: "bg-project", period: "text-project", chip: "bg-project/10 text-project" },
  meetup: { dot: "bg-secondary", period: "text-secondary", chip: "bg-secondary/10 text-secondary" },
  bootcamp: { dot: "bg-tertiary", period: "text-tertiary", chip: "bg-tertiary/10 text-tertiary" },
};

function ProgramItem({ program, isLast }: { program: Program; isLast: boolean }) {
  const accent = ACCENT[program.colorKey];

  return (
    <li className="relative flex gap-4 pb-10 last:pb-0 md:gap-6">
      {/* 타임라인 레일 */}
      <div className="relative flex flex-col items-center pt-1.5">
        <span
          className={`h-3 w-3 shrink-0 rounded-full ring-4 ring-surface-container-low ${accent.dot}`}
        />
        {!isLast && (
          <span className="mt-1 w-px flex-1 bg-outline-variant" aria-hidden="true" />
        )}
      </div>

      {/* 카드 */}
      <article className="flex-1 rounded-xl bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`text-xs font-semibold ${accent.period}`}>{program.period}</p>
          {program.metric && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${accent.chip}`}
            >
              {program.metric}
            </span>
          )}
        </div>

        <h3 className="mt-2 text-xl font-bold tracking-tight text-on-surface">
          {program.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
          {program.description}
        </p>

        {program.audience && (
          <p className="mt-3 text-xs text-outline">대상 · {program.audience}</p>
        )}

        {program.link && (
          <a
            href={program.link.href}
            target={program.link.external ? "_blank" : undefined}
            rel={program.link.external ? "noopener noreferrer" : undefined}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-container"
          >
            {program.link.label}
            <span aria-hidden="true">→</span>
          </a>
        )}
      </article>
    </li>
  );
}

export function ProgramTimelineSection() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
          OUR JOURNEY
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
          초록이 걸어온 길
        </h2>
        <p className="mt-3 text-sm text-on-surface-variant">
          스터디에서 시작해, 함께 배우고 나누는 방식을 꾸준히 넓혀왔습니다.
        </p>

        <ol className="mt-12">
          {programs.map((program, i) => (
            <ProgramItem
              key={program.id}
              program={program}
              isLast={i === programs.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
