import type { Program } from "@/src/types";
import { SITE_LINKS } from "@/src/lib/links";

/**
 * 초록이 운영해온 프로그램 (시간순).
 * 소개 문구는 About ActivitiesSection과 톤을 맞추고, 기간·대상·규모는 운영 기록 기준.
 */
export const programs: Program[] = [
  {
    id: "study",
    name: "초록스터디",
    period: "2023.11 – 현재",
    summary: "초록의 출발점이 된 자율 운영 스터디",
    description:
      "검증된 학습 자료와 커뮤니티를 바탕으로, 스터디를 열고 운영할 수 있도록 돕습니다.",
    audience: "스터디 운영 경험을 원하는 분들",
    metric: "25개 스터디",
    colorKey: "study",
    link: { label: "운영 가이드 보기", href: SITE_LINKS.operationGuide, external: true },
  },
  {
    id: "project",
    name: "초록 프로젝트",
    period: "2024.08 – 2025.02",
    summary: "기획부터 배포까지 팀으로 만드는 프로덕트",
    description:
      "기획부터 기능 개발, 부하 테스트까지 프로덕트를 만드는 전 과정을 함께 경험합니다.",
    audience: "프로젝트 과정을 전체적으로 경험하고 싶은 분들",
    metric: "2팀 · 10명",
    colorKey: "project",
  },
  {
    id: "duo",
    name: "초록해듀오",
    period: "2025.04 – 2025.07",
    summary: "멘토-멘티 매칭을 통한 학습",
    description:
      "우아한테크코스 수료생 멘토를 매칭받아 리뷰를 주고받으며 학습하는 스터디입니다.",
    audience: "멘토에게 리뷰를 받으며 성장하고 싶은 분들",
    metric: "5팀 · 멘토 5 · 멘티 15",
    colorKey: "duo",
  },
  {
    id: "project-ai",
    name: "초록 프로젝트 with AI",
    period: "2025.10 – 2025.11",
    summary: "AI와 함께 4주 만에 MVP까지",
    description:
      "막연한 아이디어를 4주 만에 실행 가능한 MVP로 완성하는, AI와 함께하는 과정입니다.",
    audience: "AI를 활용해 프로덕트를 만들어보고 싶은 분들",
    metric: "7명",
    colorKey: "projectAi",
    link: { label: "디스코드 공지 보기", href: SITE_LINKS.projectAiDiscord, external: true },
  },
  {
    id: "meetup",
    name: "초록 밋업",
    period: "2024 – 현재 · 반기 1회",
    summary: "오프라인에서 이어진 배움과 연결",
    description:
      "배움과 나눔에 관심 있는 사람들이 서로 교류하고 연결되는 오프라인 행사입니다.",
    audience: "초록 활동을 한 모든 분들, 초록이 궁금한 모든 분들",
    metric: "4회 · 누적 170명",
    colorKey: "meetup",
    link: { label: "디스코드에서 소식 받기", href: SITE_LINKS.discord, external: true },
  },
  {
    id: "bootcamp",
    name: "Spring AI 부트캠프",
    period: "2026.05.06 – 05.20",
    summary: "Spring AI로 챗봇을 만든 2주 집중 과정",
    description: "Spring AI로 고객 지원 챗봇을 직접 만들어보는 2주 집중 과정입니다.",
    audience: "Spring AI를 실습으로 익히고 싶은 분들",
    metric: "5명",
    colorKey: "bootcamp",
    link: { label: "GitHub 둘러보기", href: SITE_LINKS.springAiBootcamp, external: true },
  },
];
