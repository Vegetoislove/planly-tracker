"use client";

import React, { useState } from "react";
import { Sprint, Day } from "@/lib/types";
import { formatHoursMinutes } from "@/lib/store";
import { calculateDayDate, isDateToday, isDatePast } from "@/lib/dateUtils";
import {
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Circle,
  Star,
  ExternalLink,
  Lightbulb,
} from "lucide-react";

interface SprintAccordionProps {
  sprints: Sprint[];
  activeDayId: string;
  startDateStr?: string;
  openSprintId: string | null;
  completedTasks: Record<string, boolean>;
  starredTasks: Record<string, boolean>;
  timeSpentByDay: Record<string, number>;
  onSelectDay: (day: Day, sprint: Sprint) => void;
  onToggleSprint: (sprintId: string) => void;
  onToggleTask: (taskId: string) => void;
  onToggleStar: (taskId: string) => void;
  onOpenAiHint?: (problemTitle: string, sprintName: string) => void;
}

export const SprintAccordion: React.FC<SprintAccordionProps> = ({
  sprints,
  activeDayId,
  startDateStr = "21 Sep 2026",
  openSprintId,
  completedTasks,
  starredTasks,
  timeSpentByDay,
  onSelectDay,
  onToggleSprint,
  onToggleTask,
  onToggleStar,
  onOpenAiHint,
}) => {
  const [openDayId, setOpenDayId] = useState<string | null>(activeDayId);

  const handleDayClick = (day: Day, sprint: Sprint, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectDay(day, sprint);
    setOpenDayId((prev) => (prev === day.id ? null : day.id));
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {sprints.map((sprint) => {
        const isOpen = openSprintId === sprint.id;

        // Calculate time spent in this sprint
        const sprintSeconds = sprint.days.reduce(
          (acc, d) => acc + (timeSpentByDay[d.id] || 0),
          0
        );
        const sprintTimeSpentStr =
          sprintSeconds > 0 ? formatHoursMinutes(sprintSeconds) : "0 sec";

        // Calculate sprint tasks completion
        const sprintTotalTasks = sprint.days.reduce(
          (acc, d) => acc + d.tasks.length,
          0
        );
        const sprintDoneTasks = sprint.days.reduce(
          (acc, d) =>
            acc + d.tasks.filter((t) => completedTasks[t.id]).length,
          0
        );
        const isSprintDone =
          sprintTotalTasks > 0 && sprintDoneTasks === sprintTotalTasks;
        const isSprintInProgress = sprintDoneTasks > 0 && !isSprintDone;

        // Extract clean estimate
        const cleanEstimate = sprint.meta?.includes("Est.")
          ? sprint.meta.split("·")[0].replace("•Upcoming", "").trim()
          : "Est. 39h";

        return (
          <div
            key={sprint.id}
            className={`bg-surface-card border rounded-2xl overflow-hidden transition-all duration-200 ${
              isOpen
                ? "border-brand-500/50 shadow-xl shadow-brand-500/5"
                : "border-surface-border hover:border-slate-600"
            }`}
          >
            {/* Sprint Header (TakeUforward Authentic Design) */}
            <button
              type="button"
              onClick={() => onToggleSprint(sprint.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-surface-subtle transition"
            >
              {/* Left Badge */}
              <div className="flex items-center gap-3">
                <span
                  className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSprintDone
                      ? "border-emerald-500 bg-emerald-500"
                      : isSprintInProgress
                      ? "border-brand-400 bg-brand-400/20"
                      : "border-slate-500"
                  }`}
                />
                <span className="font-bold text-base text-white tracking-tight">
                  {sprint.name}
                </span>
              </div>

              {/* Right Meta (Pill badge, estimate, time spent) */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                    isSprintDone
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : isSprintInProgress
                      ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                      : "bg-surface-subtle text-brand-300 border border-brand-500/10"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {isSprintDone ? "Completed" : isSprintInProgress ? "In Progress" : "Upcoming"}
                </span>

                <span className="text-xs text-slate-400 hidden sm:inline">
                  {cleanEstimate} · Time spent : {sprintTimeSpentStr}
                </span>

                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {/* Sprint Tree Content (All Days Expanded) */}
            {isOpen && (
              <div className="border-t border-surface-border/60 bg-surface-bg/60 p-4 flex flex-col gap-2">
                {sprint.days.map((day) => {
                  const isDaySelected = activeDayId === day.id;
                  const isDayOpened = openDayId === day.id;

                  const daySeconds = timeSpentByDay[day.id] || 0;
                  const dayDoneCount = day.tasks.filter((t) => completedTasks[t.id]).length;
                  const isDayComplete = day.tasks.length > 0 && dayDoneCount === day.tasks.length;
                  const dayDateStr = calculateDayDate(startDateStr, day.globalDay);
                  const isDayToday = isDateToday(dayDateStr);
                  const isDayPast = isDatePast(dayDateStr);

                  return (
                    <div
                      key={day.id}
                      className={`border rounded-xl transition-all overflow-hidden ${
                        isDaySelected
                          ? "border-brand-500/40 bg-surface-card shadow-md"
                          : isDayToday
                          ? "border-brand-500/30 bg-surface-card/90"
                          : "border-surface-border/50 bg-surface-card/60 hover:border-surface-border"
                      }`}
                    >
                      {/* Day Header */}
                      <button
                        type="button"
                        onClick={(e) => handleDayClick(day, sprint, e)}
                        className={`w-full px-4 py-3 flex items-center justify-between text-left text-xs font-medium transition ${
                          isDaySelected
                            ? "text-brand-300 font-bold bg-brand-500/10"
                            : "text-slate-200 hover:bg-surface-subtle"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isDayOpened ? (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <span className="text-sm font-bold text-white">
                            {day.name}
                          </span>
                          {isDayToday && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-brand-500 text-white tracking-wider shadow-sm animate-pulse">
                              TODAY
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2.5 text-xs text-slate-400">
                          <span className="text-slate-300 font-semibold">
                            {dayDateStr}
                          </span>
                          <span>·</span>
                          <span>{day.meta || "4h 30m"}</span>
                          {daySeconds > 0 && (
                            <span className="text-emerald-400 font-medium">
                              · {formatHoursMinutes(daySeconds)}
                            </span>
                          )}
                          <span
                            className={`font-mono text-xs px-2 py-0.5 rounded-md ${
                              isDayComplete
                                ? "bg-emerald-500/20 text-emerald-400 font-bold"
                                : isDayPast && !isDayComplete
                                ? "bg-amber-500/20 text-amber-400 font-semibold"
                                : "bg-surface-subtle text-slate-400"
                            }`}
                          >
                            {dayDoneCount}/{day.tasks.length}
                          </span>
                        </div>
                      </button>

                      {/* Day Tasks List (When Day is Expanded) */}
                      {isDayOpened && (
                        <div className="border-t border-surface-border/60 bg-surface-bg/40 divide-y divide-surface-border/40">
                          {day.tasks.map((task) => {
                            const isTaskDone = !!completedTasks[task.id];
                            const isStarred = !!starredTasks[task.id];
                            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
                              "takeuforward " + task.title
                            )}`;

                            return (
                              <div
                                key={task.id}
                                className={`px-4 py-2.5 flex items-center justify-between text-xs transition ${
                                  isTaskDone
                                    ? "bg-emerald-950/15"
                                    : "hover:bg-surface-subtle/50"
                                }`}
                              >
                                {/* Left Checkbox & Title */}
                                <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                                  <button
                                    type="button"
                                    onClick={() => onToggleTask(task.id)}
                                    className="text-slate-500 hover:text-brand-400 shrink-0"
                                  >
                                    {isTaskDone ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                                    )}
                                  </button>

                                  <a
                                    href={searchUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`truncate cursor-pointer hover:text-brand-400 hover:underline flex items-center gap-1.5 ${
                                      isTaskDone
                                        ? "line-through text-slate-500 font-normal"
                                        : "text-slate-200 font-medium"
                                    }`}
                                    title="Search problem / solution"
                                  >
                                    <span className="truncate">{task.title.replace(/^🔄\s*/, "")}</span>
                                    {task.title.includes("🔄") && (
                                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                                        Shifted
                                      </span>
                                    )}
                                  </a>
                                </div>

                                {/* Right: AI Hint, Star for revision, Estimated time, Search */}
                                <div className="flex items-center gap-2 shrink-0">
                                  {onOpenAiHint && (
                                    <button
                                      type="button"
                                      onClick={() => onOpenAiHint(task.title, sprint.name)}
                                      title="Ask Gemini for Intuition & Approach Hint"
                                      className="p-1 rounded text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition flex items-center gap-1"
                                    >
                                      <Lightbulb className="w-3.5 h-3.5 fill-purple-400/20" />
                                      <span className="text-[10px] font-bold hidden sm:inline">Hint</span>
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => onToggleStar(task.id)}
                                    title="Mark for revision"
                                    className={`p-1 rounded transition ${
                                      isStarred
                                        ? "text-amber-400"
                                        : "text-slate-600 hover:text-amber-400"
                                    }`}
                                  >
                                    <Star
                                      className={`w-3.5 h-3.5 ${
                                        isStarred ? "fill-amber-400" : ""
                                      }`}
                                    />
                                  </button>

                                  <span className="text-[11px] text-slate-400 font-mono">
                                    {task.time?.replace("Est.", "").trim() || "15 min"}
                                  </span>

                                  <a
                                    href={searchUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 hover:text-slate-300"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
