"use client";

import React, { useState, useMemo } from "react";
import { Sprint } from "@/lib/types";
import { X, Star, ExternalLink, Search, CheckCircle2, Circle } from "lucide-react";

interface RevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sprints: Sprint[];
  starredTasks: Record<string, boolean>;
  completedTasks: Record<string, boolean>;
  onToggleStar: (taskId: string) => void;
  onToggleTask: (taskId: string) => void;
}

export const RevisionModal: React.FC<RevisionModalProps> = ({
  isOpen,
  onClose,
  sprints,
  starredTasks,
  completedTasks,
  onToggleStar,
  onToggleTask,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const starredItems = useMemo(() => {
    const list: {
      taskId: string;
      title: string;
      time: string;
      sprintName: string;
      dayName: string;
    }[] = [];

    sprints.forEach((sprint) => {
      sprint.days.forEach((day) => {
        day.tasks.forEach((task) => {
          if (starredTasks[task.id]) {
            list.push({
              taskId: task.id,
              title: task.title,
              time: task.time,
              sprintName: sprint.name,
              dayName: day.name,
            });
          }
        });
      });
    });

    return list;
  }, [sprints, starredTasks]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return starredItems;
    const q = searchQuery.toLowerCase();
    return starredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.dayName.toLowerCase().includes(q) ||
        item.sprintName.toLowerCase().includes(q)
    );
  }, [starredItems, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-card border border-surface-border rounded-3xl w-full max-w-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Revision List</h3>
              <p className="text-xs text-slate-400">
                {starredItems.length} starred problem{starredItems.length === 1 ? "" : "s"} saved for revision
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-surface-subtle transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="py-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems by name or day..."
              className="w-full bg-surface-subtle border border-surface-border rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Problem List */}
        <div className="flex-1 overflow-y-auto divide-y divide-surface-border/40 pr-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center gap-2">
              <Star className="w-8 h-8 stroke-1 text-slate-600" />
              <p className="text-xs">
                {starredItems.length === 0
                  ? "No starred problems yet! Click the star icon next to any problem in the plan to save it for revision."
                  : "No problems match your search filter."}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isDone = !!completedTasks[item.taskId];
              const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
                "takeuforward " + item.title
              )}`;

              return (
                <div
                  key={item.taskId}
                  className="py-3 px-2 flex items-center justify-between gap-3 hover:bg-surface-subtle/50 rounded-xl transition"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => onToggleTask(item.taskId)}
                      className="text-slate-500 hover:text-brand-400 shrink-0"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <a
                        href={searchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-semibold hover:text-brand-400 hover:underline block truncate ${
                          isDone
                            ? "line-through text-slate-500"
                            : "text-slate-200"
                        }`}
                      >
                        {item.title}
                      </a>
                      <span className="text-[11px] text-slate-500 block truncate">
                        {item.sprintName.split("-")[0].trim()} · {item.dayName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.time || "15m"}
                    </span>

                    <button
                      type="button"
                      onClick={() => onToggleStar(item.taskId)}
                      title="Remove from revision"
                      className="p-1 text-amber-400 hover:text-slate-500 rounded transition"
                    >
                      <Star className="w-4 h-4 fill-amber-400" />
                    </button>

                    <a
                      href={searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-slate-500 hover:text-slate-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-surface-border/60 pt-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-surface-subtle hover:bg-surface-border text-slate-300 rounded-xl text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
