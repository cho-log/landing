/**
 * 아카이브 네트워크 수치 — 단일 소스.
 * "초록은 이만큼 넓어졌습니다" 종합 대시보드. 네트워크(대학·리드·프로그램) +
 * 활동(디스코드·PR·밋업·스터디) 7개 수치를 하나의 비주얼로 묶는다.
 * 누적 스냅샷이라 asOf로 기준 시점을 명시한다. value는 정수만 — `+` suffix는 기준일로 갈음.
 * 갱신 시 이 파일만 수정하면 된다.
 */
export const archiveStats = {
  asOf: "2026.6",
  items: [
    { value: 15, label: "함께한 대학" }, // 미집계 리드 포함 editorial 값(실제 distinct 14)
    { value: 33, label: "리드·멘토" }, // 스터디 리드 29 + 초록해듀오 멘토 4
    { value: 6, label: "초록 활동" }, // 구 "운영 프로그램"에서 리네임
    { value: 434, label: "디스코드 멤버" },
    { value: 246, label: "역대 미션 참가자" },
    { value: 170, label: "역대 밋업 참여" },
    { value: 25, label: "개설된 스터디" },
  ],
} as const;
