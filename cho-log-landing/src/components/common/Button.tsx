import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

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
    "text-chorok-600 hover:text-chorok-700 focus-visible:ring-chorok-300",
};

/* ── Size styles ─────────────────────────────────────────────── */
const sizeClass: Record<Size, string> = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-lg",
};

/* ghost는 패딩 없이 인라인 텍스트처럼 */
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

  /* href가 있으면 <a> 태그 */
  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as Omit<AsAnchor, keyof BaseProps>;
    return (
      <a
        href={href}
        className={computedClass}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...anchorRest}
      >
        {children}
        {isGhost && <span aria-hidden="true">→</span>}
      </a>
    );
  }

  /* href 없으면 <button> 태그 */
  return (
    <button
      type="button"
      className={computedClass}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      {isGhost && <span aria-hidden="true">→</span>}
    </button>
  );
}
