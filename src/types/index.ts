export interface Study {
  id: string;
  name: string;
  season: number;        // 기수 (예: 7)
  duration: string;      // 예: "2024.03 – 2024.06"
  leadCount: number;
  memberCount: number;
  tags: string[];        // 예: ["알고리즘", "자바", "코드리뷰"]
  retrospectiveUrl?: string;  // 회고 노션 or 블로그 링크
  githubUrl?: string;         // 스터디 GitHub 레포
}

export interface Lead {
  id: string;
  name: string;
  studyName: string;   // 어느 스터디의 리드인지
  season: number;
  blogUrl?: string;
  githubUrl?: string;
}

export type TestimonialRole = "스터디 리드" | "스터디원" | "리뷰어";

export interface Testimonial {
  id: string;
  text: string;          // 후기 본문
  name: string;          // 이름
  affiliation: string;   // 소속 (예: "그리디", "SCG")
  role: TestimonialRole;
}
