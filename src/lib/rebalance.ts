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
