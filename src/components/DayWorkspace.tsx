"use client";

import React, { useState } from "react";
import { Day, Task } from "@/lib/types";
import { formatHoursMinutes } from "@/lib/store";
import {
  ExternalLink,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react";

interface DayWorkspaceProps {
  day: Day;
  sprintName: string;
  loggedSecondsToday: number;
  completedTasks: Record<string, boolean>;
  taskNotes: Record<string, string>;
  onToggleTask: (taskId: string) => void;
  onUpdateNote: (taskId: string, note: string) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  hasPrevDay: boolean;
  hasNextDay: boolean;
  timerComponent: React.ReactNode;
}

export const DayWorkspace: React.FC<DayWorkspaceProps> = ({
  day,
  sprintName,
  loggedSecondsToday,
  completedTasks,
  taskNotes,
  onToggleTask,
  onUpdateNote,
  onPrevDay,
  onNextDay,
  hasPrevDay,
  hasNextDay,
  timerComponent,
}) => {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  const doneCount = day.tasks.filter((t) => completedTasks[t.id]).length;
  const pendingCount = day.tasks.length - doneCount;
  const progressPercent = day.tasks.length
    ? Math.round((doneCount / day.tasks.length) * 100)
    : 0;

  // Filter & Search tasks
  let displayedTasks: Task[] = day.tasks;
  if (filter === "pending") {
    displayedTasks = displayedTasks.filter((t) => !completedTasks[t.id]);
  } else if (filter === "completed") {
    displayedTasks = displayedTasks.filter((t) => completedTasks[t.id]);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    displayedTasks = displayedTasks.filter((t) =>
      t.title.toLowerCase().includes(q)
    );
  }

  const toggleNoteBox = (taskId: string) => {
    setOpenNotes((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Day Overview Banner & Timer */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Day Metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-1">
              <span>{sprintName}</span>
              <span>•</span>
              <span>Day {day.globalDay} of 50</span>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight">
              {day.name}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2.5">
              <span className="flex items-center gap-1.5 bg-surface-subtle px-2.5 py-1 rounded-lg border border-surface-border">
                <Target className="w-3.5 h-3.5 text-brand-400" />
                Target: <strong className="text-slate-200">{day.meta || "4h 30m"}</strong>
              </span>

              <span className="flex items-center gap-1.5 bg-surface-subtle px-2.5 py-1 rounded-lg border border-surface-border">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Completed: <strong className="text-emerald-400">{doneCount} / {day.tasks.length}</strong>
              </span>

              <span className="flex items-center gap-1.5 bg-surface-subtle px-2.5 py-1 rounded-lg border border-surface-border">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Logged: <strong className="text-amber-400 font-semibold">{formatHoursMinutes(loggedSecondsToday)}</strong>
              </span>
            </div>
          </div>

          {/* Integrated Study Timer */}
          <div>{timerComponent}</div>
        </div>

        {/* Progress bar & Day step buttons */}
        <div className="flex items-center justify-between border-t border-surface-border/60 mt-5 pt-3.5">
          <button
            type="button"
            onClick={onPrevDay}
            disabled={!hasPrevDay}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition py-1.5 px-3 rounded-lg hover:bg-surface-subtle disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Day
          </button>

          <div className="w-1/3 bg-surface-subtle rounded-full h-1.5 overflow-hidden mx-4">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <button
            type="button"
            onClick={onNextDay}
            disabled={!hasNextDay}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition py-1.5 px-3 rounded-lg hover:bg-surface-subtle disabled:opacity-30 disabled:pointer-events-none"
          >
            Next Day <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-surface-card p-1 rounded-xl border border-surface-border w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === "all"
                ? "bg-brand-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All ({day.tasks.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === "pending"
                ? "bg-brand-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("completed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === "completed"
                ? "bg-brand-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Completed ({doneCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems in this day..."
            className="w-full bg-surface-card border border-surface-border rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Task Checklist Items */}
      <div className="flex flex-col gap-2.5">
        {displayedTasks.length === 0 ? (
          <div className="bg-surface-card border border-surface-border rounded-2xl p-8 text-center text-slate-400">
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-sm font-semibold text-slate-200">
              No tasks found
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Either all tasks are completed in this filter, or your search had
              no matches.
            </div>
          </div>
        ) : (
          displayedTasks.map((task) => {
            const isDone = !!completedTasks[task.id];
            const hasNotes = !!taskNotes[task.id];
            const isNoteOpen = openNotes[task.id] || hasNotes;
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
              "takeuforward " + task.title
            )}`;

            return (
              <div
                key={task.id}
                className={`bg-surface-card border rounded-2xl p-4 transition-all duration-200 ${
                  isDone
                    ? "border-emerald-500/30 bg-emerald-950/10"
                    : "border-surface-border hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Checkbox & Task Title */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      id={task.id}
                      checked={isDone}
                      onChange={() => onToggleTask(task.id)}
                      className="mt-1 w-4 h-4 rounded border-slate-600 text-brand-500 focus:ring-brand-500/20 focus:ring-2 cursor-pointer bg-surface-subtle"
                    />

                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={task.id}
                        className={`text-sm font-semibold text-white block cursor-pointer select-none leading-snug ${
                          isDone ? "line-through text-slate-400" : ""
                        }`}
                      >
                        {task.title}
                      </label>

                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-surface-subtle border border-surface-border text-slate-300 font-mono font-medium">
                          {task.time || "15 min"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Search Tutorial / LeetCode"
                      className="p-2 text-slate-400 hover:text-brand-400 hover:bg-surface-subtle rounded-xl transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => toggleNoteBox(task.id)}
                      title="Notes"
                      className={`p-2 rounded-xl transition ${
                        hasNotes
                          ? "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
                          : "text-slate-400 hover:text-amber-400 hover:bg-surface-subtle"
                      }`}
                    >
                      <StickyNote className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Personal Notes Box */}
                {isNoteOpen && (
                  <div className="mt-3 pt-3 border-t border-surface-border/50">
                    <textarea
                      value={taskNotes[task.id] || ""}
                      onChange={(e) => onUpdateNote(task.id, e.target.value)}
                      placeholder="Write your notes, key takeaways, or edge cases here (auto-saved)..."
                      className="w-full bg-surface-bg border border-surface-border rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500 transition resize-y h-20"
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
