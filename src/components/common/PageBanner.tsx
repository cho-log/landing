import Image from "next/image";

interface PageBannerProps {
  imageSrc: string;
  title: string;
  label?: string;
  /** CSS object-position 값. 사진의 어느 부분이 보일지 조절. 기본값 "center" */
  objectPosition?: string;
  /** 로딩 중 보여줄 블러 플레이스홀더 data URL (src/generated/blur.ts) */
  blurDataURL?: string;
}

export function PageBanner({
  imageSrc,
  title,
  label,
  objectPosition = "center",
  blurDataURL,
}: PageBannerProps) {
  return (
    <section className="relative h-[280px] w-full overflow-hidden md:h-[320px]">
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className="object-cover"
        style={{ objectPosition }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 pb-10 md:px-6 md:pb-12">
        <div>
          {label && (
            <p className="text-label-md uppercase tracking-widest text-white/70">
              {label}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
