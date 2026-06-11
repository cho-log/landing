/* 날짜 시드 기반 결정적 셔플 유틸 — SSR/CSR 어느 쪽에서 호출해도 같은 날짜면 같은 결과 */

const MS_PER_DAY = 86_400_000;

export function getDailySeed(): number {
  return Math.floor(Date.now() / MS_PER_DAY);
}

/* mulberry32: 32-bit 시드 → 결정적 PRNG. 셔플용으로 충분히 균일. */
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/* Fisher–Yates 셔플 후 앞에서 count개 반환 (count 미지정 시 전체). 입력 배열은 보존. */
export function seededShuffle<T>(items: readonly T[], seed: number, count?: number): T[] {
  const arr = items.slice();
  const rand = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return count === undefined ? arr : arr.slice(0, count);
}
