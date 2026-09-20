"use client";

import React from "react";
import { Sprint } from "@/lib/types";
import { ChevronDown, CheckCircle2, Circle, Clock } from "lucide-react";

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
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-1 shrink-0">
        <h2 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <span>Curriculum Sprints</span>
        </h2>
        <span className="text-xs text-brand-400 font-semibold bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
          {completedSprintsCount} / {sprints.length} Completed
        </span>
      </div>

      {/* Sprints Main Scrollable Container */}
      <div className="flex flex-col gap-3 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 pb-16">
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
              className={`shrink-0 bg-surface-card border rounded-2xl overflow-hidden transition-all duration-200 ${
                isOpen
                  ? "border-brand-500/50 shadow-xl shadow-brand-500/10 ring-1 ring-brand-500/30"
                  : "border-surface-border hover:border-slate-600"
              }`}
            >
              {/* Sprint Header Toggle (shrink-0 with explicit minimum height so text is NEVER cut off) */}
              <button
                type="button"
                onClick={() => onToggleSprint(sprint.id)}
                className="w-full min-h-[68px] px-4 py-3.5 flex items-center justify-between text-left hover:bg-surface-subtle transition shrink-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition ${
                      isSprintComplete
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-surface-subtle text-slate-200 border border-surface-border"
                    }`}
                  >
                    {isSprintComplete ? "✓" : sIdx + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm text-white leading-tight truncate">
                      {sprint.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-2 leading-tight">
                      <span>{sprint.days.length} Days</span>
                      <span>•</span>
                      <span className={sprintDone > 0 ? "text-brand-400 font-medium" : "text-slate-400"}>
                        {sprintDone}/{sprintTotal} Done
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
                    {sprint.meta?.includes("Est.") ? sprint.meta.split("·")[0].replace("•Upcoming", "").trim() : ""}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-400" : ""
                    }`}
                  />
                </div>
              </button>

              {/* All Days Rendered FULLY without nested overflow clipping */}
              {isOpen && (
                <div className="border-t border-surface-border/70 bg-surface-bg/60 divide-y divide-surface-border/40">
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
                        className={`w-full px-4 py-3 text-left text-xs flex items-center justify-between transition shrink-0 ${
                          isActive
                            ? "bg-brand-600/20 text-brand-300 font-bold border-l-4 border-brand-500 pl-3 shadow-inner"
                            : "text-slate-300 hover:bg-surface-subtle/80 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isDayComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : isActive ? (
                            <div className="w-4 h-4 rounded-full border-2 border-brand-400 flex items-center justify-center shrink-0">
                              <div className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
                            </div>
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span className="truncate font-medium text-sm">
                            {day.name}
                          </span>
                          <span className="text-xs text-slate-500 font-normal">
                            ({day.tasks.length} tasks)
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="text-[11px] text-slate-500 hidden sm:flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {day.meta?.replace("Est.", "").trim()}
                          </span>
                          <span
                            className={`text-xs font-mono px-2 py-0.5 rounded-md ${
                              isDayComplete
                                ? "bg-emerald-500/10 text-emerald-400 font-bold"
                                : isActive
                                ? "bg-brand-500/20 text-brand-300 font-semibold"
                                : "text-slate-400 bg-surface-subtle"
                            }`}
                          >
                            {dayDoneCount}/{day.tasks.length}
                          </span>
                        </div>
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
