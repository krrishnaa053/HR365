"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import PageTransition from "@/components/ui/PageTransition";

import LeaveSummary from "@/components/leave/LeaveSummary";
import LeaveTable from "@/components/leave/LeaveTable";
import LeaveForm from "@/components/leave/LeaveForm";
import LeaveSkeleton from "@/components/leave/LeaveSkeleton";
import { apiFetch } from "@/lib/api";

import {
  Leave,
  LeaveSummary as LeaveSummaryType,
} from "@/types/leave";

export default function LeavePage() {
  const [summary, setSummary] =
    useState<LeaveSummaryType | null>(null);

  const [leaves, setLeaves] =
    useState<Leave[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadLeaves() {
    try {
      setLoading(true);
      setError("");

      const [
        summaryResponse,
        leavesResponse,
      ] = await Promise.all([
        apiFetch<{
          summary: LeaveSummaryType;
        }>("/api/leaves/me/summary"),

        apiFetch<{
          records: Leave[];
        }>("/api/leaves/me"),
      ]);

      setSummary(summaryResponse.summary);
      setLeaves(leavesResponse.records || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load leave data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">

          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              Employee
            </p>

            <h1 className="mt-2 text-4xl font-medium tracking-[-0.045em]">
              Leave
            </h1>

            <p className="mt-3 text-sm text-[var(--muted)]">
              Manage your leave requests and view their status.
            </p>
          </div>

          {loading ? (
            <LeaveSkeleton />
          ) : error ? (
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
              <p role="alert" className="text-sm text-red-300">
                {error}
              </p>
              <button
                type="button"
                onClick={() => void loadLeaves()}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/[0.05]"
              >
                <RefreshCw size={15} />
                Try again
              </button>
            </div>
          ) : (
            <>
                {summary && (
                <div className="mt-10">
                    <LeaveSummary summary={summary} />
                </div>
                )}

                <div className="mt-8 grid gap-8 xl:grid-cols-[1.5fr_0.7fr]">
                <LeaveTable leaves={leaves} />
                <LeaveForm onCreated={loadLeaves} />
                </div>
            </>
          )}

        </div>
      </PageTransition>
    </AppShell>
  );
}