"use client";

import { useState, useMemo } from "react";
import { studies } from "@/src/data/studies";
import type { Study } from "@/src/types";

/* ── 타입 ────────────────────────────────────────────────────── */
type FilterTab = "전체" | "백엔드" | "프론트엔드";
type SortOrder = "latest" | "season";

const FILTER_TABS: FilterTab[] = ["전체", "백엔드", "프론트엔드"];

/* ── 카테고리 분류 ───────────────────────────────────────────── */
const BACKEND_TAGS  = new Set(["spring", "java", "kotlin", "oop", "함수형", "시스템 설계", "아키텍처"]);
const FRONTEND_TAGS = new Set(["react", "typescript", "javascript", "next.js", "css", "vue"]);

function getCategory(study: Study): FilterTab {
  const lower = study.tags.map((t) => t.toLowerCase());
  if (lower.some((t) => BACKEND_TAGS.has(t)))  return "백엔드";
  if (lower.some((t) => FRONTEND_TAGS.has(t))) return "프론트엔드";
  return "백엔드";
}

/* ── duration 파싱 "2024.03 – 2024.06" ──────────────────────── */
function parseDuration(duration: string) {
  const m = duration.match(/(\d{4})\.(\d{2})/);
  if (!m) return { year: 0, month: 0, groupKey: "기타" };
  const year  = parseInt(m[1]);
  const month = parseInt(m[2]);
  const half  = month <= 6 ? "상반기" : "하반기";
  return { year, month, groupKey: `${year} ${half}` };
}

/* ── StudyCard ───────────────────────────────────────────────── */
function StudyCard({ study }: { study: Study }) {
  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
      <span className="absolute left-0 top-0 h-0 w-1 rounded-full bg-gradient-to-b from-secondary-fixed-dim to-primary transition-all duration-500 group-hover:h-full" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-on-surface">{study.name}</h3>
          <p className="mt-0.5 text-xs text-outline">{study.duration}</p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary-container px-2.5 py-0.5 text-xs font-semibold text-on-secondary-container">
          {study.season}기
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-background px-2 py-0.5 text-xs text-on-surface-variant ring-1 ring-outline-variant"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-outline">
        <span className="flex items-center gap-1">
          <PersonIcon />
          리드 {study.leadCount}명
        </span>
        <span className="flex items-center gap-1">
          <PersonIcon />
          스터디원 {study.memberCount}명
        </span>
      </div>

      <div className="flex items-center gap-3 border-t border-outline-variant pt-4">
        {study.retrospectiveUrl ? (
          <a
            href={study.retrospectiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-container"
          >
            <DocIcon />
            회고 보기
          </a>
        ) : (
          <span className="text-xs text-outline">회고 준비 중</span>
        )}
        {study.githubUrl && (
          <a
            href={study.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <GitHubIcon />
            GitHub
          </a>
        )}
      </div>
    </article>
  );
}

/* ── 메인 섹션 ───────────────────────────────────────────────── */
export function StudyArchiveSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("전체");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");

  const filtered = useMemo(() => {
    const base =
      activeTab === "전체"
        ? [...studies]
        : studies.filter((s) => getCategory(s) === activeTab);

    return base.sort((a, b) => {
      if (sortOrder === "season") return a.season - b.season;
      // 최신순: 시작 연월 내림차순
      const pa = parseDuration(a.duration);
      const pb = parseDuration(b.duration);
      return pb.year !== pa.year
        ? pb.year - pa.year
        : pb.month - pa.month;
    });
  }, [activeTab, sortOrder]);

  // 시즌 그룹핑 (순서 유지)
  const grouped = useMemo(() => {
    const map = new Map<string, Study[]>();
    for (const study of filtered) {
      const key = parseDuration(study.duration).groupKey;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(study);
    }
    return map;
  }, [filtered]);

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">

        <h2 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
          스터디 아카이브
        </h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          초록이 함께 공부한 모든 스터디를 기록합니다.
        </p>

        <div className="mt-8 flex items-center justify-between gap-3">
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max items-center gap-1 rounded-md bg-surface-container-lowest p-1 ring-1 ring-outline-variant">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-primary text-on-primary shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="shrink-0 rounded-md border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="latest">최신순</option>
            <option value="season">시즌순</option>
          </select>
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-sm text-outline">
            해당 카테고리의 스터디가 없습니다.
          </div>
        )}

        <div className="mt-10 flex flex-col gap-12">
          {Array.from(grouped.entries()).map(([groupKey, groupStudies]) => (
            <div key={groupKey}>
              <div className="mb-5 flex items-center gap-3">
                <h3 className="text-sm font-semibold text-outline">{groupKey}</h3>
                <div className="h-px flex-1 bg-outline-variant" />
                <span className="text-xs text-outline">{groupStudies.length}개</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupStudies.map((study) => (
                  <StudyCard key={study.id} study={study} />
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
function PersonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M4 1.75A.75.75 0 0 1 4.75 1h6.586c.199 0 .389.079.53.22l2.914 2.914c.141.14.22.33.22.53V13.25a.75.75 0 0 1-.75.75H4.75a.75.75 0 0 1-.75-.75V1.75Zm1.5.75v10.75h7V5.56L10.44 3H5.5Z" clipRule="evenodd" />
      <path d="M7 7.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 7 7.75Zm.75 2.25h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
