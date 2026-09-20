import { AppState, Sprint } from "./types";
import { PLAN_DATA } from "@/data/planData";

export const STORAGE_KEY = "planly_next_state_v2";

export const DEFAULT_STATE: AppState = {
  activeDayId: "sprint-1-day-1",
  completedTasks: {},
  starredTasks: {},
  timeSpentByDay: {},
  taskNotes: {},
  openSprintId: "sprint-1",
  remindersActive: false,
  planTitle: "rereckoning",
  startDateStr: "25 Sep 2026",
  autoCascadeEnabled: false,
};

export function loadSavedState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    // Purge old v1 state to prevent stale schedule corruption
    try {
      localStorage.removeItem("planly_next_state_v1");
    } catch {}

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    
    // Auto-migration: ensure sprint-0 is present even if user has previous customSprints in localStorage
    if (parsed.customSprints && Array.isArray(parsed.customSprints)) {
      const hasApt = parsed.customSprints.some((s: Sprint) => s.id === "sprint-0");
      if (!hasApt) {
        const aptSprint = PLAN_DATA.find((s) => s.id === "sprint-0");
        if (aptSprint) {
          parsed.customSprints = [aptSprint, ...parsed.customSprints];
        }
      }
    }
    
    // Ensure startDateStr defaults to 25 Sep 2026 if it was previously set to 21 Sep 2026
    if (parsed.startDateStr === "21 Sep 2026") {
      parsed.startDateStr = "25 Sep 2026";
    }

    return { ...DEFAULT_STATE, ...parsed };
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
