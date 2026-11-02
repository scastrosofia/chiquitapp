/**
 * Pure deterministic PRNG (Mulberry32) so every seed produces a consistent,
 * reproducible "Formato de la gestión" without side effects.
 */
export interface SeededRandom {
  next: () => number;
  int: (min: number, max: number) => number;
  evenInt: (min: number, max: number) => number;
  pick: <T>(items: readonly T[]) => T;
  shuffle: <T>(items: readonly T[]) => T[];
}

export function createSeededRandom(seed: number): SeededRandom {
  let state = seed >>> 0;

  const next = (): number => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const int = (min: number, max: number): number => {
    const low = Math.ceil(min);
    const high = Math.floor(max);
    return Math.floor(next() * (high - low + 1)) + low;
  };

  const evenInt = (min: number, max: number): number => {
    const raw = int(Math.ceil(min / 2), Math.floor(max / 2)) * 2;
    return raw;
  };

  const pick = <T>(items: readonly T[]): T => {
    return items[Math.floor(next() * items.length)];
  };

  const shuffle = <T>(items: readonly T[]): T[] => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  };

  return { next, int, evenInt, pick, shuffle };
}
