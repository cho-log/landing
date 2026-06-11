import { leads } from "@/src/data/leads";
import type { Lead } from "@/src/types";

/* ── 시즌별 그룹핑 ────────────────────────────────────────────── */
function groupBySeason(list: Lead[]): Map<number, Lead[]> {
  const map = new Map<number, Lead[]>();
  const sorted = [...list].sort((a, b) => b.season - a.season); // 최신 기수 먼저
  for (const lead of sorted) {
    if (!map.has(lead.season)) map.set(lead.season, []);
    map.get(lead.season)!.push(lead);
  }
  return map;
}

/* ── 리드 카드 ───────────────────────────────────────────────── */
function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-outline-variant bg-surface-container-lowest px-5 py-4 transition-colors hover:border-secondary-fixed-dim hover:bg-secondary-container/40">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-container text-sm font-bold text-on-secondary-container">
          {lead.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-on-surface">{lead.name}</p>
          <p className="text-xs text-outline">{lead.studyName}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {lead.blogUrl && (
          <a
            href={lead.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${lead.name} 블로그`}
            className="rounded-md p-1.5 text-outline transition-colors hover:bg-secondary-container hover:text-primary"
          >
            <BlogIcon />
          </a>
        )}
        {lead.githubUrl && (
          <a
            href={lead.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${lead.name} GitHub`}
            className="rounded-md p-1.5 text-outline transition-colors hover:bg-secondary-container hover:text-primary"
          >
            <GitHubIcon />
          </a>
        )}
      </div>
    </div>
  );
}

/* ── 섹션 ────────────────────────────────────────────────────── */
export function LeadListSection() {
  const grouped = groupBySeason(leads);

  return (
    <section className="bg-surface-container-lowest py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
          역대 리드
        </h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          초록스터디를 이끌어온 모든 리드들
        </p>

        <div className="mt-10 flex flex-col gap-10">
          {Array.from(grouped.entries()).map(([season, seasonLeads]) => (
            <div key={season}>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-sm font-semibold text-outline">
                  {season}기 리드
                </h3>
                <div className="h-px flex-1 bg-outline-variant" />
                <span className="text-xs text-outline">{seasonLeads.length}명</span>
              </div>

              {/* 카드 그리드 */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {seasonLeads.map((lead) => (
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
function BlogIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
