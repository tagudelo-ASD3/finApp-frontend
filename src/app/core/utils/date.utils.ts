const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / MS_PER_DAY);
}

export function nextDateForDay(day: number, from: Date = new Date()): Date {
  const today = startOfDay(from);
  const thisMonth = dateForDay(today.getFullYear(), today.getMonth(), day);
  if (thisMonth >= today) {
    return thisMonth;
  }
  return dateForDay(today.getFullYear(), today.getMonth() + 1, day);
}

export function dateForDay(year: number, month: number, day: number): Date {
  const normalized = new Date(year, month, 1);
  const lastDay = daysInMonth(normalized.getFullYear(), normalized.getMonth());
  return new Date(normalized.getFullYear(), normalized.getMonth(), Math.min(day, lastDay));
}

export function recentMoment(daysAgo: number, hour: number): string {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo, hour);
  return new Date(Math.min(date.getTime(), now.getTime())).toISOString();
}
