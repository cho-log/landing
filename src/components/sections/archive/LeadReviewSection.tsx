import { Button } from "@/src/components/common/Button";

// TODO: 실제 회고 링크로 교체
const REVIEWS = [
  {
    id: "review-1",
    title: "처음으로 '가르친다'는 것을 해봤습니다",
    excerpt:
      "리드를 하면서 내가 안다고 생각했던 것들을 다시 들여다보게 됐어요. 설명하려니까 빈틈이 보이더라고요.",
    authorName: "김민준",
    affiliation: "그리디 스터디 리드",
    href: "https://REPLACE_ME/review-1",
  },
  {
    id: "review-2",
    title: "14주 동안 리드로 살아남기",
    excerpt:
      "스터디원들이 제 설명을 듣고 고개를 끄덕일 때, 그게 가장 뿌듯했습니다. 단순히 공부한 것 이상을 얻었어요.",
    authorName: "이서연",
    affiliation: "스프링 코어 가이드 리드",
    href: "https://REPLACE_ME/review-2",
  },
  {
    id: "review-3",
    title: "코드리뷰를 문화로 만드는 일",
    excerpt:
      "PR을 올리고 기다리는 그 긴장감, 그리고 예상 못한 관점의 리뷰를 받을 때의 쾌감. 그게 초록스터디의 핵심이었어요.",
    authorName: "박지후",
    affiliation: "CS 기초 스터디 리드",
    href: "https://REPLACE_ME/review-3",
  },
];

function ReviewCard({
  title,
  excerpt,
  authorName,
  affiliation,
  href,
}: (typeof REVIEWS)[number]) {
  return (
    <article className="flex flex-col justify-between rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">

      <div>
        <h3 className="font-bold leading-snug text-on-surface">{title}</h3>
        <blockquote className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          "{excerpt}"
        </blockquote>
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container">
            {authorName[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface">{authorName}</p>
            <p className="text-xs text-outline">{affiliation}</p>
          </div>
        </div>
        <Button href={href} external variant="ghost" className="shrink-0 text-xs">
          전문 읽기
        </Button>
      </div>
    </article>
  );
}

export function LeadReviewSection() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">

        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
            리드 회고
          </p>
          <blockquote className="mt-3 text-2xl font-bold leading-snug tracking-tight text-on-surface md:text-3xl">
            "리드를 한다는 건<br className="hidden md:block" /> 어떤 경험일까요."
          </blockquote>
          <p className="mt-3 text-sm text-on-surface-variant">
            직접 경험한 리드들의 회고를 통해 초록스터디를 미리 만나보세요.
          </p>
        </div>

        {/* 회고 카드 */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>

      </div>
    </section>
  );
}
