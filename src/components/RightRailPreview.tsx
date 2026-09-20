"use client";

import React, { useState, useEffect } from "react";
import { Day } from "@/lib/types";
import { formatStopwatch, formatHoursMinutes } from "@/lib/store";
import {
  Star,
  CalendarDays,
  ListChecks,
  Clock3,
  Play,
  Pause,
  RotateCcw,
  Save,
  Plus,
  ExternalLink,
} from "lucide-react";

interface RightRailPreviewProps {
  activeDay: Day;
  activeSprintName: string;
  starredTasksCount: number;
  scheduledDateStr: string;
  loggedSecondsToday: number;
  completedTasks: Record<string, boolean>;
  onLogTime: (dayId: string, secondsToAdd: number) => void;
  onViewRevisionList: () => void;
}

export const RightRailPreview: React.FC<RightRailPreviewProps> = ({
  activeDay,
  activeSprintName,
  starredTasksCount,
  scheduledDateStr = "21 Sep 2026",
  loggedSecondsToday,
  completedTasks,
  onLogTime,
  onViewRevisionList,
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    if (sessionSeconds === 0) return;
    if (confirm("Reset current stopwatch back to 00:00:00?")) {
      setIsRunning(false);
      setSessionSeconds(0);
    }
  };

  const handleLogSession = () => {
    if (sessionSeconds === 0) {
      alert("Timer is at 0. Start studying first before logging time!");
      return;
    }
    onLogTime(activeDay.id, sessionSeconds);
    const addedTimeStr = formatHoursMinutes(sessionSeconds);
    setIsRunning(false);
    setSessionSeconds(0);
    alert(`🎉 Logged ${addedTimeStr} to ${activeDay.name}!`);
  };

  const handleQuickAdd = (minutes: number) => {
    onLogTime(activeDay.id, minutes * 60);
  };

  return (
    <aside className="w-full flex flex-col gap-4 sticky top-24">
      
      {/* 1. Revision List Card (Matching TakeUforward) */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-bold text-sm text-white">Revision list</span>
          <span className="text-xs bg-amber-500/10 text-amber-400 font-semibold px-2 py-0.5 rounded-full border border-amber-500/20">
            {starredTasksCount}
          </span>
        </div>
        <button
          type="button"
          onClick={onViewRevisionList}
          className="text-xs font-semibold text-brand-400 hover:text-brand-300 transition"
        >
          View all
        </button>
      </div>

      {/* 2. Scheduled Plan Preview Card (Matching TakeUforward) */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 shadow-xl flex flex-col gap-4">
        
        {/* Banner Status */}
        <div className="flex flex-col gap-1.5 border-l-4 border-brand-500 bg-brand-500/10 rounded-xl p-3.5">
          <p className="flex items-center gap-2 text-xs font-bold text-brand-400">
            <CalendarDays className="w-4 h-4" />
            <span>Active Session · {activeSprintName}</span>
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your study session is ready. Log your timer as you complete problems.
          </p>
        </div>

        {/* Schedule Header */}
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-bold text-white">
            {activeDay.name} · Schedule preview
          </h3>
          <p className="text-xs text-slate-400">
            Scheduled for {scheduledDateStr} · Day {activeDay.globalDay} of 50
          </p>
        </div>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 py-1 border-y border-surface-border/60">
          <span className="flex items-center gap-1.5">
            <ListChecks className="w-3.5 h-3.5 text-brand-400" />
            <strong className="text-slate-200">{activeDay.tasks.length} topics</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="w-3.5 h-3.5 text-amber-400" />
            <strong className="text-slate-200">{activeDay.meta || "4h 30m"} planned</strong>
          </span>
        </div>

        {/* LIVE STOPWATCH WIDGET (Integrated cleanly inside preview card) */}
        <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 flex flex-col items-center gap-2.5">
          <div className="flex items-center justify-between w-full text-[11px] font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isRunning
                    ? "bg-emerald-400 animate-ping"
                    : sessionSeconds > 0
                    ? "bg-amber-400"
                    : "bg-slate-500"
                }`}
              />
              <span className={isRunning ? "text-emerald-400" : sessionSeconds > 0 ? "text-amber-400" : "text-slate-400"}>
                {isRunning ? "Session in Progress" : sessionSeconds > 0 ? "Paused" : "Study Timer"}
              </span>
            </span>
            <span>Today: <strong className="text-amber-400">{formatHoursMinutes(loggedSecondsToday)}</strong></span>
          </div>

          <div className="font-mono text-3xl font-black text-white tracking-widest py-1">
            {formatStopwatch(sessionSeconds)}
          </div>

          <div className="flex items-center gap-2 w-full">
            <button
              type="button"
              onClick={handleToggle}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                isRunning
                  ? "bg-amber-600 hover:bg-amber-500 text-white"
                  : "bg-brand-600 hover:bg-brand-500 text-white"
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? "Pause" : sessionSeconds > 0 ? "Resume" : "Start"}</span>
            </button>

            <button
              type="button"
              onClick={handleLogSession}
              title="Log time to today"
              className="p-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-xl transition"
            >
              <Save className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Reset stopwatch"
              className="p-2 bg-surface-card hover:bg-surface-border text-slate-400 hover:text-white rounded-xl transition border border-surface-border"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 w-full pt-1.5 border-t border-surface-border/50 justify-between">
            <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
              <Plus className="w-3 h-3" /> Quick Add:
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleQuickAdd(15)}
                className="px-2 py-0.5 bg-surface-card hover:bg-surface-border rounded-lg border border-surface-border text-slate-300 text-[11px]"
              >
                +15m
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(30)}
                className="px-2 py-0.5 bg-surface-card hover:bg-surface-border rounded-lg border border-surface-border text-slate-300 text-[11px]"
              >
                +30m
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(60)}
                className="px-2 py-0.5 bg-surface-card hover:bg-surface-border rounded-lg border border-surface-border text-slate-300 text-[11px]"
              >
                +1h
              </button>
            </div>
          </div>
        </div>

        {/* Topic List (Matching TakeUforward) */}
        <div className="flex flex-col max-h-72 overflow-y-auto divide-y divide-surface-border/40 pr-1">
          {activeDay.tasks.map((task) => {
            const isDone = !!completedTasks[task.id];
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
              "takeuforward " + task.title
            )}`;

            return (
              <div
                key={task.id}
                className="flex items-start justify-between gap-3 py-2 text-xs"
              >
                <a
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`min-w-0 break-words leading-snug hover:text-brand-400 hover:underline flex items-center gap-1 ${
                    isDone
                      ? "line-through text-slate-500 font-normal"
                      : "text-slate-300 font-medium"
                  }`}
                >
                  <span className="truncate">{task.title}</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 shrink-0" />
                </a>
                <span className="shrink-0 text-slate-500 font-mono text-[11px]">
                  {task.time?.replace("Est.", "").trim() || "15m"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer Note (Matching TakeUforward) */}
        <p className="border-t border-surface-border/60 pt-3 text-[11px] leading-relaxed text-slate-500">
          Browse your schedule now. Task timers and progress tracking update your study stats automatically.
        </p>
      </div>
    </aside>
  );
};
