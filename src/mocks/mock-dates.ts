// Mock dates are built from today's date so the demo always looks current.

const today = new Date();

/** A moment N days before today at the given hour. */
export function daysAgo(days: number, hour = 12, minute = 0): string {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

/** A day of the current month, never later than today. */
export function dayOfThisMonth(day: number, hour = 12): string {
  const safeDay = Math.min(day, today.getDate());
  return new Date(today.getFullYear(), today.getMonth(), safeDay, hour).toISOString();
}
