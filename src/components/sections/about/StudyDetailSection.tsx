import { SITE_LINKS } from "@/src/lib/links";
import { SectionHeader } from "@/src/components/common/SectionHeader";

type CycleNode = {
  emoji: string;
  label: string;
  top: string;
  left: string;
};

const CYCLE_NODES: CycleNode[] = [
  { emoji: "📚", label: "LMS 자료로 학습", top: "20%", left: "50%" },
  { emoji: "🚀", label: "미션 수행", top: "65%", left: "76%" },
  { emoji: "💬", label: "코드 리뷰", top: "65%", left: "24%" },
];

const LEARNING_ITEMS = [
  {
    label: "LMS 학습 자료",
    desc: "각 미션 소개, 키워드 기반 학습 자료, 실습 자료를 제공합니다.",
  },
  {
    label: "미션",
    desc: "학습한 내용을 직접 구현하며 익히는 미니 프로젝트 과제입니다.",
  },
  {
    label: "학습 테스트",
    desc: "기능을 직접 실행하고 변형해보며 이해도를 높이는 학습 방식입니다.",
  },
  {
    label: "코드 리뷰 사이클",
    desc: "미션을 구현하고 PR로 공유한 뒤, 리뷰어에게 코드 리뷰를 받으며 다양한 관점을 익힙니다.",
  },
];

type Course = {
  title: string;
  target: string;
  points: string[];
};

const COURSES: Course[] = [
  {
    title: "학습 테스트로 배우는 자바 기초",
    target: "자바 언어를 이제 막 시작하는 입문자 대상",
    points: [
      "동작 검증을 위한 단위 테스트",
      "간단한 콘솔 애플리케이션 구현",
      "유지보수하기 좋은 클린 코드",
      "함수형 프로그래밍 문법 활용",
    ],
  },
  {
    title: "학습 테스트로 배우는 스프링 입문",
    target: "스프링을 처음 접하는 스프링 입문자 대상",
    points: [
      "웹 요청과 응답 처리를 위한 Spring MVC의 기능",
      "데이터베이스 접근을 위한 Spring JDBC",
      "스프링의 객체 관리 기능을 위한 Spring Core",
      "기본적인 스프링 애플리케이션의 구조인 Layered Architecture",
    ],
  },
  {
    title: "학습 테스트로 배우는 스프링 기초",
    target: "웹 프로젝트를 위한 배경 지식이 필요한 사람",
    points: [
      "Spring 기반의 인증을 구현",
      "데이터베이스 접근을 위한 Spring Data JPA",
      "스프링의 객체 그리고 외부 설정 관리를 위한 Spring Core",
      "간단한 애플리케이션 운영을 위한 배포 스크립트",
    ],
  },
  {
    title: "미션으로 배우는 리액트 입문",
    target: "React를 처음 시작하는 입문자 대상",
    points: [
      "JSX로 컴포넌트 선언과 사용",
      "기초적인 목록·모달·폼 UI 구현",
      "useState·useEffect를 활용한 상태 관리",
      "React 설계 원칙을 고려한 코드 작성",
    ],
  },
];

const LEARNING_TESTS = [
  {
    emoji: "☕",
    label: "자바",
    repo: "cho-log/java-learning-test",
    href: SITE_LINKS.javaLearningTest,
  },
  {
    emoji: "🍃",
    label: "스프링",
    repo: "cho-log/spring-learning-test",
    href: SITE_LINKS.springLearningTest,
  },
];

type MissionGroup = {
  category: string;
  note?: string;
  layout: "grid" | "single";
  items: { emoji: string; label: string; href: string }[];
};

const MISSION_GROUPS: MissionGroup[] = [
  {
    category: "자바",
    layout: "grid",
    items: [
      {
        emoji: "🧮",
        label: "계산기 미션",
        href: SITE_LINKS.javaCalculatorMission,
      },
      {
        emoji: "🏎️",
        label: "자동차 경주 미션",
        href: SITE_LINKS.javaRacingcarMission,
      },
      { emoji: "🎰", label: "로또 미션", href: SITE_LINKS.javaLottoMission },
      { emoji: "🪜", label: "사다리 미션", href: SITE_LINKS.javaLadderMission },
    ],
  },
  {
    category: "스프링",
    layout: "single",
    items: [
      {
        emoji: "🔑",
        label: "방탈출 미션",
        href: SITE_LINKS.springRoomEscapeMission,
      },
    ],
  },
  {
    category: "리액트",
    layout: "single",
    items: [
      {
        emoji: "🎬",
        label: "영화 리뷰 미션",
        href: SITE_LINKS.reactMovieReviewMission,
      },
    ],
  },
];

type JoinStep = {
  num: string;
  title: string;
  desc: React.ReactNode;
};

const JOIN_STEPS: JoinStep[] = [
  {
    num: "01",
    title: "스터디원과 리뷰어 모으기",
    desc: "학습을 함께할 스터디원과, 리뷰를 맡아줄 리뷰어를 모읍니다.",
  },
  {
    num: "02",
    title: "구글폼으로 개설 신청",
    desc: (
      <>
        <InlineLink href={SITE_LINKS.operationGuide}>운영 가이드</InlineLink>와{" "}
        <InlineLink href={SITE_LINKS.cholockDocsManage}>운영 매뉴얼</InlineLink>
        을 참고해 스터디를 계획한 후, 구글폼으로 개설을 신청합니다.
      </>
    ),
  },
  {
    num: "03",
    title: "선발 후 자료 권한 제공",
    desc: "LMS 학습 자료 사용 권한과 추가 운영 가이드를 받고, 디스코드 스터디 리드 채널에서 운영 도움을 받습니다.",
  },
  {
    num: "04",
    title: "스터디 시작",
    desc: "미션과 리뷰를 중심으로 스터디를 운영합니다.",
  },
];

function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-secondary underline underline-offset-4 transition-colors hover:text-primary"
    >
      {children}
    </a>
  );
}

export function StudyDetailSection() {
  return (
    <>
      {/* 밴드 1 — 인트로 + 학습 방식 (A: bg-background) */}
      <section id="study-detail" className="scroll-mt-24 bg-background py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <SectionHeader
            eyebrow="STUDY DETAIL"
            title="초록스터디 자세히 알아보기"
            description="초록스터디는 자바·스프링·리액트 입문자를 위한 미션 기반 스터디입니다."
          />

          {/* Block A — 학습 방식 */}
          <div className="mt-14 grid grid-cols-1 items-center gap-10 md:grid-cols-[240px_1fr] md:gap-14">
            <LearningCycleGraphic />
            <div>
              <ul className="flex flex-col gap-4">
                {LEARNING_ITEMS.map((item) => (
                  <li
                    key={item.label}
                    className="text-sm leading-relaxed md:text-base"
                  >
                    <strong className="font-semibold text-on-surface">
                      {item.label}
                    </strong>
                    <span className="text-on-surface-variant">
                      {" "}
                      — {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 밴드 2 — 4개 과정 (B: bg-surface-container-low) */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h3 className="text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
            초록스터디 과정
          </h3>
          <p className="mt-3 text-sm text-on-surface-variant md:text-base">
            현재 자바·스프링·리액트 영역의 4개 과정이 운영되고 있습니다.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {COURSES.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 밴드 3 — 학습 자료 (A: bg-background, 카드 대비 위해 필수) */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h3 className="text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
            스터디에 쓰이는 자료
          </h3>
          <p className="mt-3 text-sm text-on-surface-variant md:text-base">
            공개된 자료는 누구나 둘러볼 수 있고, LMS는 스터디 리드로 선발되면
            사용 권한이 제공됩니다.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <LearningTestCard />
            <MissionRepoCard />
          </div>
        </div>
      </section>

      {/* 밴드 4 — 참여 방법 (B: bg-surface-container-low) */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h3 className="text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
            어떻게 참여할 수 있나요
          </h3>
          <p className="mt-3 text-sm text-on-surface-variant md:text-base">
            스터디원과 리뷰어를 모아 신청한 뒤, 선발되면 자료와 운영 가이드를
            받아 스터디를 시작합니다.
          </p>
          <ol className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {JOIN_STEPS.map((step, i) => (
              <li key={step.num} className="flex flex-col">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-on-primary">
                    {step.num}
                  </span>
                  {i < JOIN_STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-outline-variant md:block"
                    />
                  )}
                </div>
                <h4 className="mt-4 text-base font-semibold text-on-surface">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

function LearningCycleGraphic() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[240px]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full text-secondary"
      >
        <defs>
          <marker
            id="cycle-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
          </marker>
        </defs>
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        >
          <path
            d="M 115 45 A 60 60 0 0 1 155 115"
            markerEnd="url(#cycle-arrow)"
          />
          <path
            d="M 150 130 A 60 60 0 0 1 50 130"
            markerEnd="url(#cycle-arrow)"
          />
          <path
            d="M 45 115 A 60 60 0 0 1 85 45"
            markerEnd="url(#cycle-arrow)"
          />
        </g>
      </svg>
      {CYCLE_NODES.map((node) => (
        <div
          key={node.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          style={{ top: node.top, left: node.left }}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
            {node.emoji}
          </span>
          <span className="whitespace-nowrap text-xs font-semibold text-on-surface">
            {node.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
      <h4 className="text-xl font-bold tracking-tight text-on-surface">
        {course.title}
      </h4>
      <span className="mt-3 inline-flex w-fit items-center rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
        {course.target}
      </span>
      <ul className="mt-5 flex flex-col gap-3">
        {course.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-container"
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-on-secondary-container"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 6l3 3 5-5" />
              </svg>
            </span>
            <span className="text-sm leading-relaxed text-on-surface-variant">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function LearningTestCard() {
  return (
    <article className="flex flex-col rounded-lg bg-surface-container p-6">
      <h4 className="text-lg font-semibold text-on-surface">
        학습 테스트 저장소
      </h4>
      <ul className="mt-5 flex flex-col gap-3">
        {LEARNING_TESTS.map((test) => (
          <li key={test.repo}>
            <a
              href={test.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sm font-medium text-on-surface transition-colors hover:text-primary"
            >
              <span className="text-base" aria-hidden="true">
                {test.emoji}
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span>{test.label}</span>
                <span className="truncate font-mono text-xs font-normal text-on-surface-variant">
                  {test.repo}
                </span>
              </div>
              <span
                className="shrink-0 text-secondary transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

function MissionRepoCard() {
  return (
    <article className="flex flex-col rounded-lg bg-surface-container p-6">
      <h4 className="text-lg font-semibold text-on-surface">미션 저장소</h4>
      <div className="mt-5 grid gap-x-4 gap-y-5 sm:grid-cols-2">
        {MISSION_GROUPS.map((group) => (
          <div
            key={group.category}
            className={group.layout === "grid" ? "sm:col-span-2" : ""}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-outline">
                {group.category}
              </span>
              {group.note && (
                <span className="text-xs text-on-surface-variant">
                  {group.note}
                </span>
              )}
            </div>
            <ul
              className={`mt-2.5 ${
                group.layout === "grid"
                  ? "grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2"
                  : "flex flex-col gap-2"
              }`}
            >
              {group.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-on-surface transition-colors hover:text-primary"
                  >
                    <span className="text-base" aria-hidden="true">
                      {item.emoji}
                    </span>
                    <span>{item.label}</span>
                    <span
                      className="text-secondary transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
