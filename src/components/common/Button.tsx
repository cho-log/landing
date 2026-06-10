import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
};

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    external?: never;
  };

type AsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = AsButton | AsAnchor;

/* ── Variant styles ──────────────────────────────────────────── */
const variantClass: Record<Variant, string> = {
  primary:
    "bg-chorok-600 text-white hover:bg-chorok-700 active:bg-chorok-800 focus-visible:ring-chorok-500",
  secondary:
    "border border-chorok-600 text-chorok-600 hover:bg-chorok-50 active:bg-chorok-100 focus-visible:ring-chorok-400",
  ghost:
    "group/ghost text-chorok-600 hover:text-chorok-800 hover:font-semibold focus-visible:ring-chorok-300",
};

/* ── Size styles ─────────────────────────────────────────────── */
const sizeClass: Record<Size, string> = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-lg",
};

const ghostOverride = "h-auto px-0 rounded-none";

const baseClass =
  "inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

/* ── Component ───────────────────────────────────────────────── */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  const isGhost = variant === "ghost";

  const computedClass = [
    baseClass,
    variantClass[variant],
    isGhost ? ghostOverride : sizeClass[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {isGhost && <span className="inline-block transition-transform duration-200 group-hover/ghost:translate-x-2" aria-hidden="true">→</span>}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as Omit<AsAnchor, keyof BaseProps>;

    /* 외부 링크: <a> 태그 */
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={computedClass}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    /* 내부 링크: next/link → basePath 자동 처리 */
    return (
      <Link href={href} className={computedClass} {...(anchorRest as object)}>
        {content}
      </Link>
    );
  }

  /* href 없으면 <button> */
  return (
    <button
      type="button"
      className={computedClass}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
