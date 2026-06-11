"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";

// TODO: 실제 구글폼 URL로 교체
const GOOGLE_FORM_URL = "https://forms.gle/REPLACE_ME";

const NAV_LINKS = [
  { label: "소개", href: "/about" },
  { label: "아카이빙", href: "/archive" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  // 스크롤 감지
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 외부 클릭 시 모바일 메뉴 닫기
  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`${isHome ? "fixed left-0 right-0" : "sticky"} top-0 z-50 transition-all duration-200 ${
        transparent
          ? "bg-transparent"
          : scrolled
            ? "bg-surface-container-lowest shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            : "bg-surface/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" aria-label="초록 홈" className="flex items-center">
          <Image
            src="/logo.png"
            alt="초록"
            width={1706}
            height={899}
            priority
            className={`hidden h-12 w-auto md:block ${transparent ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" : ""}`}
          />
          <Image
            src="/logo-square.png"
            alt="초록"
            width={112}
            height={112}
            priority
            className={`block h-12 w-auto md:hidden ${transparent ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" : ""}`}
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav
            className={`flex items-center gap-8 text-base font-bold transition-colors ${
              transparent
                ? "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                : "text-on-surface-variant"
            }`}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  transparent ? "hover:text-white/80" : "hover:text-on-surface"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="md"
              className={
                transparent
                  ? "!bg-white/10 !text-white !border !border-white/70 backdrop-blur-sm hover:!bg-white/20"
                  : "!bg-primary/85 backdrop-blur-sm hover:!bg-primary/95"
              }
            >
              리드 신청하기
            </Button>
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-secondary-container md:hidden"
        >
          <span
            className={`block h-0.5 w-5 rounded-full transition-transform duration-200 ${
              transparent ? "bg-white" : "bg-on-surface"
            } ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full transition-opacity duration-200 ${
              transparent ? "bg-white" : "bg-on-surface"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full transition-transform duration-200 ${
              transparent ? "bg-white" : "bg-on-surface"
            } ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-outline-variant bg-surface-container-lowest transition-all duration-200 md:hidden ${
          menuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-secondary-container hover:text-primary"
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 border-t border-outline-variant pt-3 pb-1">
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="w-full">
                리드 신청하기
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
