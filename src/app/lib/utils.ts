import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// cn comes from shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function spansMultipleDays(
  startTime: string,
  endTime?: string | null,
): boolean {
  if (!endTime) return false;
  const start = new Date(startTime);
  const end = new Date(endTime);
  return start.toLocaleDateString('de-CH') !== end.toLocaleDateString('de-CH');
}

export function isToday(startTime: string, endTime?: string | null): boolean {
  const today = new Date();
  const start = new Date(startTime);
  // check if it starts today
  if (today.toDateString() === start.toDateString()) return true;
  // if not check if event spans multiple days
  if (endTime && spansMultipleDays(startTime, endTime)) {
    // check if event is still running
    const end = new Date(endTime);
    if (today.getTime() > start.getTime() && today.getTime() < end.getTime())
      return true;
  }
  return false;
}

export function isThisWeek(
  startTime: string,
  endTime?: string | null,
): boolean {
  const today = new Date();
  const start = new Date(startTime);

  // Get the start of this week (Monday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(
    // get day gives the day of the week (Sunday: 0 - Saturday: 6)
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1),
  );
  startOfWeek.setHours(0, 0, 0, 0);

  // Get the end of this week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  if (!endTime) return start >= startOfWeek && start <= endOfWeek;
  const end = new Date(endTime);
  // start date or end date within the week
  return (
    (start >= startOfWeek && start <= endOfWeek) ||
    (end >= startOfWeek && end <= endOfWeek)
  );
}
