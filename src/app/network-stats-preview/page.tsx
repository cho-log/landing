import type { Metadata } from "next";
import { PageBanner } from "@/src/components/common/PageBanner";
import { NetworkStatsSection } from "@/src/components/sections/archive/NetworkStatsSection";
import { NetworkStatsSectionV3 } from "@/src/components/sections/archive/NetworkStatsSectionV3";
import { NetworkStatsSectionGravity } from "@/src/components/sections/archive/NetworkStatsSectionGravity";

export const metadata: Metadata = {
  title: "NetworkStats 프리뷰 (임시)",
  robots: { index: false, follow: false },
};

function PreviewLabel({ text }: { text: string }) {
  return (
    <div className="bg-inverse-surface py-3">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-inverse-on-surface">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function NetworkStatsPreviewPage() {
  return (
    <>
      <PageBanner
        imageSrc="/archive-banner.JPG"
        title="아카이브"
        label="ARCHIVE"
        objectPosition="center 45%"
      />

      <PreviewLabel text="버블 — 부유 + 커서 반응" />
      <NetworkStatsSectionV3 />

      <PreviewLabel text="버블 — 중력 (떨어져 쌓임)" />
      <NetworkStatsSectionGravity />

      <PreviewLabel text="기존 (current)" />
      <NetworkStatsSection />
    </>
  );
}
