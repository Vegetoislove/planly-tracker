"use client";

import React from "react";
import { Sprint } from "@/lib/types";
import { ChevronDown, CheckCircle2, Circle } from "lucide-react";

interface SidebarProps {
  sprints: Sprint[];
  activeDayId: string;
  openSprintId: string | null;
  completedTasks: Record<string, boolean>;
  onSelectDay: (dayId: string, sprintId: string) => void;
  onToggleSprint: (sprintId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sprints,
  activeDayId,
  openSprintId,
  completedTasks,
  onSelectDay,
  onToggleSprint,
}) => {
  // Count how many total sprints are completely finished
  const completedSprintsCount = sprints.filter((sprint) => {
    const total = sprint.days.reduce((acc, d) => acc + d.tasks.length, 0);
    const done = sprint.days.reduce(
      (acc, d) => acc + d.tasks.filter((t) => completedTasks[t.id]).length,
      0
    );
    return total > 0 && done === total;
  }).length;

  return (
    <aside className="w-full flex flex-col gap-3">
      {/* Title & Stats */}
      <div className="flex items-center justify-between px-1">
        <h2 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <span>Curriculum Sprints</span>
        </h2>
        <span className="text-xs text-slate-500 font-medium">
          {completedSprintsCount} / {sprints.length} Completed
        </span>
      </div>

      {/* Sprints Scrollable List */}
      <div className="flex flex-col gap-2.5 max-h-[calc(100vh-130px)] overflow-y-auto pr-1.5 pb-8">
        {sprints.map((sprint, sIdx) => {
          const sprintTotal = sprint.days.reduce(
            (acc, d) => acc + d.tasks.length,
            0
          );
          const sprintDone = sprint.days.reduce(
            (acc, d) =>
              acc + d.tasks.filter((t) => completedTasks[t.id]).length,
            0
          );
          const isSprintComplete =
            sprintTotal > 0 && sprintDone === sprintTotal;
          const isOpen = openSprintId === sprint.id;

          return (
            <div
              key={sprint.id}
              className={`bg-surface-card border rounded-2xl overflow-hidden transition-all duration-200 ${
                isOpen
                  ? "border-brand-500/40 shadow-xl shadow-brand-500/5 ring-1 ring-brand-500/20"
                  : "border-surface-border hover:border-slate-700"
              }`}
            >
              {/* Sprint Accordion Toggle */}
              <button
                type="button"
                onClick={() => onToggleSprint(sprint.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-surface-subtle transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition ${
                      isSprintComplete
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-surface-subtle text-slate-300 border border-surface-border"
                    }`}
                  >
                    {isSprintComplete ? "✓" : sIdx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">
                      {sprint.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {sprint.days.length} Days · {sprintDone}/{sprintTotal} Done
                    </div>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand-400" : ""
                  }`}
                />
              </button>

              {/* Days List (Ensuring all days from Day 1 to Day 7 scroll properly) */}
              {isOpen && (
                <div className="border-t border-surface-border/60 bg-surface-bg/50 divide-y divide-surface-border/30 max-h-96 overflow-y-auto">
                  {sprint.days.map((day) => {
                    const dayDoneCount = day.tasks.filter(
                      (t) => completedTasks[t.id]
                    ).length;
                    const isDayComplete =
                      day.tasks.length > 0 && dayDoneCount === day.tasks.length;
                    const isActive = activeDayId === day.id;

                    return (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => onSelectDay(day.id, sprint.id)}
                        className={`w-full px-4 py-2.5 text-left text-xs flex items-center justify-between transition ${
                          isActive
                            ? "bg-brand-600/15 text-brand-400 font-bold border-l-2 border-brand-500 pl-3.5"
                            : "text-slate-300 hover:bg-surface-subtle/70"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isDayComplete ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : isActive ? (
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-brand-500 flex items-center justify-center shrink-0">
                              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                            </div>
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          )}
                          <span className="truncate">{day.name}</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            ({day.tasks.length} tasks)
                          </span>
                        </div>

                        <span
                          className={`text-[11px] font-mono shrink-0 ml-2 ${
                            isDayComplete
                              ? "text-emerald-400 font-semibold"
                              : "text-slate-500"
                          }`}
                        >
                          {dayDoneCount}/{day.tasks.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
