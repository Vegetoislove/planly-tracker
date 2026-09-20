"use client";

import React, { useState } from "react";
import { X, Sparkles, Sliders, RotateCcw, Check, Brain } from "lucide-react";

interface AdjustPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRebalanceBacklog: () => void;
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
  onRebalanceBacklog,
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

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    onSaveGeminiKey(apiKey.trim());
    setIsApiKeySaved(true);
    setStatusMsg("✅ Gemini API Key saved locally!");
    setTimeout(() => setStatusMsg(null), 2500);
  };

  const handleTriggerRebalance = () => {
    onRebalanceBacklog();
    setStatusMsg("⚡ Roadmap auto-adjusted! Unfinished tasks redistributed across upcoming days.");
    setTimeout(() => {
      onClose();
    }, 1500);
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
            <h3 className="font-bold text-lg text-white">Adjust Plan & Rebalance</h3>
            <p className="text-xs text-slate-400">
              Adapt your roadmap when you miss a day or want to change pacing
            </p>
          </div>
        </div>

        {statusMsg && (
          <div className="p-3 bg-brand-600/15 border border-brand-500/30 text-brand-300 rounded-xl text-xs font-semibold">
            {statusMsg}
          </div>
        )}

        {/* Option 1: Auto-Rebalance Unfinished Tasks */}
        <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Catch-Up Auto Rebalancer</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Missed a day or fell behind? This redistributes any incomplete tasks from past days across upcoming sessions so your daily hours stay balanced (~4h to 4.5h).
          </p>
          <button
            type="button"
            onClick={handleTriggerRebalance}
            className="mt-1 py-2 px-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-brand-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Auto-Rebalance Roadmap Now</span>
          </button>
        </div>

        {/* Option 2: 65-Day Schedule (Extra Time for Graphs & DP) */}
        <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 flex flex-col gap-2">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            <span>Pacing: 65-Day Mastery Track</span>
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            Stretches the roadmap to 65 days with dedicated deep-dive days for <strong>Dynamic Programming</strong> and <strong>Graphs</strong>, reducing daily study to a healthy ~3.5h – 4h.
          </p>
          <button
            type="button"
            onClick={handleTrigger65Days}
            className="mt-1 py-2 px-4 bg-surface-card hover:bg-surface-border border border-amber-500/30 text-amber-400 hover:text-amber-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <span>Switch to 65-Day Pace</span>
          </button>
        </div>

        {/* Option 3: Gemini AI API Key */}
        <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 flex flex-col gap-2.5">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Google Gemini AI Integration</span>
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            Provide your Gemini API key to enable AI roadmap guidance & catch-up strategy:
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
