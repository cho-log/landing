// 이미지 파이프라인 스크립트
//
// 이 프로젝트는 public/*.webp 를 "정식 에셋"으로 취급한다(= 커밋 대상).
// 원본(PNG/JPEG)은 저장소에 두지 않는다. 따라서 이 스크립트는 두 가지 일을 한다:
//
//   1) 블러 placeholder 생성 (항상)
//      풀블리드 LCP 이미지의 흐릿한 미리보기를 public/*.webp 에서 직접 뽑아
//      src/generated/blur.ts 로 내보낸다. 원본이 필요 없으므로 새 클론·CI에서도
//      깨지지 않는다. prebuild 훅이 이걸 실행한다.
//
//   2) 원본 재최적화 (선택 — image-sources/ 가 있을 때만)
//      새 이미지를 추가/교체할 때만 쓴다. 원본 마스터를 (gitignore된) image-sources/
//      에 두고 `npm run optimize:images` 를 돌리면 public/*.webp 로 변환된다.
//      그 후 만들어진 .webp 만 커밋하면 된다. 원본 없으면 이 단계는 조용히 건너뛴다.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir, writeFile, stat, access } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SRC_DIR = join(root, "image-sources"); // gitignore된 로컬 스크래치(있을 때만 사용)
const OUT_DIR = join(root, "public");
const BLUR_OUT = join(root, "src", "generated", "blur.ts");

// out:     public/<out>.webp — 정식 에셋(커밋 대상)
// blur:    true 면 public/<out>.webp 에서 블러 placeholder 를 만들어 blur.ts 에 포함
// source/width/quality: image-sources/ 에 원본을 두고 재최적화할 때만 쓰는 설정(선택)
const IMAGES = [
  // 사진 (불투명, lossy)
  { source: "hero.png", out: "hero", width: 2560, quality: 80, blur: true },
  { source: "archive-banner.JPG", out: "archive-banner", width: 2400, quality: 80, blur: true },
  { source: "about-banner.jpeg", out: "about-banner", width: 2400, quality: 80, blur: true },
  // 일러스트 (투명, alpha 유지)
  { source: "intro-leaves.png", out: "intro-leaves", width: 1200, quality: 85 },
  { source: "history-growth.png", out: "history-growth", width: 1400, quality: 85 },
  // 로고 (투명)
  { source: "logo.png", out: "logo", width: 400, quality: 90 },
  { source: "logo-square.png", out: "logo-square", width: 240, quality: 90 },
];

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

async function fileSize(path) {
  try {
    return (await stat(path)).size;
  } catch {
    return 0;
  }
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// (선택) image-sources/ 에 원본이 있으면 public/*.webp 로 (재)최적화한다.
async function optimizeFromSources() {
  if (!(await exists(SRC_DIR))) return; // 원본 없음 = 정상 상태, 조용히 건너뜀

  let before = 0;
  let after = 0;
  let count = 0;

  for (const img of IMAGES) {
    const srcPath = join(SRC_DIR, img.source);
    if (!(await exists(srcPath))) continue;

    const b = await fileSize(srcPath);
    const outPath = join(OUT_DIR, `${img.out}.webp`);
    await sharp(srcPath)
      .resize({ width: img.width, fit: "inside", withoutEnlargement: true })
      .webp({ quality: img.quality })
      .toFile(outPath);
    const a = await fileSize(outPath);

    const pct = b ? Math.round((1 - a / b) * 100) : 0;
    console.log(
      `✓ ${img.source.padEnd(22)} ${fmtKB(b).padStart(8)} → ${fmtKB(a).padStart(7)}  (-${pct}%)  →  public/${img.out}.webp`
    );
    before += b;
    after += a;
    count += 1;
  }

  if (count) {
    const pct = before ? Math.round((1 - after / before) * 100) : 0;
    console.log(`최적화 ${count}개: ${fmtKB(before)} → ${fmtKB(after)} (-${pct}%)`);
  }
}

// 정식 에셋(public/*.webp)에서 블러 placeholder 를 만들어 src/generated/blur.ts 작성.
// 원본이 아니라 webp 에서 뽑으므로 저장소에 커밋된 파일만으로 항상 재현된다.
async function generateBlur() {
  await mkdir(dirname(BLUR_OUT), { recursive: true });

  const entries = {};
  for (const img of IMAGES.filter((i) => i.blur)) {
    const webpPath = join(OUT_DIR, `${img.out}.webp`);
    if (!(await exists(webpPath))) {
      console.warn(`⚠️  public/${img.out}.webp 없음 — 블러 건너뜀`);
      continue;
    }
    const buf = await sharp(webpPath)
      .resize({ width: 16, fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();
    entries[img.out] = `data:image/webp;base64,${buf.toString("base64")}`;
  }

  const body =
    "// 이 파일은 scripts/optimize-images.mjs 가 자동 생성한다. 직접 수정하지 말 것.\n" +
    "// 풀블리드 이미지용 블러 placeholder(base64 data URL) — public/*.webp 에서 추출.\n\n" +
    "export const blur = {\n" +
    Object.entries(entries)
      .map(([k, v]) => `  "${k}": "${v}",`)
      .join("\n") +
    "\n} as const;\n";
  await writeFile(BLUR_OUT, body, "utf8");

  console.log(`블러 ${Object.keys(entries).length}개 → src/generated/blur.ts`);
}

async function run() {
  await optimizeFromSources();
  await generateBlur();
}

run().catch((err) => {
  console.error("이미지 파이프라인 실패:", err);
  process.exit(1);
});
