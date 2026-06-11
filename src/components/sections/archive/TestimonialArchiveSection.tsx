import type { Testimonial } from "@/src/types";
import { testimonials } from "@/src/data/testimonials";

function ArchiveCard({ text, name, affiliation, role }: Testimonial) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-1 -top-4 select-none font-serif text-[88px] leading-none text-primary/10"
      >
        “
      </span>
      <blockquote className="relative flex-1 whitespace-pre-line text-[15px] leading-relaxed text-on-surface-variant">
        {text}
      </blockquote>
      <footer className="mt-6 border-t border-outline-variant/60 pt-4">
        <p className="text-sm font-semibold text-on-surface">{name}</p>
        <p className="mt-1 text-xs text-outline">
          {affiliation} · {role}
        </p>
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
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
            MEMBER VOICES
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
            초록의 모든 후기
          </h2>
          <p className="mt-3 text-sm text-on-surface-variant">
            리드 · 스터디원 · 리뷰어 — 함께한 사람들이 남긴 {testimonials.length}개의 이야기
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <ArchiveCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
