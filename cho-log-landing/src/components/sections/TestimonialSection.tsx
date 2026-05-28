const ROW_1 = [
  {
    text: "14주 동안 매주 코드리뷰를 받으면서 처음으로 '잘 짜는 코드'가 뭔지 감이 왔어요. 혼자였다면 절대 몰랐을 것들을 배웠습니다.",
    name: "김민준",
    study: "초록스터디 7기",
  },
  {
    text: "커리큘럼이 체계적이라 방향을 잃지 않고 끝까지 완주할 수 있었어요. 팀원들이랑 같이 성장하는 느낌이 정말 좋았습니다.",
    name: "이서연",
    study: "초록스터디 9기",
  },
  {
    text: "PR을 올리고 피드백 받는 과정이 처음엔 어색했는데, 지금은 그 문화가 너무 익숙해졌어요. 실무에 바로 써먹고 있습니다.",
    name: "박지후",
    study: "초록스터디 11기",
  },
  {
    text: "스터디 리드로 시작해서 지금은 사이드 프로젝트까지 같이 하는 동료들이 생겼어요. 초록이 제 개발 커리어의 터닝포인트였습니다.",
    name: "최수아",
    study: "초록스터디 13기",
  },
];

const ROW_2 = [
  {
    text: "CS 스터디라고 해서 딱딱할 줄 알았는데, 실제 코드에 적용하면서 배우니까 훨씬 재미있었어요. 매주 기대됐습니다.",
    name: "정예준",
    study: "초록스터디 8기",
  },
  {
    text: "취업 준비하면서 병행했는데, 오히려 초록 덕분에 꾸준히 공부할 수 있었어요. 같이 준비하는 동료가 생긴 게 제일 컸습니다.",
    name: "강하은",
    study: "초록스터디 10기",
  },
  {
    text: "코드리뷰 받을 때마다 '이런 관점도 있구나' 하고 시야가 넓어지는 느낌이었어요. 단순 인풋이 아니라 진짜 성장이었습니다.",
    name: "오도윤",
    study: "초록스터디 12기",
  },
  {
    text: "14주가 끝나고도 스터디원들이랑 계속 연락하고 있어요. 개발 커뮤니티에서 이런 관계가 생길 줄은 몰랐어요.",
    name: "윤시우",
    study: "초록스터디 14기",
  },
];

/* ── 카드 ─────────────────────────────────────────────────────── */
function TestimonialCard({
  text,
  name,
  study,
}: {
  text: string;
  name: string;
  study: string;
}) {
  return (
    <figure
      className="
        w-[280px] shrink-0 rounded-2xl border border-border bg-white p-6 shadow-sm
        sm:w-72 md:w-80
        [scroll-snap-align:start]
      "
    >
      <blockquote className="text-sm leading-relaxed text-text-secondary">
        "{text}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-chorok-100 text-sm font-bold text-chorok-700">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">{name}</p>
          <p className="text-xs text-text-muted">{study}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/* ── 스크롤 트랙 ───────────────────────────────────────────────── */
function ScrollTrack({
  items,
  direction,
}: {
  items: typeof ROW_1;
  direction: "left" | "right";
}) {
  // 데스크톱: 아이템 복제 → seamless CSS animation
  // 모바일: 복제 없이 native scroll
  const doubled = [...items, ...items];
  const animClass =
    direction === "left" ? "md:animate-scroll-left" : "md:animate-scroll-right";

  return (
    /*
     * 모바일: overflow-x-auto + scroll-snap → 터치 스와이프
     * 데스크톱(md+): overflow-hidden + CSS animation (group-hover 일시정지)
     */
    <div
      className="
        group
        overflow-x-auto scroll-smooth
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        [scroll-snap-type:x_mandatory] px-4
        md:overflow-hidden md:px-0
        md:[scroll-snap-type:none]
        md:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
      "
    >
      <div
        className={`
          flex gap-4
          [width:max-content]
          ${animClass}
          md:group-hover:[animation-play-state:paused]
        `}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ── 섹션 ─────────────────────────────────────────────────────── */
export function TestimonialSection() {
  return (
    <section className="overflow-hidden bg-bg-base py-24">
      <div className="mx-auto mb-12 max-w-4xl px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          리드들의 이야기
        </h2>
        <p className="mt-3 text-sm text-text-secondary">
          초록을 경험한 사람들이 직접 전하는 후기
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <ScrollTrack items={ROW_1} direction="left" />
        <ScrollTrack items={ROW_2} direction="right" />
      </div>
    </section>
  );
}
