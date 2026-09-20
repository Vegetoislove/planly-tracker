"use client";

import React from "react";
import { LineChart, Clock, Folder, Calendar } from "lucide-react";
import { formatHoursMinutes } from "@/lib/store";

interface StatsOverviewProps {
  completedDays: number;
  totalDays: number;
  totalSecondsStudied: number;
  completedSprintsCount: number;
  totalSprintsCount: number;
  estCompletionDate: string;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  completedDays,
  totalDays,
  totalSecondsStudied,
  completedSprintsCount,
  totalSprintsCount,
  estCompletionDate = "9 Nov 2026",
}) => {
  const overallProgressPct = totalDays
    ? Math.round((completedDays / totalDays) * 100)
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {/* 1. Overall Progress */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 flex flex-col justify-between shadow-lg">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <LineChart className="w-4 h-4 text-brand-400" />
          <span>Overall progress</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-black text-white">{overallProgressPct} %</span>
          <span className="text-xs text-slate-500 font-medium">
            {completedDays} / {totalDays} days
          </span>
        </div>
      </div>

      {/* 2. Time Spent */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 flex flex-col justify-between shadow-lg">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Time spent</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-black text-white">
            {formatHoursMinutes(totalSecondsStudied)}
          </span>
          <span className="text-xs text-slate-500 font-medium">of 277h 22m</span>
        </div>
      </div>

      {/* 3. Sprints Completed */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 flex flex-col justify-between shadow-lg">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Folder className="w-4 h-4 text-blue-400" />
          <span>Sprints completed</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-black text-white">{completedSprintsCount}</span>
          <span className="text-xs text-slate-500 font-medium">
            of {totalSprintsCount} sprints
          </span>
        </div>
      </div>

      {/* 4. Est. Completion */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 flex flex-col justify-between shadow-lg">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Est. completion</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-black text-white">
            {estCompletionDate.split(" ")[0]} {estCompletionDate.split(" ")[1]}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {estCompletionDate.split(" ")[2] || "2026"}
          </span>
        </div>
      </div>
    </div>
  );
};
