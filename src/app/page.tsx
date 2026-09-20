"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PLAN_DATA } from "@/data/planData";
import { AppState, Day, Sprint, Task } from "@/lib/types";
import { loadSavedState, saveStateToStorage, DEFAULT_STATE } from "@/lib/store";
import {
  generate65DayPlan,
  extendPlanDuration,
  detectMissedDays,
} from "@/lib/rebalance";
import { rippleCascadePlan } from "@/lib/rippleCascade";
import {
  calculateCompletionDate,
  calculateDayDate,
  getTodayFormatted,
  getCalendarDayNumber,
} from "@/lib/dateUtils";
import { Header } from "@/components/Header";
import { StatsOverview } from "@/components/StatsOverview";
import { SprintAccordion } from "@/components/SprintAccordion";
import { RightRailPreview } from "@/components/RightRailPreview";
import { AdjustPlanModal } from "@/components/AdjustPlanModal";
import { EmailModal } from "@/components/EmailModal";
import { RevisionModal } from "@/components/RevisionModal";
import { AiHintModal } from "@/components/AiHintModal";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [adjustPlanOpen, setAdjustPlanOpen] = useState<boolean>(false);
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [revisionModalOpen, setRevisionModalOpen] = useState<boolean>(false);
  const [checkInDismissed, setCheckInDismissed] = useState<boolean>(false);
  const [autoCascadeBannerMsg, setAutoCascadeBannerMsg] = useState<string | null>(null);

  // Gemini AI Hint Modal State
  const [hintModalState, setHintModalState] = useState<{
    isOpen: boolean;
    problemTitle: string;
    sprintName: string;
  }>({
    isOpen: false,
    problemTitle: "",
    sprintName: "",
  });

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

  // Check on load: if a new day has arrived and auto-cascade is enabled, automatically cascade!
  useEffect(() => {
    if (!isLoaded) return;
    const todayFormatted = getTodayFormatted();
    if (
      state.autoCascadeEnabled !== false &&
      state.lastAutoCascadeDate !== todayFormatted
    ) {
      const currentCalDayNumber = getCalendarDayNumber(state.startDateStr || "21 Sep 2026");
      const targetDay = allDays.find((d) => d.day.globalDay === currentCalDayNumber);

      if (missedTasks.length > 0) {
        const { updatedSprints, shiftedCount, newTotalDays } = rippleCascadePlan(
          sprints,
          state.completedTasks,
          targetDay?.day.id || state.activeDayId,
          11
        );
        setState((prev) => ({
          ...prev,
          customSprints: updatedSprints,
          activeDayId: targetDay?.day.id || prev.activeDayId,
          openSprintId: targetDay?.sprint.id || prev.openSprintId,
          lastAutoCascadeDate: todayFormatted,
        }));
        setAutoCascadeBannerMsg(
          `✨ Automatically Adjusted for Today (${todayFormatted}): ${shiftedCount} unfinished tasks from past days were automatically cascaded into today and future sessions. Plan is now ${newTotalDays} days.`
        );
      } else {
        setState((prev) => ({
          ...prev,
          activeDayId: targetDay?.day.id || prev.activeDayId,
          openSprintId: targetDay?.sprint.id || prev.openSprintId,
          lastAutoCascadeDate: todayFormatted,
        }));
      }
    }
  }, [isLoaded]); // run on mount when isLoaded flips to true

  // Active sprints (custom rebalanced, duration extended, or default 50-day)
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

  // Core DSA days (Sprints 1 through 8, excluding special aptitude track)
  const dsaDays = useMemo(() => {
    return allDays.filter((item) => item.sprint.id !== "sprint-0" && !item.sprint.isSpecialTrack);
  }, [allDays]);

  const totalDsaDays = dsaDays.length || 50;

  // Dynamically compute completion date based on start date + total DSA days
  const estCompletionDate = useMemo(() => {
    return calculateCompletionDate(state.startDateStr || "21 Sep 2026", totalDsaDays);
  }, [state.startDateStr, totalDsaDays]);

  // Dynamically compute scheduled date for the currently selected day
  const isSelectedDayAptitude = activeDay.id.startsWith("aptitude-") || activeSprint.id === "sprint-0";
  const scheduledDateForActiveDay = useMemo(() => {
    if (isSelectedDayAptitude) return "Placement Track";
    return calculateDayDate(state.startDateStr || "21 Sep 2026", activeDay.globalDay);
  }, [isSelectedDayAptitude, state.startDateStr, activeDay.globalDay]);

  // Detect missed days before active day
  const detectedMissedDays = useMemo(() => {
    return detectMissedDays(sprints, state.completedTasks, state.activeDayId);
  }, [sprints, state.completedTasks, state.activeDayId]);

  const completedDsaDays = useMemo(() => {
    return dsaDays.filter((item) => {
      const tasks = item.day.tasks;
      if (tasks.length === 0) return false;
      return tasks.every((t) => !!state.completedTasks[t.id]);
    }).length;
  }, [dsaDays, state.completedTasks]);

  const dsaSprints = useMemo(() => {
    return sprints.filter((s) => s.id !== "sprint-0" && !s.isSpecialTrack);
  }, [sprints]);

  const completedSprintsCount = useMemo(() => {
    return dsaSprints.filter((sprint) => {
      const allSprintTasks = sprint.days.flatMap((d) => d.tasks);
      if (allSprintTasks.length === 0) return false;
      return allSprintTasks.every((t) => !!state.completedTasks[t.id]);
    }).length;
  }, [dsaSprints, state.completedTasks]);

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
    const isSpecial = activeSprint.id === "sprint-0" || activeSprint.isSpecialTrack;
    const relevantDays = allDays.filter((item) =>
      isSpecial
        ? item.sprint.id === "sprint-0" || item.sprint.isSpecialTrack
        : item.sprint.id !== "sprint-0" && !item.sprint.isSpecialTrack
    );
    const activeRelIndex = relevantDays.findIndex((item) => item.day.id === state.activeDayId);

    if (activeRelIndex > 0) {
      for (let i = 0; i < activeRelIndex; i++) {
        const dayRef = relevantDays[i];
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
    }
    return missed;
  }, [allDays, activeSprint, state.activeDayId, state.completedTasks]);

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

  // ⚡ Primary requirement: Missed Days Duration Extension
  const handleExtendDuration = (missedDaysToAdd: number) => {
    const { updatedSprints } = extendPlanDuration(
      sprints,
      missedDaysToAdd,
      state.completedTasks,
      state.activeDayId
    );
    setState((prev) => ({
      ...prev,
      customSprints: updatedSprints,
    }));
  };

  // ⚡ Conveyor-Belt Ripple Cascade (rolls unfinished tasks forward & repacks ~11/day)
  const handleRippleCascade = (maxTasksPerDay: number = 11) => {
    const { updatedSprints, shiftedCount, newTotalDays } = rippleCascadePlan(
      sprints,
      state.completedTasks,
      state.activeDayId,
      maxTasksPerDay
    );
    setState((prev) => ({
      ...prev,
      customSprints: updatedSprints,
    }));
    alert(
      `⚡ Conveyor-belt ripple applied!\nShifted ${shiftedCount} incomplete tasks downstream.\nDaily load capped at ${maxTasksPerDay} tasks/day.\nTotal plan is now ${newTotalDays} days.`
    );
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

  const handleUpdateStartDate = (newStartDateStr: string) => {
    setState((prev) => ({
      ...prev,
      startDateStr: newStartDateStr,
    }));
  };

  const handleRenamePlan = (newTitle: string) => {
    setState((prev) => ({
      ...prev,
      planTitle: newTitle,
    }));
  };

  const handleOpenAiHint = (problemTitle: string, sprintName: string) => {
    setHintModalState({
      isOpen: true,
      problemTitle,
      sprintName,
    });
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
        onUpdateStartDate={handleUpdateStartDate}
        onRenamePlan={handleRenamePlan}
      />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* Morning Check-In Alert Banner (When Unfinished Past Tasks Exist) */}
        {missedTasks.length > 0 && !checkInDismissed && (
          <div className="bg-gradient-to-r from-brand-950/60 via-purple-950/40 to-surface-card border border-brand-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Daily Progress Check:</span>
                  <span className="text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-amber-500/30">
                    {missedTasks.length} uncompleted tasks from past days
                  </span>
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  Would you like to ripple-cascade these tasks into upcoming days to maintain a healthy ~4.5h daily study load?
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => handleRippleCascade(11)}
                className="py-1.5 px-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-brand-600/20"
              >
                <span>⚡ Ripple-Shift Downstream</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setCheckInDismissed(true)}
                className="py-1.5 px-3 text-xs text-slate-400 hover:text-white rounded-xl transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Auto-Cascade Notification Banner */}
        {autoCascadeBannerMsg && (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs text-emerald-200 font-medium leading-relaxed">
                {autoCascadeBannerMsg}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAutoCascadeBannerMsg(null)}
              className="text-xs font-bold text-emerald-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-emerald-500/20 transition"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 2. Top Stats Overview (4 TakeUforward Cards with Dynamic Completion Date & Duration) */}
        <StatsOverview
          completedDays={completedDsaDays}
          totalDays={totalDsaDays}
          totalSecondsStudied={totalSecondsStudied}
          completedSprintsCount={completedSprintsCount}
          totalSprintsCount={dsaSprints.length}
          estCompletionDate={estCompletionDate}
        />

        {/* 3. TakeUforward Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Sprints Accordion Tree (7 cols on large screens) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            <SprintAccordion
              sprints={sprints}
              activeDayId={state.activeDayId}
              startDateStr={state.startDateStr || "21 Sep 2026"}
              openSprintId={state.openSprintId}
              completedTasks={state.completedTasks}
              starredTasks={state.starredTasks || {}}
              timeSpentByDay={state.timeSpentByDay}
              onSelectDay={handleSelectDay}
              onToggleSprint={handleToggleSprint}
              onToggleTask={handleToggleTask}
              onToggleStar={handleToggleStar}
              onOpenAiHint={handleOpenAiHint}
            />
          </div>

          {/* Right Column: Preview Rail with Revision List, Plan Preview & Stopwatch (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
            <RightRailPreview
              activeDay={activeDay}
              activeSprintName={activeSprint.name}
              starredTasksCount={starredTasksCount}
              scheduledDateStr={scheduledDateForActiveDay}
              loggedSecondsToday={loggedSecondsToday}
              completedTasks={state.completedTasks}
              onLogTime={handleLogTime}
              onViewRevisionList={() => setRevisionModalOpen(true)}
              onOpenAiHint={handleOpenAiHint}
            />
          </div>
        </div>
      </main>

      {/* Adjust Plan Modal with Duration Extension & Ripple Cascade */}
      <AdjustPlanModal
        isOpen={adjustPlanOpen}
        onClose={() => setAdjustPlanOpen(false)}
        currentTotalDays={totalDsaDays}
        startDateStr={state.startDateStr || "21 Sep 2026"}
        detectedMissedDays={detectedMissedDays}
        autoCascadeEnabled={state.autoCascadeEnabled !== false}
        onToggleAutoCascade={(enabled) =>
          setState((prev) => ({ ...prev, autoCascadeEnabled: enabled }))
        }
        onExtendDuration={handleExtendDuration}
        onRippleCascade={handleRippleCascade}
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

      {/* 💡 Gemini AI Hint & Intuition Modal */}
      <AiHintModal
        isOpen={hintModalState.isOpen}
        onClose={() => setHintModalState((prev) => ({ ...prev, isOpen: false }))}
        problemTitle={hintModalState.problemTitle}
        sprintName={hintModalState.sprintName}
        geminiApiKey={state.geminiApiKey}
      />
    </div>
  );
}
