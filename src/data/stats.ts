/**
 * 아카이브 네트워크 수치 — 단일 소스.
 * 메인 HistorySection("숫자로 보는 초록": 디스코드·PR·스터디·밋업)과 겹치지 않도록
 * "확장/네트워크" 계열 값만 사용. 누적 스냅샷이므로 asOf로 기준 시점을 명시한다.
 * 갱신 시 이 파일만 수정하면 된다.
 */
export const archiveStats = {
  asOf: "2026.6",
  items: [
    { value: 14, label: "함께한 대학" },
    { value: 33, label: "리드·멘토" }, // 스터디 리드 29 + 초록해듀오 멘토 4
    { value: 25, label: "개설된 스터디" },
    { value: 6, label: "운영 프로그램" },
  ],
} as const;
