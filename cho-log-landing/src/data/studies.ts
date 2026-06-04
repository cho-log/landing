import type { Study } from "@/src/types";

export const studies: Study[] = [
  {
    id: "scg-1",
    name: "스프링 코어 가이드 스터디",
    season: 1,
    duration: "2023.07 – 2023.10",
    leadCount: 1,
    memberCount: 8,
    tags: ["Spring", "Java", "OOP"],
    retrospectiveUrl: "https://REPLACE_ME/scg-1-retro",
    githubUrl: "https://github.com/REPLACE_ME/scg-1",
  },
  {
    id: "scg-2",
    name: "스프링 코어 가이드 스터디",
    season: 2,
    duration: "2023.11 – 2024.02",
    leadCount: 2,
    memberCount: 10,
    tags: ["Spring", "Java", "코드리뷰"],
    retrospectiveUrl: "https://REPLACE_ME/scg-2-retro",
    githubUrl: "https://github.com/REPLACE_ME/scg-2",
  },
  {
    id: "kotlin-1",
    name: "코틀린 인 액션 스터디",
    season: 1,
    duration: "2024.07 – 2024.10",
    leadCount: 2,
    memberCount: 9,
    tags: ["Kotlin", "함수형", "코드리뷰"],
    retrospectiveUrl: "https://REPLACE_ME/kotlin-1-retro",
    githubUrl: "https://github.com/REPLACE_ME/kotlin-1",
  },
];
