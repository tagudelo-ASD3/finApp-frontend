// es.json keeps three forms per count: "<base>.0", "<base>.1" and "<base>.n".
export function countKey(base: string, count: number): string {
  return count === 0 || count === 1 ? `${base}.${count}` : `${base}.n`;
}
