"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PLAN_DATA } from "@/data/planData";
import { AppState, Day, Sprint, Task } from "@/lib/types";
import { loadSavedState, saveStateToStorage, DEFAULT_STATE } from "@/lib/store";
import { autoRebalancePlan, generate65DayPlan } from "@/lib/rebalance";
import { Header } from "@/components/Header";
import { StatsOverview } from "@/components/StatsOverview";
import { SprintAccordion } from "@/components/SprintAccordion";
import { RightRailPreview } from "@/components/RightRailPreview";
import { AdjustPlanModal } from "@/components/AdjustPlanModal";
import { EmailModal } from "@/components/EmailModal";
import { RevisionModal } from "@/components/RevisionModal";

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [adjustPlanOpen, setAdjustPlanOpen] = useState<boolean>(false);
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [revisionModalOpen, setRevisionModalOpen] = useState<boolean>(false);

  // Load from localStorage on client mount
  useEffect(() => {
    const loaded = loadSavedState();
    setState(loaded);
    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes (after initial mount)
  useEffect(() => {
    if (isLoaded) {
      saveStateToStorage(state);
    }
  }, [state, isLoaded]);

  // Active sprints (custom rebalanced or default 50-day)
  const sprints: Sprint[] = useMemo(() => {
    return state.customSprints && state.customSprints.length > 0
      ? state.customSprints
      : PLAN_DATA;
  }, [state.customSprints]);

  // Flatten all days for sequential tracking
  const allDays = useMemo(() => {
    const list: { day: Day; sprint: Sprint }[] = [];
    sprints.forEach((sprint) => {
      sprint.days.forEach((day) => {
        list.push({ day, sprint });
      });
    });
    return list;
  }, [sprints]);

  // Find active day and sprint
  const activeDayIndex = useMemo(() => {
    const idx = allDays.findIndex((item) => item.day.id === state.activeDayId);
    return idx >= 0 ? idx : 0;
  }, [allDays, state.activeDayId]);

  const activeDayInfo = allDays[activeDayIndex] || allDays[0] || {
    day: sprints[0].days[0],
    sprint: sprints[0],
  };
  const activeDay = activeDayInfo.day;
  const activeSprint = activeDayInfo.sprint;

  // Calculate statistics for StatsOverview
  const totalDays = allDays.length;

  const completedDays = useMemo(() => {
    return allDays.filter((item) => {
      const tasks = item.day.tasks;
      if (tasks.length === 0) return false;
      return tasks.every((t) => !!state.completedTasks[t.id]);
    }).length;
  }, [allDays, state.completedTasks]);

  const completedSprintsCount = useMemo(() => {
    return sprints.filter((sprint) => {
      const allSprintTasks = sprint.days.flatMap((d) => d.tasks);
      if (allSprintTasks.length === 0) return false;
      return allSprintTasks.every((t) => !!state.completedTasks[t.id]);
    }).length;
  }, [sprints, state.completedTasks]);

  const totalSecondsStudied = useMemo(() => {
    return Object.values(state.timeSpentByDay).reduce(
      (acc, sec) => acc + (sec || 0),
      0
    );
  }, [state.timeSpentByDay]);

  const starredTasksCount = useMemo(() => {
    return Object.keys(state.starredTasks || {}).length;
  }, [state.starredTasks]);

  // Backlog tasks from days prior to activeDay (missed tasks)
  const missedTasks = useMemo(() => {
    const missed: (Task & { originDay: string; originSprint: string })[] = [];
    for (let i = 0; i < activeDayIndex; i++) {
      const dayRef = allDays[i];
      dayRef.day.tasks.forEach((t) => {
        if (!state.completedTasks[t.id]) {
          missed.push({
            ...t,
            originDay: dayRef.day.name,
            originSprint: dayRef.sprint.name,
          });
        }
      });
    }
    return missed;
  }, [allDays, activeDayIndex, state.completedTasks]);

  // Handlers
  const handleSelectDay = (day: Day, sprint: Sprint) => {
    setState((prev) => ({
      ...prev,
      activeDayId: day.id,
      openSprintId: sprint.id,
    }));
  };

  const handleToggleSprint = (sprintId: string) => {
    setState((prev) => ({
      ...prev,
      openSprintId: prev.openSprintId === sprintId ? null : sprintId,
    }));
  };

  const handleToggleTask = (taskId: string) => {
    setState((prev) => {
      const updated = { ...prev.completedTasks };
      if (updated[taskId]) {
        delete updated[taskId];
      } else {
        updated[taskId] = true;
      }
      return { ...prev, completedTasks: updated };
    });
  };

  const handleToggleStar = (taskId: string) => {
    setState((prev) => {
      const updated = { ...(prev.starredTasks || {}) };
      if (updated[taskId]) {
        delete updated[taskId];
      } else {
        updated[taskId] = true;
      }
      return { ...prev, starredTasks: updated };
    });
  };

  const handleLogTime = (dayId: string, secondsToAdd: number) => {
    setState((prev) => {
      const current = prev.timeSpentByDay[dayId] || 0;
      return {
        ...prev,
        timeSpentByDay: {
          ...prev.timeSpentByDay,
          [dayId]: current + secondsToAdd,
        },
      };
    });
  };

  const handleSaveEmail = (email: string, active: boolean) => {
    setState((prev) => ({
      ...prev,
      userEmail: email,
      remindersActive: active,
    }));
  };

  const handleImportState = (newState: AppState) => {
    setState(newState);
  };

  const handleRebalanceBacklog = () => {
    const { updatedSprints } = autoRebalancePlan(
      sprints,
      state.completedTasks,
      state.activeDayId
    );
    setState((prev) => ({
      ...prev,
      customSprints: updatedSprints,
    }));
  };

  const handleApply65DaySchedule = () => {
    const stretched = generate65DayPlan();
    setState((prev) => ({
      ...prev,
      customSprints: stretched,
    }));
  };

  const handleResetToDefault = () => {
    setState((prev) => ({
      ...prev,
      customSprints: undefined,
    }));
  };

  const handleSaveGeminiKey = (key: string) => {
    setState((prev) => ({
      ...prev,
      geminiApiKey: key,
    }));
  };

  // Prevent hydration flicker
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Loading TakeUforward Planly...
          </span>
        </div>
      </div>
    );
  }

  const loggedSecondsToday = state.timeSpentByDay[activeDay.id] || 0;

  return (
    <div className="min-h-screen flex flex-col bg-surface-bg text-slate-100">
      {/* 1. Authentic Header */}
      <Header
        state={state}
        planTitle={state.planTitle || "rereckoning"}
        startDateStr={state.startDateStr || "21 Sep 2026"}
        onOpenAdjustPlan={() => setAdjustPlanOpen(true)}
        onOpenEmailModal={() => setEmailModalOpen(true)}
        onImportState={handleImportState}
      />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* 2. Top Stats Overview (4 TakeUforward Cards) */}
        <StatsOverview
          completedDays={completedDays}
          totalDays={totalDays}
          totalSecondsStudied={totalSecondsStudied}
          completedSprintsCount={completedSprintsCount}
          totalSprintsCount={sprints.length}
          estCompletionDate="9 Nov 2026"
        />

        {/* 3. TakeUforward Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Sprints Accordion Tree (7 cols on large screens) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            <SprintAccordion
              sprints={sprints}
              activeDayId={state.activeDayId}
              openSprintId={state.openSprintId}
              completedTasks={state.completedTasks}
              starredTasks={state.starredTasks || {}}
              timeSpentByDay={state.timeSpentByDay}
              onSelectDay={handleSelectDay}
              onToggleSprint={handleToggleSprint}
              onToggleTask={handleToggleTask}
              onToggleStar={handleToggleStar}
            />
          </div>

          {/* Right Column: Preview Rail with Revision List, Plan Preview & Stopwatch (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
            <RightRailPreview
              activeDay={activeDay}
              activeSprintName={activeSprint.name}
              starredTasksCount={starredTasksCount}
              scheduledDateStr={state.startDateStr || "21 Sep 2026"}
              loggedSecondsToday={loggedSecondsToday}
              completedTasks={state.completedTasks}
              onLogTime={handleLogTime}
              onViewRevisionList={() => setRevisionModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Adjust Plan Modal */}
      <AdjustPlanModal
        isOpen={adjustPlanOpen}
        onClose={() => setAdjustPlanOpen(false)}
        onRebalanceBacklog={handleRebalanceBacklog}
        onApply65DaySchedule={handleApply65DaySchedule}
        onResetToDefault={handleResetToDefault}
        onSaveGeminiKey={handleSaveGeminiKey}
        savedGeminiKey={state.geminiApiKey || ""}
        activeSprintName={activeSprint.name}
        activeDayName={activeDay.name}
        missedTasks={missedTasks}
      />

      {/* Email Reminders Modal */}
      <EmailModal
        isOpen={emailModalOpen}
        initialEmail={state.userEmail || ""}
        onClose={() => setEmailModalOpen(false)}
        onSaveEmail={handleSaveEmail}
      />

      {/* Revision List Modal */}
      <RevisionModal
        isOpen={revisionModalOpen}
        onClose={() => setRevisionModalOpen(false)}
        sprints={sprints}
        starredTasks={state.starredTasks || {}}
        completedTasks={state.completedTasks}
        onToggleStar={handleToggleStar}
        onToggleTask={handleToggleTask}
      />
    </div>
  );
}
