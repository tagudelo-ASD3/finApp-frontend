// Dates stay inside the current month and never pass the current moment, so monthly totals never change.
const now = new Date();
const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

function clampToThisMonth(date: Date): string {
  return new Date(Math.min(Math.max(date.getTime(), monthStart.getTime()), now.getTime())).toISOString();
}

export function daysAgo(days: number, hour = 12, minute = 0): string {
  return clampToThisMonth(new Date(now.getFullYear(), now.getMonth(), now.getDate() - days, hour, minute));
}

export function dayOfThisMonth(day: number, hour = 12): string {
  return clampToThisMonth(new Date(now.getFullYear(), now.getMonth(), day, hour));
}
