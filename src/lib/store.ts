import { AppState } from "./types";

export const STORAGE_KEY = "planly_next_state_v1";

export const DEFAULT_STATE: AppState = {
  activeDayId: "sprint-1-day-1",
  completedTasks: {},
  starredTasks: {},
  timeSpentByDay: {},
  taskNotes: {},
  openSprintId: "sprint-1",
  remindersActive: false,
  planTitle: "rereckoning",
  startDateStr: "21 Sep 2026",
  autoCascadeEnabled: true,
};

export function loadSavedState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (err) {
    console.error("Error loading localStorage state:", err);
    return DEFAULT_STATE;
  }
}

export function saveStateToStorage(state: AppState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
}

export function formatHoursMinutes(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes < 10 ? "0" : ""}${minutes}m`;
}

export function formatStopwatch(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}
