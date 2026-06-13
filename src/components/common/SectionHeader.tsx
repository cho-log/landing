import type { ReactNode } from "react";

interface SectionHeaderProps {
  /** 제목 위 영어 라벨 (uppercase eyebrow/kicker) */
  eyebrow: string;
  /** 섹션 제목. <br> 등 줄바꿈 포함 가능 */
  title: ReactNode;
  /** 제목 아래 보조 설명 (선택) */
  description?: ReactNode;
  /** 정렬. 기본 left */
  align?: "left" | "center";
  /** 래퍼 추가 클래스 */
  className?: string;
  /** 제목 추가 클래스 (줄바꿈 타이틀의 leading·max-width 보정 등) */
  titleClassName?: string;
}

/**
 * 섹션 헤더 — eyebrow(영어 라벨) + 제목 + 설명을 일관된 스타일로 묶는다.
 * 토큰 명세는 DESIGN.md를 따른다.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""}${className ? ` ${className}` : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight text-on-surface md:text-4xl${
          titleClassName ? ` ${titleClassName}` : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm text-on-surface-variant">{description}</p>
      )}
    </div>
  );
}
