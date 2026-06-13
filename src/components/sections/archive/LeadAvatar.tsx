"use client";

import { useState } from "react";

/* ── GitHub 프로필 이미지 아바타 (로드 실패 시 첫 글자 폴백) ────── */
export function LeadAvatar({
  name,
  githubUrl,
}: {
  name: string;
  githubUrl: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary-container text-sm font-bold text-on-secondary-container">
      {name[0]}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${githubUrl}.png?size=80`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
