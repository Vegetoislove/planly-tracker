import { Sprint, Day, Task } from "./types";
import { PLAN_DATA } from "@/data/planData";

/**
 * Intelligent Backlog Rebalancer
 * 
 * Looks through past days up to the active day.
 * Any tasks that remain uncompleted from past days are pulled forward
 * and distributed across active and upcoming days so the user is never stuck
 * and their daily schedule remains evenly distributed (~10-14 tasks per day).
 */
export function autoRebalancePlan(
  currentSprints: Sprint[],
  completedTasks: Record<string, boolean>,
  activeDayId: string
): { updatedSprints: Sprint[]; movedCount: number } {
  // Deep clone to avoid mutating state directly
  const sprints: Sprint[] = JSON.parse(JSON.stringify(currentSprints));

  // Flatten all days in order
  interface DayRef {
    sprintIdx: number;
    dayIdx: number;
    day: Day;
  }
  const flatDays: DayRef[] = [];
  sprints.forEach((sprint, sprintIdx) => {
    if (sprint.id === "sprint-0" || sprint.isSpecialTrack) return;
    sprint.days.forEach((day, dayIdx) => {
      flatDays.push({ sprintIdx, dayIdx, day });
    });
  });

  const activeIdx = flatDays.findIndex((d) => d.day.id === activeDayId);
  if (activeIdx <= 0) {
    // Active day is Day 1 or not found; nothing in past to rebalance
    return { updatedSprints: sprints, movedCount: 0 };
  }

  // 1. Gather all uncompleted tasks from days before activeIdx
  const backlogTasks: Task[] = [];

  for (let i = 0; i < activeIdx; i++) {
    const dayRef = flatDays[i];
    const remainingTasks: Task[] = [];

    dayRef.day.tasks.forEach((task) => {
      if (completedTasks[task.id]) {
        remainingTasks.push(task);
      } else {
        // Task was missed / not completed
        backlogTasks.push(task);
      }
    });

    // Update the past day's tasks to only what was actually completed
    dayRef.day.tasks = remainingTasks;
    dayRef.day.meta = `${Math.max(1, Math.round((remainingTasks.length * 20) / 60))}h planned`;
  }

  if (backlogTasks.length === 0) {
    return { updatedSprints: sprints, movedCount: 0 };
  }

  // 2. Distribute backlog tasks starting from active day into future days
  // Target: up to 2-3 extra tasks per day
  const futureDays = flatDays.slice(activeIdx);
  let backlogPointer = 0;

  for (const dayRef of futureDays) {
    if (backlogPointer >= backlogTasks.length) break;

    // Distribute 2-3 tasks to this day
    const chunk = backlogTasks.slice(backlogPointer, backlogPointer + 2);
    backlogPointer += chunk.length;

    // Prepend or append to day tasks with a badge mark
    dayRef.day.tasks = [
      ...chunk.map((t) => ({
        ...t,
        title: t.title.includes("🔄") ? t.title : `🔄 ${t.title}`,
      })),
      ...dayRef.day.tasks,
    ];

    // Recalculate day estimate
    const totalEstMinutes = dayRef.day.tasks.length * 22;
    const h = Math.floor(totalEstMinutes / 60);
    const m = totalEstMinutes % 60;
    dayRef.day.meta = `${h}h ${m > 0 ? `${m}m` : ""}`.trim();
  }

  // 3. If there are still backlog tasks left over, append a dedicated Catch-Up Day
  if (backlogPointer < backlogTasks.length) {
    const overflow = backlogTasks.slice(backlogPointer);
    const lastSprint = sprints[sprints.length - 1];
    const newDayId = `sprint-catchup-${Date.now()}`;
    const newGlobalDay = flatDays.length + 1;

    lastSprint.days.push({
      id: newDayId,
      globalDay: newGlobalDay,
      name: `Day ${newGlobalDay} - Planly Catch-Up & Consolidation`,
      meta: `${Math.round((overflow.length * 25) / 60)}h`,
      tasks: overflow.map((t) => ({
        ...t,
        title: t.title.includes("🔄") ? t.title : `🔄 ${t.title}`,
      })),
    });
  }

  // Update sprints meta totals
  sprints.forEach((sprint) => {
    const totalTasks = sprint.days.reduce((acc, d) => acc + d.tasks.length, 0);
    const totalMinutes = totalTasks * 22;
    const h = Math.floor(totalMinutes / 60);
    sprint.meta = `Est. ${h}h · Upcoming`;
  });

  return { updatedSprints: sprints, movedCount: backlogTasks.length };
}

/**
 * 65-Day Mastery Plan Generator
 * Expands heavy DP (Sprint 6) and Graphs (Sprint 7) into dedicated sub-focus days.
 */
export function generate65DayPlan(): Sprint[] {
  const base: Sprint[] = JSON.parse(JSON.stringify(PLAN_DATA));

  let currentGlobalDay = 0;
  const stretchedSprints = base.map((sprint) => {
    // Only stretch Sprint 6 (DP) and Sprint 7 (Graphs)
    const isDPorGraph =
      sprint.name.toLowerCase().includes("dynamic") ||
      sprint.name.toLowerCase().includes("graph");

    if (!isDPorGraph) {
      // Re-index global days
      const days = sprint.days.map((day) => {
        currentGlobalDay++;
        return {
          ...day,
          globalDay: currentGlobalDay,
          name: day.name.replace(/Day \d+/, `Day ${currentGlobalDay}`),
        };
      });
      return { ...sprint, days };
    }

    // Stretch days with more than 10 tasks into smaller bite-sized days
    const expandedDays: Day[] = [];

    sprint.days.forEach((day) => {
      if (day.tasks.length > 8) {
        const mid = Math.ceil(day.tasks.length / 2);
        const part1 = day.tasks.slice(0, mid);
        const part2 = day.tasks.slice(mid);

        currentGlobalDay++;
        expandedDays.push({
          id: `${day.id}-part-1`,
          globalDay: currentGlobalDay,
          name: `Day ${currentGlobalDay} - ${day.name.split("-")[1]?.trim() || day.name} (Part 1)`,
          meta: "3h 30m",
          tasks: part1,
        });

        currentGlobalDay++;
        expandedDays.push({
          id: `${day.id}-part-2`,
          globalDay: currentGlobalDay,
          name: `Day ${currentGlobalDay} - ${day.name.split("-")[1]?.trim() || day.name} (Part 2)`,
          meta: "3h 30m",
          tasks: part2,
        });
      } else {
        currentGlobalDay++;
        expandedDays.push({
          ...day,
          globalDay: currentGlobalDay,
          name: `Day ${currentGlobalDay} - ${day.name.split("-")[1]?.trim() || day.name}`,
        });
      }
    });

    const totalMinutes = expandedDays.reduce(
      (acc, d) => acc + d.tasks.length * 25,
      0
    );
    const estHours = Math.floor(totalMinutes / 60);

    return {
      ...sprint,
      meta: `Est. ${estHours}h · Upcoming`,
      days: expandedDays,
    };
  });

  return stretchedSprints;
}

/**
 * Detects how many past days before activeDayId have 0 tasks completed
 */
export function detectMissedDays(
  sprints: Sprint[],
  completedTasks: Record<string, boolean>,
  activeDayId: string
): number {
  const flatDays: Day[] = [];
  sprints.forEach((s) => {
    if (s.id === "sprint-0" || s.isSpecialTrack) return;
    s.days.forEach((d) => flatDays.push(d));
  });

  const activeIdx = flatDays.findIndex((d) => d.id === activeDayId);
  if (activeIdx <= 0) return 0;

  let missed = 0;
  for (let i = 0; i < activeIdx; i++) {
    const day = flatDays[i];
    const completedCount = day.tasks.filter((t) => completedTasks[t.id]).length;
    if (completedCount === 0 && day.tasks.length > 0) {
      missed++;
    }
  }
  return missed;
}

/**
 * Extends the plan duration by adding `missedDaysCount` buffer/catch-up days
 * into the roadmap.
 * E.g., a 50-day plan with 2 missed days becomes a 52-day plan!
 * If there are incomplete tasks from past days, they get placed into these newly
 * created days so the user has dedicated sessions to finish them without cramming.
 */
export function extendPlanDuration(
  currentSprints: Sprint[],
  missedDaysCount: number,
  completedTasks: Record<string, boolean>,
  activeDayId?: string
): { updatedSprints: Sprint[]; newTotalDays: number } {
  if (missedDaysCount <= 0) {
    const totalDays = currentSprints.reduce((acc, s) => acc + s.days.length, 0);
    return { updatedSprints: currentSprints, newTotalDays: totalDays };
  }

  const sprints: Sprint[] = JSON.parse(JSON.stringify(currentSprints));

  // 1. Gather any incomplete tasks from past days
  const flatDays: { sprintIdx: number; day: Day }[] = [];
  sprints.forEach((sprint, sprintIdx) => {
    if (sprint.id === "sprint-0" || sprint.isSpecialTrack) return;
    sprint.days.forEach((day) => {
      flatDays.push({ sprintIdx, day });
    });
  });

  const activeIdx = activeDayId
    ? flatDays.findIndex((d) => d.day.id === activeDayId)
    : -1;

  const pastIncompleteTasks: Task[] = [];
  if (activeIdx > 0) {
    for (let i = 0; i < activeIdx; i++) {
      const day = flatDays[i].day;
      day.tasks.forEach((t) => {
        if (!completedTasks[t.id]) {
          pastIncompleteTasks.push(t);
        }
      });
    }
  }

  // Target sprint to insert extension days: the sprint containing active day, or the last sprint
  let targetSprintIdx = sprints.length - 1;
  if (activeIdx >= 0 && flatDays[activeIdx]) {
    targetSprintIdx = flatDays[activeIdx].sprintIdx;
  }
  const targetSprint = sprints[targetSprintIdx];

  // Distribute past tasks into the new extension days
  const tasksPerDay = Math.max(1, Math.ceil(pastIncompleteTasks.length / missedDaysCount));

  for (let i = 0; i < missedDaysCount; i++) {
    const chunk = pastIncompleteTasks.slice(i * tasksPerDay, (i + 1) * tasksPerDay);
    const extensionDayId = `catchup-day-${Date.now()}-${i + 1}`;

    targetSprint.days.push({
      id: extensionDayId,
      globalDay: 0, // will be recalculated below
      name: `Catch-Up & Practice (Day +${i + 1})`,
      meta:
        chunk.length > 0
          ? `${Math.max(2, Math.round((chunk.length * 25) / 60))}h planned`
          : "3h planned",
      tasks:
        chunk.length > 0
          ? chunk.map((t) => ({ ...t, title: `🔄 ${t.title}` }))
          : [
              {
                id: `${extensionDayId}-review-1`,
                title: "Missed Day Catch-Up & Problem Consolidation",
                time: "45 min",
              },
              {
                id: `${extensionDayId}-review-2`,
                title: "Core Striver Roadmap Revision & Weak Topic Practice",
                time: "60 min",
              },
            ],
    });
  }

  // Renumber all global days across all sprints consecutively (skipping sprint-0)
  let currentGlobalDay = 0;
  sprints.forEach((sprint) => {
    if (sprint.id === "sprint-0" || sprint.isSpecialTrack) return;
    sprint.days.forEach((day) => {
      currentGlobalDay++;
      day.globalDay = currentGlobalDay;
      if (!day.name.startsWith("Day ")) {
        day.name = `Day ${currentGlobalDay} - ${day.name}`;
      } else {
        day.name = day.name.replace(/Day \d+/, `Day ${currentGlobalDay}`);
      }
    });

    const sprintHours = Math.floor(
      sprint.days.reduce((acc, d) => acc + d.tasks.length * 22, 0) / 60
    );
    sprint.meta = `Est. ${sprintHours}h · Upcoming`;
  });

  return { updatedSprints: sprints, newTotalDays: currentGlobalDay };
}

