import { leads } from "@/src/data/leads";
import type { Lead } from "@/src/types";
import { SectionHeader } from "@/src/components/common/SectionHeader";
import { LeadAvatar } from "./LeadAvatar";

/* ── 연도별 그룹핑 (최신 연도 먼저, 그룹 내 이름 가나다순 정렬) ──── */
function groupByYear(list: Lead[]): [number, Lead[]][] {
  const map = new Map<number, Lead[]>();
  for (const lead of list) {
    if (!map.has(lead.year)) map.set(lead.year, []);
    map.get(lead.year)!.push(lead);
  }
  for (const group of map.values()) {
    group.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

/* ── 리드/멘토 카드 ──────────────────────────────────────────── */
function LeadCard({ lead }: { lead: Lead }) {
  const isMentor = lead.role === "mentor";

  return (
    <a
      href={lead.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${lead.name} GitHub`}
      className="group flex items-center justify-between gap-3 rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-3 transition-colors hover:border-secondary-fixed-dim hover:bg-secondary-container/40"
    >
      <div className="flex min-w-0 items-center gap-3">
        <LeadAvatar name={lead.name} githubUrl={lead.githubUrl} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-on-surface">
              {lead.name}
            </p>
            {isMentor && (
              <span className="shrink-0 rounded-full bg-duo/10 px-1.5 py-0.5 text-[10px] font-semibold text-duo">
                멘토
              </span>
            )}
          </div>
          <p className="truncate text-xs text-outline">
            {lead.community}
            {lead.university ? ` · ${lead.university}` : ""}
          </p>
        </div>
      </div>
      <span className="shrink-0 text-outline transition-colors group-hover:text-primary">
        <GitHubIcon />
      </span>
    </a>
  );
}

/* ── 섹션 ────────────────────────────────────────────────────── */
export function CommunityLeadsSection() {
  const grouped = groupByYear(leads);

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeader
          eyebrow="PEOPLE"
          title="함께한 모임 & 리드"
          description="스터디를 이끈 사람들"
        />

        <div className="mt-10 flex flex-col gap-10">
          {grouped.map(([year, yearLeads]) => (
            <div key={year}>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-sm font-semibold text-outline">{year}년</h3>
                <div className="h-px flex-1 bg-outline-variant" />
                <span className="text-xs text-outline">
                  {yearLeads.length}명
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {yearLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 아이콘 ──────────────────────────────────────────────────── */
function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
