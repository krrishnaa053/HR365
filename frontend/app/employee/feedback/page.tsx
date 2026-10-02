"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Check,
  MessageSquareText,
  Send,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import PageTransition from "@/components/ui/PageTransition";
import { apiFetch } from "@/lib/api";

type Rating = "positive" | "negative";

interface FeedbackEntry {
  id: string;
  rating: Rating;
  comment?: string | null;
  answer: string;
  created_at: string;
}

export default function FeedbackPage() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<Rating | null>(null);
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadHistory() {
    setHistoryLoading(true);
    setHistoryError("");

    try {
      const response = await apiFetch<{
        feedback: FeedbackEntry[];
      }>("/api/feedback/me");
      setEntries(response.feedback || []);
    } catch (err) {
      setHistoryError(
        err instanceof Error ? err.message : "Unable to load feedback history.",
      );
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    void loadHistory();
  }, []);

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = comment.trim();

    if (!message || !rating || submitting) return;

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await apiFetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          question: "HR365 workspace feedback",
          answer: message,
          rating,
          comment: message,
        }),
      });

      setComment("");
      setRating(null);
      setSuccess("Thanks. Your feedback has been recorded.");
      await loadHistory();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to submit feedback.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-[1400px] flex-col px-5 py-8 sm:px-8 lg:px-10">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Workspace
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Feedback
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Share what is working and what needs attention.
            </p>
          </header>

          <div className="grid flex-1 gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.12)] sm:p-7">
              <div className="flex items-start gap-3 border-b border-[var(--border)] pb-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(145,169,148,0.14)] text-[var(--accent)]">
                  <MessageSquareText size={19} />
                </span>
                <div>
                  <h2 className="text-base font-semibold">Share your experience</h2>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Your note is visible to the HR team.
                  </p>
                </div>
              </div>

              <form onSubmit={submitFeedback} className="mt-6 flex h-[calc(100%-72px)] flex-col">
                <fieldset>
                  <legend className="text-sm font-medium">How was your experience?</legend>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      aria-pressed={rating === "positive"}
                      onClick={() => setRating("positive")}
                      className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
                        rating === "positive"
                          ? "border-[var(--accent)] bg-[rgba(145,169,148,0.14)] text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      <ThumbsUp size={16} />
                      Positive
                    </button>
                    <button
                      type="button"
                      aria-pressed={rating === "negative"}
                      onClick={() => setRating("negative")}
                      className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
                        rating === "negative"
                          ? "border-red-400/40 bg-red-400/[0.08] text-red-300"
                          : "border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      <ThumbsDown size={16} />
                      Needs work
                    </button>
                  </div>
                </fieldset>

                <label htmlFor="feedback-comment" className="mt-6 text-sm font-medium">
                  Your feedback
                </label>
                <textarea
                  id="feedback-comment"
                  required
                  minLength={3}
                  maxLength={2000}
                  rows={7}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Tell us what happened and what would make it better..."
                  className="mt-3 min-h-48 w-full flex-1 resize-y rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)]"
                />
                <div className="mt-2 flex justify-end text-[11px] text-[var(--muted)]">
                  {comment.length}/2000
                </div>

                {(error || success) && (
                  <p
                    role={error ? "alert" : "status"}
                    className={`mt-3 rounded-xl px-4 py-3 text-sm ${
                      error
                        ? "border border-red-400/20 bg-red-400/[0.06] text-red-300"
                        : "border border-[var(--accent)]/20 bg-[rgba(145,169,148,0.08)] text-[var(--accent)]"
                    }`}
                  >
                    {error || success}
                  </p>
                )}

                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    disabled={!comment.trim() || !rating || submitting}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-[#0d1b2a] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? "Sending..." : "Submit feedback"}
                    {submitting ? <Check size={16} /> : <Send size={15} />}
                  </button>
                </div>
              </form>
            </section>

            <section className="min-h-[360px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-5">
                <div>
                  <h2 className="text-base font-semibold">Your recent feedback</h2>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {entries.length} submission{entries.length === 1 ? "" : "s"}
                  </p>
                </div>
                <MessageSquareText size={18} className="text-[var(--muted)]" />
              </div>

              {historyLoading ? (
                <p className="py-8 text-sm text-[var(--muted)]">Loading feedback...</p>
              ) : historyError ? (
                <p role="alert" className="py-8 text-sm text-red-300">{historyError}</p>
              ) : entries.length ? (
                <ul className="divide-y divide-[var(--border)]">
                  {entries.slice(0, 5).map((entry) => (
                    <li key={entry.id} className="py-5 first:pt-5 last:pb-0">
                      <div className="flex items-center justify-between gap-3">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                          entry.rating === "positive"
                            ? "bg-[rgba(145,169,148,0.14)] text-[var(--accent)]"
                            : "bg-red-400/[0.08] text-red-300"
                        }`}>
                          {entry.rating === "positive" ? "Positive" : "Needs work"}
                        </span>
                        <time className="text-[11px] text-[var(--muted)]">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </time>
                      </div>
                      <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-[var(--foreground)]/85">
                        {entry.comment || entry.answer}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex min-h-[270px] flex-col items-center justify-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-hover)] text-[var(--muted)]">
                    <MessageSquareText size={20} />
                  </span>
                  <p className="mt-4 text-sm font-medium">Nothing here yet</p>
                  <p className="mt-1 max-w-xs text-xs leading-5 text-[var(--muted)]">
                    Your submitted feedback will appear here.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
}