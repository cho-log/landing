import Image from "next/image";
import { SectionHeader } from "@/src/components/common/SectionHeader";
import { SITE_LINKS } from "@/src/lib/links";

type Status = "active" | "periodic" | "irregular";

const STATUS_LABEL: Record<Status, string> = {
  active: "상시 모집",
  periodic: "반기 1회",
  irregular: "비정기",
};

type CardLink = { label: string; href: string; external: boolean };

type Activity = {
  name: string;
  status: Status;
  description: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  bgClass: string;
  textClass: string;
  link?: CardLink;
  spanClass: string;
};

const ACTIVITIES: Activity[] = [
  {
    name: "초록스터디",
    status: "active",
    description:
      "검증된 학습 자료와 커뮤니티를 바탕으로, 스터디를 열고 운영할 수 있도록 돕습니다.",
    image: "/activities-study.webp",
    imageWidth: 993,
    imageHeight: 943,
    bgClass: "bg-primary-container",
    textClass: "text-on-primary-container",
    link: { label: "자세히 보기", href: "#study-detail", external: false },
    spanClass: "md:col-span-3 md:row-span-2 md:min-h-[420px]",
  },
  {
    name: "초록해듀오",
    status: "irregular",
    description: "우아한테크코스 수료생 멘토를 매칭받아 학습하는 스터디입니다.",
    image: "/activities-duo.webp",
    imageWidth: 1023,
    imageHeight: 641,
    bgClass: "bg-duo-container",
    textClass: "text-on-duo-container",
    link: {
      label: "초록스터디 자료 함께 사용",
      href: "#study-detail",
      external: false,
    },
    spanClass: "md:col-span-3 md:min-h-[200px]",
  },
  {
    name: "초록 밋업",
    status: "periodic",
    description:
      "배움과 나눔에 관심 있는 사람들을 위한 오프라인 교류의 장입니다.",
    image: "/activities-meetup.webp",
    imageWidth: 1322,
    imageHeight: 755,
    bgClass: "bg-secondary-container",
    textClass: "text-on-secondary-container",
    link: {
      label: "디스코드에서 소식 받기",
      href: SITE_LINKS.discord,
      external: true,
    },
    spanClass: "md:col-span-3 md:min-h-[200px]",
  },
  {
    name: "초록 프로젝트",
    status: "irregular",
    description:
      "기획부터 기능 개발, 부하 테스트까지 프로덕트를 만드는 전 과정을 경험할 수 있도록 멘토링을 제공합니다.",
    bgClass: "bg-build-container",
    textClass: "text-on-build-container",
    link: {
      label: "디스코드 공지 보기",
      href: SITE_LINKS.projectDiscord,
      external: true,
    },
    spanClass: "md:col-span-2 md:min-h-[200px]",
  },
  {
    name: "초록 프로젝트 with AI",
    status: "irregular",
    description:
      "막연한 아이디어를 4주 만에 실행 가능한 MVP로 완성하는 과정입니다.",
    bgClass: "bg-project-container",
    textClass: "text-on-project-container",
    link: {
      label: "디스코드 공지 보기",
      href: SITE_LINKS.projectAiDiscord,
      external: true,
    },
    spanClass: "md:col-span-2 md:min-h-[200px]",
  },
  {
    name: "Spring AI 부트캠프",
    status: "irregular",
    description: "Spring AI로 고객 지원 챗봇을 직접 만들어보는 과정입니다.",
    bgClass: "bg-tertiary-container",
    textClass: "text-on-tertiary-container",
    link: {
      label: "GitHub 둘러보기",
      href: SITE_LINKS.springAiBootcamp,
      external: true,
    },
    spanClass: "md:col-span-2 md:min-h-[200px]",
  },
];

export function ActivitiesSection() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeader
          eyebrow="ACTIVITIES"
          titleClassName="max-w-2xl leading-snug"
          title={
            <>
              초록에는 다양한 방식으로
              <br />
              함께 나눌 수 있는 활동들이 있습니다.
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {ACTIVITIES.map((activity) => (
            <ActivityCard key={activity.name} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const isHero = activity.spanClass.includes("row-span-2");
  const isStudyJump = activity.link?.href === "#study-detail";

  const cardClass = `group relative flex flex-col overflow-hidden rounded-xl p-6 transition-shadow ${activity.bgClass} ${activity.textClass} ${activity.spanClass}`;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-bold tracking-tight ${
            isHero ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {activity.name}
        </h3>
        <span className="shrink-0 rounded-full bg-current/10 px-2.5 py-0.5 text-xs font-semibold text-current">
          {STATUS_LABEL[activity.status]}
        </span>
      </div>

      <div
        className={`pointer-events-none flex flex-1 items-center justify-center ${
          isHero ? "mt-4 mb-2" : "mt-3 mb-1"
        }`}
        aria-hidden="true"
      >
        <Image
          src={activity.image ?? "/intro-leaves.webp"}
          alt=""
          width={activity.imageWidth ?? 1380}
          height={activity.imageHeight ?? 1100}
          sizes={
            isHero
              ? "(min-width: 768px) 24rem, 50vw"
              : "(min-width: 768px) 12rem, 40vw"
          }
          className={`h-auto w-full transition-transform duration-500 ease-out group-hover:scale-105 ${
            isHero ? "max-w-[16rem]" : "max-w-[10rem]"
          }`}
        />
      </div>

      <div
        className={`mt-auto flex flex-col gap-3 transition-all duration-300 ease-out md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100`}
      >
        <p
          className={`leading-relaxed ${
            isHero ? "text-base md:text-lg" : "text-sm"
          }`}
        >
          {activity.description}
        </p>
        {activity.link && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold opacity-90">
            {activity.link.label}
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              {isStudyJump ? "↓" : "→"}
            </span>
          </span>
        )}
      </div>
    </>
  );

  if (activity.link && isStudyJump) {
    return (
      <a
        href={activity.link.href}
        className={`${cardClass} cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]`}
      >
        {inner}
      </a>
    );
  }

  if (activity.link) {
    return (
      <article
        className={`${cardClass} hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
      >
        <a
          href={activity.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label={`${activity.name} — ${activity.link.label}`}
        />
        {inner}
      </article>
    );
  }

  return <article className={cardClass}>{inner}</article>;
}
