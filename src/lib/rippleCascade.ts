import { Sprint, Day, Task } from "./types";

export interface ShiftDiffSummary {
  carryOverCount: number;
  originalTotalDays: number;
  newTotalDays: number;
  daysExtended: number;
  previewDays: {
    dayName: string;
    taskCount: number;
    carriedCount: number;
    newTasks: string[];
  }[];
}

/**
 * Conveyor-Belt / Ripple Cascade Rebalancer
 * 
 * Takes uncompleted tasks from past days and rolls them into the active day.
 * Instead of piling them on top, it fills each day up to `maxTasksPerDay` (~10-12 tasks, ~4.5h)
 * and cascades the excess downstream into subsequent days like a conveyor belt.
 * Any overflow at the tail end naturally creates Day 51, Day 52, etc.
 */
export function rippleCascadePlan(
  currentSprints: Sprint[],
  completedTasks: Record<string, boolean>,
  activeDayId: string,
  maxTasksPerDay: number = 11
): {
  updatedSprints: Sprint[];
  newTotalDays: number;
  shiftedCount: number;
  summary: ShiftDiffSummary;
} {
  const sprints: Sprint[] = JSON.parse(JSON.stringify(currentSprints));

  // Flatten all days
  interface DayRef {
    sprintIdx: number;
    dayIdx: number;
    day: Day;
  }
  const flatDays: DayRef[] = [];
  sprints.forEach((sprint, sprintIdx) => {
    sprint.days.forEach((day, dayIdx) => {
      flatDays.push({ sprintIdx, dayIdx, day });
    });
  });

  const originalTotalDays = flatDays.length;
  const activeIdx = Math.max(
    0,
    flatDays.findIndex((d) => d.day.id === activeDayId)
  );

  // 1. Gather all incomplete tasks from past days (< activeIdx)
  const carryOverQueue: Task[] = [];
  for (let i = 0; i < activeIdx; i++) {
    const dayRef = flatDays[i];
    const completedOnPastDay: Task[] = [];

    dayRef.day.tasks.forEach((task) => {
      if (completedTasks[task.id]) {
        completedOnPastDay.push(task);
      } else {
        carryOverQueue.push({
          ...task,
          title: task.title.includes("🔄") ? task.title : `🔄 ${task.title}`,
        });
      }
    });

    // Past day is finalized with only what was actually completed
    dayRef.day.tasks = completedOnPastDay;
    const pastMinutes = Math.max(30, completedOnPastDay.length * 22);
    dayRef.day.meta = `${Math.round(pastMinutes / 60)}h completed`;
  }

  const initialCarryOverCount = carryOverQueue.length;

  // 2. Cascade through future days starting from activeIdx
  let currentCarryOver: Task[] = [...carryOverQueue];
  const previewDays: ShiftDiffSummary["previewDays"] = [];

  for (let i = activeIdx; i < flatDays.length; i++) {
    const dayRef = flatDays[i];
    const originalTasks = dayRef.day.tasks;

    // Separate tasks on active day that are already checked off vs pending
    const doneToday = originalTasks.filter((t) => completedTasks[t.id]);
    const pendingToday = originalTasks.filter((t) => !completedTasks[t.id]);

    // Pipeline for this day: done tasks first, then carry-over tasks, then pending tasks
    const availableToPack = [...currentCarryOver, ...pendingToday];
    const capacityLeft = Math.max(1, maxTasksPerDay - doneToday.length);

    const packedForThisDay = availableToPack.slice(0, capacityLeft);
    currentCarryOver = availableToPack.slice(capacityLeft);

    const finalDayTasks = [...doneToday, ...packedForThisDay];
    dayRef.day.tasks = finalDayTasks;

    const estMinutes = finalDayTasks.length * 22;
    const h = Math.floor(estMinutes / 60);
    const m = estMinutes % 60;
    dayRef.day.meta = `${h}h ${m > 0 ? `${m}m` : ""}`.trim();

    if (previewDays.length < 5) {
      previewDays.push({
        dayName: dayRef.day.name,
        taskCount: finalDayTasks.length,
        carriedCount: packedForThisDay.filter((t) => t.title.includes("🔄")).length,
        newTasks: packedForThisDay.slice(0, 3).map((t) => t.title),
      });
    }
  }

  // 3. If there is still carryOver remaining at the end of the roadmap, create Day 51, Day 52...
  const lastSprint = sprints[sprints.length - 1];
  let overflowDayCount = 0;

  while (currentCarryOver.length > 0) {
    overflowDayCount++;
    const chunk = currentCarryOver.slice(0, maxTasksPerDay);
    currentCarryOver = currentCarryOver.slice(maxTasksPerDay);

    const newGlobalNumber = flatDays.length + overflowDayCount;
    const extensionId = `sprint-ripple-ext-${Date.now()}-${overflowDayCount}`;
    const estHours = Math.max(1, Math.round((chunk.length * 22) / 60));

    lastSprint.days.push({
      id: extensionId,
      globalDay: newGlobalNumber,
      name: `Day ${newGlobalNumber} - Ripple Overflow & Practice`,
      meta: `${estHours}h planned`,
      tasks: chunk,
    });
  }

  // 4. Renumber all global days consecutively
  let currentGlobalDay = 0;
  sprints.forEach((sprint) => {
    sprint.days.forEach((day) => {
      currentGlobalDay++;
      day.globalDay = currentGlobalDay;
      if (!day.name.startsWith("Day ")) {
        day.name = `Day ${currentGlobalDay} - ${day.name}`;
      } else {
        day.name = day.name.replace(/Day \d+/, `Day ${currentGlobalDay}`);
      }
    });

    const sprintMinutes = sprint.days.reduce(
      (acc, d) => acc + d.tasks.length * 22,
      0
    );
    sprint.meta = `Est. ${Math.floor(sprintMinutes / 60)}h · Upcoming`;
  });

  const summary: ShiftDiffSummary = {
    carryOverCount: initialCarryOverCount,
    originalTotalDays,
    newTotalDays: currentGlobalDay,
    daysExtended: currentGlobalDay - originalTotalDays,
    previewDays,
  };

  return {
    updatedSprints: sprints,
    newTotalDays: currentGlobalDay,
    shiftedCount: initialCarryOverCount,
    summary,
  };
}
