"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white shadow-sm"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      {/* ── 데스크톱 / 기본 레이아웃 ── */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">

        {/* 로고 */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-chorok-700"
        >
          초록
        </Link>

        {/* 데스크톱 네비 */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 데스크톱 CTA */}
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
          <Button size="sm">리드 신청하기 🟢</Button>
        </a>

        {/* 햄버거 버튼 (모바일) */}
        <button
          type="button"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-chorok-50 md:hidden"
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-text-primary transition-transform duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-text-primary transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-text-primary transition-transform duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* ── 모바일 드롭다운 메뉴 ── */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border bg-white transition-all duration-200 md:hidden ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-chorok-50 hover:text-chorok-700"
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 border-t border-border pt-3 pb-1">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="w-full">
                리드 신청하기 🟢
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
