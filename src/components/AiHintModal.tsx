"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, ExternalLink, Copy, Check } from "lucide-react";

interface AiHintModalProps {
  isOpen: boolean;
  onClose: () => void;
  problemTitle: string;
  sprintName?: string;
  geminiApiKey?: string;
}

export const AiHintModal: React.FC<AiHintModalProps> = ({
  isOpen,
  onClose,
  problemTitle,
  sprintName,
  geminiApiKey,
}) => {
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const cleanTitle = problemTitle.replace(/^🔄\s*/, "").trim();
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    "takeuforward " + cleanTitle
  )}`;

  useEffect(() => {
    if (!isOpen || !cleanTitle) return;

    let isMounted = true;
    setLoading(true);
    setError(null);
    setHint(null);

    const fetchHint = async () => {
      try {
        const res = await fetch("/api/ai/hint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            problemTitle: cleanTitle,
            sprintName,
            apiKey: geminiApiKey,
          }),
        });

        const data = await res.json();
        if (!isMounted) return;

        if (data.error) {
          setError(data.error);
        } else {
          setHint(data.hint);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Failed to load hint";
        setError(msg);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHint();

    return () => {
      isMounted = false;
    };
  }, [isOpen, cleanTitle, sprintName, geminiApiKey]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!hint) return;
    navigator.clipboard.writeText(hint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-card border border-surface-border rounded-3xl w-full max-w-xl p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4 max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-surface-border/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Gemini 3.6 Flash Mentor
              </span>
              <h3 className="font-bold text-base text-white truncate max-w-md">
                {cleanTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-surface-subtle transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1">
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold tracking-wide text-purple-300">
                Generating approach intuition & complexity target...
              </span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-950/30 border border-red-500/30 rounded-2xl text-xs text-red-300 flex flex-col gap-2">
              <span className="font-bold text-red-400">Unable to generate hint:</span>
              <span>{error}</span>
            </div>
          )}

          {hint && !loading && (
            <div className="space-y-4 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap bg-surface-subtle/70 border border-surface-border p-4 rounded-2xl">
              {hint}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between">
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Search Problem / Solution</span>
          </a>

          <div className="flex items-center gap-2">
            {hint && (
              <button
                type="button"
                onClick={handleCopy}
                className="py-1.5 px-3 bg-surface-subtle hover:bg-surface-border text-slate-300 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-surface-border"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Hint"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-purple-600/20"
            >
              Got it
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
