"use client";

import React, { useRef, useState } from "react";
import { AppState } from "@/lib/types";
import { parseDateString, formatDateInputValue, formatDateDisplay } from "@/lib/dateUtils";
import {
  CalendarDays,
  Calendar,
  SquarePen,
  SlidersHorizontal,
  Bell,
  Download,
  Upload,
  Check,
  X,
  RotateCcw,
} from "lucide-react";

interface HeaderProps {
  state: AppState;
  planTitle?: string;
  startDateStr?: string;
  onOpenAdjustPlan: () => void;
  onOpenEmailModal: () => void;
  onImportState: (newState: AppState) => void;
  onResetAll?: () => void;
  onUpdateStartDate?: (newStartDateStr: string) => void;
  onRenamePlan?: (newTitle: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  planTitle = "rereckoning",
  startDateStr = "25 Sep 2026",
  onOpenAdjustPlan,
  onOpenEmailModal,
  onImportState,
  onResetAll,
  onUpdateStartDate,
  onRenamePlan,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [tempTitle, setTempTitle] = useState<string>(planTitle);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return formatDateInputValue(parseDateString(startDateStr));
  });

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

  const handleSaveDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    const dateObj = new Date(selectedDate + "T00:00:00");
    const formatted = formatDateDisplay(dateObj);
    if (onUpdateStartDate) {
      onUpdateStartDate(formatted);
    }
    setIsEditingDate(false);
  };

  const handleSaveTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempTitle.trim()) return;
    if (onRenamePlan) {
      onRenamePlan(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="border-b border-surface-border bg-surface-card/90 backdrop-blur sticky top-0 z-40 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: TakeUforward Breadcrumb & Title */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-slate-500 font-medium">
            Planly / <span className="text-white font-semibold">{planTitle}</span>
          </p>

          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <form onSubmit={handleSaveTitle} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className="bg-surface-subtle border border-brand-500 rounded-lg px-2 py-0.5 text-lg font-bold text-white focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <>
                <h1 className="text-2xl font-black text-white tracking-tight leading-none">
                  {planTitle}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setTempTitle(planTitle);
                    setIsEditingTitle(true);
                  }}
                  title="Rename plan"
                  className="p-1 text-slate-500 hover:text-white rounded-lg transition"
                >
                  <SquarePen className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
            {isEditingDate ? (
              <form onSubmit={handleSaveDate} className="flex items-center gap-1.5">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-surface-subtle border border-brand-500 rounded-lg px-2 py-0.5 text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md"
                  title="Save Date"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingDate(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-md"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSelectedDate(formatDateInputValue(parseDateString(startDateStr)));
                  setIsEditingDate(true);
                }}
                className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-surface-subtle hover:bg-surface-border border border-surface-border text-slate-300 transition"
              >
                <CalendarDays className="w-3.5 h-3.5 text-brand-400" />
                <span>Edit start date</span>
              </button>
            )}

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              Upcoming
            </span>

            <span className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Scheduled: <strong className="text-slate-200">{startDateStr}</strong></span>
            </span>
          </div>
        </div>

        {/* Right: Actions (Adjust plan, Email Reminders, Backup) */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Authentic TakeUforward "Adjust plan" button */}
          <button
            type="button"
            onClick={onOpenAdjustPlan}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-surface-subtle hover:bg-surface-border border border-surface-border text-slate-100 text-xs font-bold transition shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-400" />
            <span>Adjust plan</span>
          </button>

          {/* Email Reminders Button */}
          <button
            type="button"
            onClick={onOpenEmailModal}
            className={`flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold transition border shadow-sm ${
              state.remindersActive
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                : "bg-brand-600/15 text-brand-400 border-brand-500/30 hover:bg-brand-600/25"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {state.remindersActive ? "Reminders: Active" : "Reminders"}
            </span>
          </button>

          {/* Reset All Progress Button */}
          {onResetAll && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("⚠️ Reset everything?\n\nThis will clear all completed tasks, timer history, and reset your plan to start fresh from 25 Sep 2026.")) {
                  onResetAll();
                }
              }}
              title="Reset all progress and start fresh from 25 Sep 2026"
              className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}

          {/* Backup Export / Import */}
          <div className="flex items-center gap-1 border-l border-surface-border/60 pl-2">
            <button
              onClick={handleExport}
              title="Export Progress JSON"
              className="p-2 bg-surface-subtle hover:bg-surface-border text-slate-300 hover:text-white rounded-xl border border-surface-border transition"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Restore Progress JSON"
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
