// TODO: 실제 PR 링크로 교체
const PR_EXAMPLES = [
  {
    title: "도메인 객체와 DTO 분리, 어디까지 해야 할까",
    href: "https://github.com/REPLACE_ME/pull/1",
  },
  {
    title: "트랜잭션 경계 다시 그리기",
    href: "https://github.com/REPLACE_ME/pull/2",
  },
  {
    title: "테스트 더블, Stub vs Mock 언제 쓸까",
    href: "https://github.com/REPLACE_ME/pull/3",
  },
];

const COMPARISON_ROWS = [
  {
    label: "운영 방식",
    general: "매번 새로 설계",
    chorok: "검증된 운영 가이드 제공",
  },
  {
    label: "코드 리뷰",
    general: "선택사항",
    chorok: "핵심 문화",
  },
  {
    label: "회고",
    general: "비정기적",
    chorok: "정기 회고 루틴",
  },
  {
    label: "리드 부담",
    general: "모든 걸 혼자",
    chorok: "운영진 + 가이드 + 동료 리드와 함께",
  },
];

const REVIEW_FLOW = [
  { step: "01", label: "매주 미션 구현", desc: "주제에 맞는 미션을 각자 구현합니다." },
  { step: "02", label: "PR 공유",        desc: "구현한 코드를 PR로 팀원에게 공유합니다." },
  { step: "03", label: "리뷰로 다른 관점 만남", desc: "서로의 코드를 리뷰하며 새로운 시각을 얻습니다." },
];

export function StudyDetailSection() {
  return (
    <section className="bg-surface-container-lowest py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">

        <h2 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
          초록스터디가 다른 이유
        </h2>
        <p className="mt-3 text-sm text-on-surface-variant">
          일반 개발 스터디와 초록스터디를 나란히 놓고 비교해봤습니다.
        </p>

        <div className="mt-8 overflow-x-auto rounded-lg border border-outline-variant">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-outline">
                  항목
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-outline">
                  일반 개발 스터디
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-primary">
                  🟢 초록스터디
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant bg-surface-container-lowest">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-secondary-container/40">
                  <td className="px-5 py-4 font-medium text-on-surface">
                    {row.label}
                  </td>
                  <td className="px-5 py-4 text-on-surface-variant">
                    {row.general}
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">
                    {row.chorok}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold tracking-tight text-on-surface">
            코드 리뷰 문화
          </h3>
          <p className="mt-2 text-sm text-on-surface-variant">
            초록스터디의 핵심은 코드를 함께 읽고, 함께 성장하는 것입니다.
          </p>

          <div className="mt-8 flex flex-col gap-0 md:flex-row">
            {REVIEW_FLOW.map((item, i) => (
              <div key={item.step} className="flex flex-1 flex-col md:flex-row">
                <div className="relative flex flex-1 flex-col gap-2 rounded-lg bg-secondary-container px-6 py-5">
                  <span className="text-xs font-bold tracking-widest text-secondary">
                    STEP {item.step}
                  </span>
                  <p className="font-semibold text-on-secondary-container">{item.label}</p>
                  <p className="text-xs leading-relaxed text-on-surface-variant">
                    {item.desc}
                  </p>
                </div>
                {i < REVIEW_FLOW.length - 1 && (
                  <div className="flex items-center justify-center px-2 py-2 text-secondary-fixed-dim md:py-0">
                    <svg
                      className="hidden h-5 w-5 md:block"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      className="h-5 w-5 rotate-90 md:hidden"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-outline">
              실제 PR 사례
            </p>
            <ul className="flex flex-col gap-3">
              {PR_EXAMPLES.map((pr) => (
                <li key={pr.title}>
                  <a
                    href={pr.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-md border border-outline-variant bg-surface-container-lowest px-5 py-4 transition-colors hover:border-secondary-fixed-dim hover:bg-secondary-container"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="h-4 w-4 shrink-0 text-secondary-fixed-dim"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
                      </svg>
                      <span className="text-sm font-medium text-on-surface group-hover:text-primary">
                        {pr.title}
                      </span>
                    </div>
                    <svg
                      className="h-4 w-4 shrink-0 text-outline group-hover:text-secondary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
