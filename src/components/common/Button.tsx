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

/* DESIGN.md Components: Primary = solid Deep Forest, Secondary = Soft Sage ghost. */
const variantClass: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container active:bg-on-primary-fixed-variant focus-visible:ring-primary",
  secondary:
    "border border-secondary text-secondary hover:bg-secondary-container active:bg-secondary-fixed-dim focus-visible:ring-secondary",
  ghost:
    "group/ghost text-primary hover:text-primary-container hover:font-semibold focus-visible:ring-secondary-fixed-dim",
};

const sizeClass: Record<Size, string> = {
  sm: "h-8 px-4 text-sm rounded-md",
  md: "h-10 px-6 text-sm rounded-lg",
  lg: "h-12 px-8 text-base rounded-lg",
};

const ghostOverride = "h-auto px-0 rounded-none";

const baseClass =
  "inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

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

    return (
      <Link href={href} className={computedClass} {...(anchorRest as object)}>
        {content}
      </Link>
    );
  }

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
