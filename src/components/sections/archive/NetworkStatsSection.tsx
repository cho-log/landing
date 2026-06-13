import { archiveStats } from "@/src/data/stats";

/**
 * 아카이브 상단 네트워크 수치 스트립.
 * 메인 HistorySection(2×2 카운트업)과 달리 가로 스트립 형태 + 기준일 라벨로 차별화한다.
 */
export function NetworkStatsSection() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <p className="text-center text-base text-on-surface-variant md:text-lg">
          2023년 11월부터, 초록은 이만큼 넓어졌습니다.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-outline-variant ring-1 ring-outline-variant md:grid-cols-4">
          {archiveStats.items.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 bg-surface-container-lowest px-4 py-8"
            >
              <dd className="text-4xl font-bold leading-none tracking-tight tabular-nums text-primary md:text-5xl">
                {stat.value}
              </dd>
              <dt className="text-sm text-on-surface-variant">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-right text-xs text-outline">
          {archiveStats.asOf} 기준
        </p>
      </div>
    </section>
  );
}
