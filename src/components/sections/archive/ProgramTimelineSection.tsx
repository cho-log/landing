import type { Program } from "@/src/types";
import { programs } from "@/src/data/programs";
import { SectionHeader } from "@/src/components/common/SectionHeader";

/* colorKey → accent 클래스 (Tailwind JIT가 정적으로 인식하도록 전체 클래스명 명시) */
const ACCENT: Record<Program["colorKey"], { dot: string; period: string }> = {
  study: { dot: "bg-primary", period: "text-primary" },
  project: { dot: "bg-project", period: "text-project" },
  duo: { dot: "bg-duo", period: "text-duo" },
  projectAi: { dot: "bg-project", period: "text-project" },
  meetup: { dot: "bg-secondary", period: "text-secondary" },
  bootcamp: { dot: "bg-tertiary", period: "text-tertiary" },
};

/* 담백한 연혁 — 한 행 = 기간 | 이름 · 회고 캡션(오른쪽 muted). */
function ProgramRow({ program, isLast }: { program: Program; isLast: boolean }) {
  const accent = ACCENT[program.colorKey];

  return (
    <li className="relative flex gap-4 pb-8 last:pb-0 md:gap-6">
      {/* 타임라인 레일 */}
      <div className="relative flex flex-col items-center pt-1">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-surface-container-low ${accent.dot}`}
        />
        {!isLast && (
          <span className="mt-1 w-px flex-1 bg-outline-variant" aria-hidden="true" />
        )}
      </div>

      {/* 내용: 기간 | 이름 · 캡션 (한 줄 가로 배치) */}
      <div className="flex flex-1 flex-col gap-1 pb-1 md:flex-row md:items-baseline md:gap-4">
        <p
          className={`shrink-0 text-xs font-semibold tabular-nums md:w-44 ${accent.period}`}
        >
          {program.period}
        </p>
        <div className="flex flex-1 items-baseline gap-x-3">
          <h3 className="shrink-0 text-base font-bold tracking-tight text-on-surface md:text-lg">
            {program.name}
          </h3>
          {program.summary && (
            <p className="flex-1 text-sm text-on-surface-variant md:text-right">
              {program.summary}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export function ProgramTimelineSection() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeader
          eyebrow="OUR JOURNEY"
          title="초록이 걸어온 길"
          description="스터디에서 시작해, 함께 배우고 나누는 방식을 꾸준히 넓혀왔습니다."
        />

        <ol className="mt-12">
          {programs.map((program, i) => (
            <ProgramRow
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
