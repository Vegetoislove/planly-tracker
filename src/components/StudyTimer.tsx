"use client";

import React, { useState, useEffect } from "react";
import { formatStopwatch, formatHoursMinutes } from "@/lib/store";
import { Play, Pause, RotateCcw, Save, Plus } from "lucide-react";

interface StudyTimerProps {
  activeDayId: string;
  activeDayName: string;
  loggedSecondsToday: number;
  onLogTime: (dayId: string, secondsToAdd: number) => void;
}

export const StudyTimer: React.FC<StudyTimerProps> = ({
  activeDayId,
  activeDayName,
  loggedSecondsToday,
  onLogTime,
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && sessionSeconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, sessionSeconds]);

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
    onLogTime(activeDayId, sessionSeconds);
    const addedTimeStr = formatHoursMinutes(sessionSeconds);
    setIsRunning(false);
    setSessionSeconds(0);
    alert(`🎉 Logged ${addedTimeStr} to ${activeDayName}!`);
  };

  const handleQuickAdd = (minutes: number) => {
    onLogTime(activeDayId, minutes * 60);
  };

  return (
    <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 flex flex-col items-center gap-3 w-full md:w-64 shrink-0 shadow-lg">
      {/* Status Header */}
      <div className="flex items-center justify-between w-full text-[11px] uppercase tracking-wider font-semibold">
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
          <span
            className={
              isRunning
                ? "text-emerald-400"
                : sessionSeconds > 0
                ? "text-amber-400"
                : "text-slate-400"
            }
          >
            {isRunning ? "Session Active" : sessionSeconds > 0 ? "Paused" : "Study Timer"}
          </span>
        </span>

        <span className="text-slate-500 text-[10px] lowercase">
          today: {formatHoursMinutes(loggedSecondsToday)}
        </span>
      </div>

      {/* Digital Stopwatch Display */}
      <div className="font-mono text-3xl font-black tracking-widest text-white py-1">
        {formatStopwatch(sessionSeconds)}
      </div>

      {/* Timer Controls */}
      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md ${
            isRunning
              ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20"
              : "bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/20"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{sessionSeconds > 0 ? "Resume" : "Start"}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleLogSession}
          title="Save session time to today"
          className="p-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-xl transition"
        >
          <Save className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleReset}
          title="Reset timer"
          className="p-2 bg-surface-card hover:bg-surface-border text-slate-400 hover:text-white rounded-xl transition border border-surface-border"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Add Minutes */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 w-full pt-1 border-t border-surface-border/40">
        <span className="text-[10px] text-slate-500 mr-auto flex items-center gap-0.5">
          <Plus className="w-3 h-3" /> Quick Add:
        </span>
        <button
          type="button"
          onClick={() => handleQuickAdd(15)}
          className="px-2 py-0.5 bg-surface-card hover:bg-surface-border rounded-lg border border-surface-border text-slate-300 text-[11px] font-medium transition"
        >
          +15m
        </button>
        <button
          type="button"
          onClick={() => handleQuickAdd(30)}
          className="px-2 py-0.5 bg-surface-card hover:bg-surface-border rounded-lg border border-surface-border text-slate-300 text-[11px] font-medium transition"
        >
          +30m
        </button>
        <button
          type="button"
          onClick={() => handleQuickAdd(60)}
          className="px-2 py-0.5 bg-surface-card hover:bg-surface-border rounded-lg border border-surface-border text-slate-300 text-[11px] font-medium transition"
        >
          +1h
        </button>
      </div>
    </div>
  );
};
