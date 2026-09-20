"use client";

import React, { useRef } from "react";
import { AppState } from "@/lib/types";
import { formatHoursMinutes } from "@/lib/store";
import { Bell, Download, Upload, Zap } from "lucide-react";

interface HeaderProps {
  state: AppState;
  totalTasks: number;
  completedTasksCount: number;
  totalSecondsStudied: number;
  onOpenEmailModal: () => void;
  onImportState: (newState: AppState) => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  totalTasks,
  completedTasksCount,
  totalSecondsStudied,
  onOpenEmailModal,
  onImportState,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const progressPct = totalTasks
    ? Math.round((completedTasksCount / totalTasks) * 100)
    : 0;

  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute(
      "download",
      `planly_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onImportState(parsed);
        alert("✅ Progress successfully imported!");
      } catch (err) {
        console.error("Import error:", err);
        alert("❌ Invalid backup file format!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="border-b border-surface-border bg-surface-card/85 backdrop-blur sticky top-0 z-40 px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 flex items-center justify-center font-black text-white shadow-lg shadow-brand-500/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg leading-none tracking-tight text-white">
                Planly Tracker
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 font-semibold">
                rereckoning
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              50 Days · 8 Sprints · 905 Problems
            </p>
          </div>
        </div>

        {/* Global Progress & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          
          {/* Progress Circular Badge */}
          <div className="bg-surface-subtle border border-surface-border rounded-xl px-3 py-1.5 flex items-center gap-3">
            <div>
              <div className="text-slate-400">Total Progress</div>
              <div className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>{progressPct}%</span>
                <span className="text-xs font-normal text-slate-400">
                  ({completedTasksCount}/{totalTasks})
                </span>
              </div>
            </div>
            <div className="w-9 h-9 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-border"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand-500 transition-all duration-500"
                  strokeDasharray={`${progressPct}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>

          {/* Total Studied Time */}
          <div className="bg-surface-subtle border border-surface-border rounded-xl px-3 py-1.5 hidden sm:block">
            <div className="text-slate-400">Total Studied</div>
            <div className="font-bold text-sm text-emerald-400">
              {formatHoursMinutes(totalSecondsStudied)}
            </div>
          </div>

          {/* Email Reminders Button */}
          <button
            onClick={onOpenEmailModal}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition border ${
              state.remindersActive
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                : "bg-brand-600/15 text-brand-400 border-brand-500/30 hover:bg-brand-600/25"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {state.remindersActive ? "Reminders Active" : "Set Email Reminders"}
            </span>
          </button>

          {/* Backup Export / Import */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleExport}
              title="Export Backup JSON"
              className="p-2 bg-surface-subtle hover:bg-surface-border text-slate-300 hover:text-white rounded-xl border border-surface-border transition"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Restore Backup JSON"
              className="p-2 bg-surface-subtle hover:bg-surface-border text-slate-300 hover:text-white rounded-xl border border-surface-border transition"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </div>

        </div>
      </div>
    </header>
  );
};
