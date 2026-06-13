"use client";

import { useEffect } from "react";

/**
 * `/archive#testimonial-{id}`로 진입했을 때 해당 후기로 스크롤하고 잠깐 하이라이트한다.
 * Next의 클라이언트 네비게이션(pushState)은 CSS `:target`을 갱신하지 않으므로
 * 해시를 직접 읽어 JS로 처리한다. 렌더 결과는 없다.
 */
export function TestimonialDeepLink() {
  useEffect(() => {
    const highlight = () => {
      const { hash } = window.location;
      if (!hash.startsWith("#testimonial-")) return;
      const el = document.getElementById(hash.slice(1));
      if (!el) return;

      el.scrollIntoView({ behavior: "smooth", block: "center" });

      // CSS 클래스 대신 WAAPI로 직접 애니메이션 — Tailwind(Lightning CSS)가
      // "미사용"으로 판단해 커스텀 키프레임을 purge하는 문제를 피한다.
      const cs = getComputedStyle(el);
      const primary = cs.getPropertyValue("--color-primary").trim() || "#163826";
      const base =
        cs.getPropertyValue("--color-surface-container-lowest").trim() ||
        "#ffffff";
      const soft = "0 4px 24px rgba(0,0,0,0.04)";
      const lit = {
        boxShadow: `${soft}, 0 0 0 2px ${base}, 0 0 0 4px ${primary}`,
        backgroundColor: `color-mix(in srgb, ${primary} 8%, ${base})`,
      };
      el.animate(
        [
          { ...lit, offset: 0 },
          { ...lit, offset: 0.25 },
          {
            boxShadow: `${soft}, 0 0 0 2px transparent, 0 0 0 4px transparent`,
            backgroundColor: base,
            offset: 1,
          },
        ],
        { duration: 2400, easing: "ease-out" },
      );
    };

    highlight();
    window.addEventListener("hashchange", highlight);
    return () => window.removeEventListener("hashchange", highlight);
  }, []);

  return null;
}
