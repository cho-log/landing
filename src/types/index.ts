/** 초록이 운영해온 프로그램 (아카이브 타임라인용) */
export interface Program {
  id: string;
  name: string;
  period: string;        // 예: "2023.11 – 현재"
  summary?: string;      // 아카이브 타임라인용 회고 캡션 (소개 문구와 다른 기록 톤)
  description: string;   // 소개 문구
  audience?: string;     // 대상
  metric?: string;       // 규모 (예: "25개 스터디", "누적 170명")
  colorKey: "study" | "project" | "duo" | "projectAi" | "meetup" | "bootcamp";
  link?: { label: string; href: string; external?: boolean };
}

/** 역대 스터디 리드 + 초록해듀오 멘토 + 스터디 리뷰어 */
export interface Lead {
  id: string;
  name: string;
  community: string;                   // 소속/모임 (예: "그리디", "SCG", "초록해듀오")
  university?: string;                 // 대학 (해듀오·연합은 없음)
  year: number;                        // 활동 연도 (2024 | 2025 | 2026)
  githubUrl: string;
  role: "lead" | "mentor" | "reviewer"; // 초록해듀오 = mentor, 리뷰어 = reviewer, 나머지 = lead
}

export type TestimonialRole = "스터디 리드" | "스터디원" | "리뷰어";

export interface Testimonial {
  id: string;
  text: string;          // 후기 본문
  name: string;          // 이름
  affiliation: string;   // 소속 (예: "그리디", "SCG")
  role: TestimonialRole;
}
