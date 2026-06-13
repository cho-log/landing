import type { Testimonial, TestimonialRole } from "@/src/types";
import { testimonials } from "@/src/data/testimonials";
import { SectionHeader } from "@/src/components/common/SectionHeader";
import { TestimonialDeepLink } from "./TestimonialDeepLink";

/* 역할별 칩 색 (Tailwind JIT가 정적으로 인식하도록 전체 클래스명 명시) */
const ROLE_CHIP: Record<TestimonialRole, string> = {
  "스터디 리드": "bg-primary/10 text-primary",
  리뷰어: "bg-duo/10 text-duo",
  스터디원: "bg-secondary/10 text-secondary",
};

function ArchiveCard({ id, text, name, affiliation, role }: Testimonial) {
  return (
    <article
      id={`testimonial-${id}`}
      className="mb-5 scroll-mt-24 break-inside-avoid rounded-2xl bg-surface-container-lowest p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-1 -top-4 select-none font-serif text-[88px] leading-none text-primary/10"
        >
          &ldquo;
        </span>
        <blockquote className="relative whitespace-pre-line text-[15px] leading-relaxed text-on-surface-variant">
          {text}
        </blockquote>
      </div>
      <footer className="mt-6 flex items-center justify-between gap-3 border-t border-outline-variant/60 pt-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-on-surface">
            {name}
          </p>
          <p className="mt-0.5 truncate text-xs text-outline">{affiliation}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${ROLE_CHIP[role]}`}
        >
          {role}
        </span>
      </footer>
    </article>
  );
}

export function TestimonialArchiveSection() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 bg-surface-container-low py-24"
    >
      <TestimonialDeepLink />
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeader
          className="mb-12"
          eyebrow="MEMBER VOICES"
          title="초록의 모든 후기"
          description="리드 · 스터디원 · 리뷰어 — 함께한 사람들이 남긴 이야기"
        />

        <div className="gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {testimonials.map((t) => (
            <ArchiveCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
