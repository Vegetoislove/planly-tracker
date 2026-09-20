/**
 * Date calculation utilities for TakeUforward Planly
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Parses a date string like "21 Sep 2026" or "2026-09-21" or ISO string into a Date object.
 */
export function parseDateString(dateStr: string): Date {
  if (!dateStr) return new Date(2026, 8, 21); // Default: 21 Sep 2026

  // Check if format is "DD Mon YYYY" (e.g. "21 Sep 2026")
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthIndex = MONTHS.findIndex(
      (m) => m.toLowerCase() === parts[1].toLowerCase()
    );
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && monthIndex !== -1 && !isNaN(year)) {
      return new Date(year, monthIndex, day);
    }
  }

  // Check if format is "YYYY-MM-DD"
  const isoParts = dateStr.split("-");
  if (isoParts.length === 3) {
    const year = parseInt(isoParts[0], 10);
    const month = parseInt(isoParts[1], 10) - 1;
    const day = parseInt(isoParts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date(2026, 8, 21) : d;
}

/**
 * Formats a Date object into TakeUforward's format: "21 Sep 2026"
 */
export function formatDateDisplay(date: Date): string {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Formats a Date object into HTML input format: "YYYY-MM-DD"
 */
export function formatDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Dynamically calculates the estimated completion date:
 * Completion Date = Start Date + (totalDays - 1) days
 * E.g., Start = 21 Sep 2026, 50 days -> 9 Nov 2026
 * E.g., Start = 21 Sep 2026, 52 days -> 11 Nov 2026
 */
export function calculateCompletionDate(
  startDateStr: string,
  totalDays: number
): string {
  const start = parseDateString(startDateStr);
  const daysToAdd = Math.max(0, totalDays - 1);
  const completionDate = new Date(start.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return formatDateDisplay(completionDate);
}

/**
 * Calculates scheduled date for a specific day index (1-indexed):
 * Day 1 = Start Date
 * Day X = Start Date + (X - 1) days
 */
export function calculateDayDate(startDateStr: string, dayNumber: number): string {
  const start = parseDateString(startDateStr);
  const daysToAdd = Math.max(0, dayNumber - 1);
  const dayDate = new Date(start.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return formatDateDisplay(dayDate);
}
