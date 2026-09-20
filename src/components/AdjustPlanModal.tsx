"use client";

import React, { useState, useMemo } from "react";
import { calculateCompletionDate } from "@/lib/dateUtils";
import {
  X,
  Sparkles,
  Sliders,
  RotateCcw,
  Check,
  Brain,
  CalendarPlus,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";

interface AdjustPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTotalDays: number;
  startDateStr: string;
  detectedMissedDays: number;
  onExtendDuration: (missedDaysToAdd: number) => void;
  onRippleCascade?: (maxTasksPerDay: number) => void;
  onApply65DaySchedule: () => void;
  onResetToDefault: () => void;
  onSaveGeminiKey: (key: string) => void;
  savedGeminiKey: string;
  activeSprintName?: string;
  activeDayName?: string;
  missedTasks?: { title: string; time?: string; originDay?: string; originSprint?: string }[];
}

export const AdjustPlanModal: React.FC<AdjustPlanModalProps> = ({
  isOpen,
  onClose,
  currentTotalDays = 50,
  startDateStr = "21 Sep 2026",
  detectedMissedDays = 2,
  onExtendDuration,
  onRippleCascade,
  onApply65DaySchedule,
  onResetToDefault,
  onSaveGeminiKey,
  savedGeminiKey = "",
  activeSprintName = "Sprint 1",
  activeDayName = "Day 1",
  missedTasks = [],
}) => {
  const [apiKey, setApiKey] = useState<string>(savedGeminiKey);
  const [isApiKeySaved, setIsApiKeySaved] = useState<boolean>(!!savedGeminiKey);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [dailyCapacity, setDailyCapacity] = useState<number>(11);

  // Missed days counter state (defaults to detected or 2)
  const [missedDaysToAdd, setMissedDaysToAdd] = useState<number>(
    detectedMissedDays > 0 ? detectedMissedDays : 2
  );

  // Projected new duration & completion date
  const projectedTotalDays = currentTotalDays + missedDaysToAdd;
  const currentCompletionDate = useMemo(() => {
    return calculateCompletionDate(startDateStr, currentTotalDays);
  }, [startDateStr, currentTotalDays]);

  const projectedCompletionDate = useMemo(() => {
    return calculateCompletionDate(startDateStr, projectedTotalDays);
  }, [startDateStr, projectedTotalDays]);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    onSaveGeminiKey(apiKey.trim());
    setIsApiKeySaved(true);
    setStatusMsg("✅ Gemini API Key saved locally!");
    setTimeout(() => setStatusMsg(null), 2500);
  };

  const handleTriggerExtend = () => {
    if (missedDaysToAdd <= 0) return;
    onExtendDuration(missedDaysToAdd);
    setStatusMsg(
      `🎉 Extended! Now a ${projectedTotalDays}-day plan ending on ${projectedCompletionDate}.`
    );
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleTriggerRipple = () => {
    if (onRippleCascade) {
      onRippleCascade(dailyCapacity);
      setStatusMsg(
        `⚡ Conveyor-belt ripple applied! Daily load capped at ${dailyCapacity} tasks/day and schedule cascaded downstream.`
      );
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handleTrigger65Days = () => {
    onApply65DaySchedule();
    setStatusMsg("📅 Extended to 65 Days! Extra breathing room added for Graphs & DP.");
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleReset = () => {
    if (confirm("Reset roadmap back to original default 50-day schedule?")) {
      onResetToDefault();
      setStatusMsg("↺ Reset to original TakeUforward roadmap.");
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handleAskGemini = async () => {
    if (!apiKey.trim() && !savedGeminiKey) {
      alert("Please enter and save your Gemini API Key first.");
      return;
    }
    setIsAiLoading(true);
    setAiAdvice(null);
    try {
      const res = await fetch("/api/ai/rebalance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: apiKey.trim() || savedGeminiKey,
          missedTasks,
          activeSprintName,
          activeDayName,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert("Gemini Error: " + data.error);
      } else {
        setAiAdvice(data.recommendation);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      alert("Failed to connect to Gemini AI: " + msg);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-card border border-surface-border rounded-3xl w-full max-w-lg p-6 shadow-2xl relative overflow-hidden flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-surface-subtle transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Adjust Plan & Duration</h3>
            <p className="text-xs text-slate-400">
              Extend plan duration when you miss days or need more breathing room
            </p>
          </div>
        </div>

        {statusMsg && (
          <div className="p-3 bg-brand-600/15 border border-brand-500/30 text-brand-300 rounded-xl text-xs font-semibold">
            {statusMsg}
          </div>
        )}

        {/* 1. PRIMARY FEATURE: Missed Days & Duration Extension */}
        <div className="bg-brand-950/30 border-2 border-brand-500/40 rounded-2xl p-4 flex flex-col gap-3 shadow-lg shadow-brand-500/5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
              <CalendarPlus className="w-4 h-4" />
              <span>Missed Days & Duration Extension</span>
            </span>
            <span className="text-[11px] bg-brand-500/20 text-brand-300 font-semibold px-2 py-0.5 rounded-full border border-brand-500/30">
              Active: {currentTotalDays} Days
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Missed study days? Increase the duration so your schedule expands and shifts the estimated completion date forward, without cramming extra tasks into existing days.
          </p>

          {/* Stepper + Quick Pickers */}
          <div className="bg-surface-subtle border border-surface-border rounded-xl p-3 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Missed days to add:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMissedDaysToAdd((prev) => Math.max(1, prev - 1))}
                  className="w-7 h-7 rounded-lg bg-surface-card hover:bg-surface-border border border-surface-border text-slate-200 flex items-center justify-center transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-base text-white">
                  +{missedDaysToAdd}
                </span>
                <button
                  type="button"
                  onClick={() => setMissedDaysToAdd((prev) => prev + 1)}
                  className="w-7 h-7 rounded-lg bg-surface-card hover:bg-surface-border border border-surface-border text-slate-200 flex items-center justify-center transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Add Presets */}
            <div className="flex items-center gap-1.5 pt-1 border-t border-surface-border/50">
              <span className="text-[10px] text-slate-500 font-semibold mr-1">Presets:</span>
              {[1, 2, 3, 5, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setMissedDaysToAdd(num)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition border ${
                    missedDaysToAdd === num
                      ? "bg-brand-500/30 text-brand-300 border-brand-500/50"
                      : "bg-surface-card hover:bg-surface-border border-surface-border text-slate-400 hover:text-white"
                  }`}
                >
                  +{num}d
                </button>
              ))}
            </div>
          </div>

          {/* Before & After Comparison */}
          <div className="bg-surface-card/80 border border-surface-border rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Current Schedule</span>
              <span className="font-bold text-slate-300">{currentTotalDays} Days</span>
              <span className="text-[11px] text-slate-400">Ends: {currentCompletionDate}</span>
            </div>

            <ArrowRight className="w-4 h-4 text-brand-400" />

            <div className="flex flex-col gap-0.5 text-right">
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">Adjusted Schedule</span>
              <span className="font-black text-emerald-400 text-sm">
                {projectedTotalDays} Days Plan
              </span>
              <span className="text-[11px] font-bold text-emerald-300">
                Ends: {projectedCompletionDate}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleTriggerExtend}
            className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-brand-600/25"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Apply +{missedDaysToAdd} Missed Days (Become {projectedTotalDays}-Day Plan)</span>
          </button>
        </div>

        {/* 2. Conveyor-Belt / Ripple Cascade Rebalancer */}
        <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Conveyor-Belt Task Ripple Shifter</span>
            </span>
            <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              {missedTasks.length} Incomplete
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Completed only 5 of 12 tasks on Day 1? This moves the remaining 7 tasks into Day 2, caps Day 2 at your target load (e.g. 11 tasks / ~4.5h), and pushes the rest into Day 3, cascading downstream and naturally expanding the plan!
          </p>

          {/* Daily Capacity Selector */}
          <div className="flex items-center justify-between bg-surface-card border border-surface-border rounded-xl p-2.5 text-xs">
            <span className="text-slate-400 font-semibold">Max Daily Load:</span>
            <div className="flex items-center gap-1.5">
              {[9, 10, 11, 12, 14].map((cap) => (
                <button
                  key={cap}
                  type="button"
                  onClick={() => setDailyCapacity(cap)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition border ${
                    dailyCapacity === cap
                      ? "bg-brand-600 text-white border-brand-500"
                      : "bg-surface-subtle hover:bg-surface-border text-slate-400 border-surface-border"
                  }`}
                >
                  {cap} tasks {cap === 11 ? "(~4.5h)" : ""}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleTriggerRipple}
            className="w-full py-2 px-4 bg-surface-card hover:bg-surface-border border border-brand-500/40 text-brand-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Cascade Incomplete Tasks Downstream (Cap at {dailyCapacity}/day)</span>
          </button>
        </div>

        {/* 3. 65-Day Mastery Track (DP & Graphs Stretch) */}
        <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 flex flex-col gap-2">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            <span>Pacing: 65-Day Mastery Track</span>
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            Stretches the roadmap to 65 days with dedicated deep-dive days for <strong>Dynamic Programming</strong> and <strong>Graphs</strong>, reducing daily study to a healthy ~3.5h.
          </p>
          <button
            type="button"
            onClick={handleTrigger65Days}
            className="mt-1 py-2 px-4 bg-surface-card hover:bg-surface-border border border-amber-500/30 text-amber-400 hover:text-amber-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <span>Switch to 65-Day Pace</span>
          </button>
        </div>

        {/* 4. Google Gemini AI Integration */}
        <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 flex flex-col gap-2.5">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Google Gemini AI Integration</span>
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            Provide your Gemini API key to enable AI catch-up recommendations:
          </p>
          <form onSubmit={handleSaveKey} className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your Gemini API key..."
              className="flex-1 bg-surface-card border border-surface-border rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="py-1.5 px-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition"
            >
              Save Key
            </button>
          </form>

          {isApiKeySaved && (
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" /> Gemini AI Key active
                </span>
                <button
                  type="button"
                  onClick={handleAskGemini}
                  disabled={isAiLoading}
                  className="px-2.5 py-1 bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold transition disabled:opacity-50"
                >
                  {isAiLoading ? "Asking Gemini..." : "⚡ Ask Gemini for Catch-Up Advice"}
                </button>
              </div>

              {aiAdvice && (
                <div className="mt-2 p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-xs text-purple-200 leading-relaxed whitespace-pre-wrap">
                  <div className="font-bold text-purple-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Gemini AI Study Advice:</span>
                  </div>
                  {aiAdvice}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer: Reset Button */}
        <div className="flex items-center justify-between border-t border-surface-border/60 pt-3">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to original 50-day schedule</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-surface-subtle hover:bg-surface-border text-slate-300 rounded-xl text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
