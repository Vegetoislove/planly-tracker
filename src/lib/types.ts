export interface Task {
  id: string;
  title: string;
  time: string;
}

export interface Day {
  id: string;
  globalDay: number;
  name: string;
  meta: string;
  tasks: Task[];
}

export interface Sprint {
  id: string;
  name: string;
  meta: string;
  days: Day[];
}

export interface AppState {
  activeDayId: string;
  completedTasks: Record<string, boolean>;
  starredTasks: Record<string, boolean>;
  timeSpentByDay: Record<string, number>; // seconds
  taskNotes: Record<string, string>;
  openSprintId: string | null;
  userEmail?: string;
  remindersActive?: boolean;
  geminiApiKey?: string;
  customSprints?: Sprint[];
  planTitle?: string;
  startDateStr?: string;
  autoCascadeEnabled?: boolean;
  lastAutoCascadeDate?: string;
}
