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

export interface Testimonial {
  id: string;
  content: string;     // 전체 후기 텍스트
  excerpt: string;     // 카드 미리보기용 요약 (1~2문장)
  authorName: string;
  studyName: string;
}
