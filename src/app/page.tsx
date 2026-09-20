"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PLAN_DATA } from "@/data/planData";
import { AppState, Day } from "@/lib/types";
import { loadSavedState, saveStateToStorage, DEFAULT_STATE } from "@/lib/store";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DayWorkspace } from "@/components/DayWorkspace";
import { StudyTimer } from "@/components/StudyTimer";
import { EmailModal } from "@/components/EmailModal";

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);

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

  // Flatten all days for sequential navigation
  const allDays = useMemo(() => {
    const list: { day: Day; sprintName: string; sprintId: string }[] = [];
    PLAN_DATA.forEach((sprint) => {
      sprint.days.forEach((day) => {
        list.push({ day, sprintName: sprint.name, sprintId: sprint.id });
      });
    });
    return list;
  }, []);

  // Calculate totals
  const totalTasks = useMemo(() => {
    return PLAN_DATA.reduce(
      (acc, s) => acc + s.days.reduce((dAcc, d) => dAcc + d.tasks.length, 0),
      0
    );
  }, []);

  const completedTasksCount = useMemo(() => {
    return Object.keys(state.completedTasks).length;
  }, [state.completedTasks]);

  const totalSecondsStudied = useMemo(() => {
    return Object.values(state.timeSpentByDay).reduce(
      (acc, sec) => acc + (sec || 0),
      0
    );
  }, [state.timeSpentByDay]);

  // Current active day object
  const currentDayIndex = allDays.findIndex(
    (item) => item.day.id === state.activeDayId
  );
  const activeDayInfo =
    currentDayIndex >= 0 ? allDays[currentDayIndex] : allDays[0];
  const activeDay = activeDayInfo.day;
  const activeSprintName = activeDayInfo.sprintName;

  // Handlers
  const handleSelectDay = (dayId: string, sprintId: string) => {
    setState((prev) => ({
      ...prev,
      activeDayId: dayId,
      openSprintId: sprintId,
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

  const handleUpdateNote = (taskId: string, note: string) => {
    setState((prev) => ({
      ...prev,
      taskNotes: {
        ...prev.taskNotes,
        [taskId]: note,
      },
    }));
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

  const handlePrevDay = () => {
    if (currentDayIndex > 0) {
      const prev = allDays[currentDayIndex - 1];
      handleSelectDay(prev.day.id, prev.sprintId);
    }
  };

  const handleNextDay = () => {
    if (currentDayIndex < allDays.length - 1) {
      const next = allDays[currentDayIndex + 1];
      handleSelectDay(next.day.id, next.sprintId);
    }
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

  // Prevent hydration layout shift
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Loading Planly Tracker...
          </span>
        </div>
      </div>
    );
  }

  const loggedSecondsToday = state.timeSpentByDay[activeDay.id] || 0;

  return (
    <div className="min-h-screen flex flex-col bg-surface-bg text-slate-100">
      {/* Top Header */}
      <Header
        state={state}
        totalTasks={totalTasks}
        completedTasksCount={completedTasksCount}
        totalSecondsStudied={totalSecondsStudied}
        onOpenEmailModal={() => setEmailModalOpen(true)}
        onImportState={handleImportState}
      />

      {/* Main Grid: Sidebar (4 cols) & Workspace (8 cols) */}
      <div className="max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar
            sprints={PLAN_DATA}
            activeDayId={state.activeDayId}
            openSprintId={state.openSprintId}
            completedTasks={state.completedTasks}
            onSelectDay={handleSelectDay}
            onToggleSprint={handleToggleSprint}
          />
        </div>

        {/* Day Workspace with Integrated Timer */}
        <div className="lg:col-span-8">
          <DayWorkspace
            day={activeDay}
            sprintName={activeSprintName}
            loggedSecondsToday={loggedSecondsToday}
            completedTasks={state.completedTasks}
            taskNotes={state.taskNotes}
            onToggleTask={handleToggleTask}
            onUpdateNote={handleUpdateNote}
            onPrevDay={handlePrevDay}
            onNextDay={handleNextDay}
            hasPrevDay={currentDayIndex > 0}
            hasNextDay={currentDayIndex < allDays.length - 1}
            timerComponent={
              <StudyTimer
                activeDayId={activeDay.id}
                activeDayName={activeDay.name}
                loggedSecondsToday={loggedSecondsToday}
                onLogTime={handleLogTime}
              />
            }
          />
        </div>
      </div>

      {/* Email Subscription Modal */}
      <EmailModal
        isOpen={emailModalOpen}
        initialEmail={state.userEmail || ""}
        onClose={() => setEmailModalOpen(false)}
        onSaveEmail={handleSaveEmail}
      />
    </div>
  );
}
