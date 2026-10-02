"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  FileText,
  RefreshCw,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import PageTransition from "@/components/ui/PageTransition";
import { useProfile } from "@/hooks/useProfile";
import { apiFetch } from "@/lib/api";

interface EmployeeOverview {
  attendancePercent: number;
  approvedLeaveDays: number;
  openRequests: number;
  totalRequests: number;
}

interface EmployeeRequest {
  status: string;
}

export default function EmployeePage() {
  const { profile, loading: profileLoading } = useProfile();
  const [overview, setOverview] = useState<EmployeeOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOverview = useCallback(async () => {
    if (!profile) return;

    setLoading(true);
    setError("");

    try {
      const [attendance, leave, requestData] = await Promise.all([
        apiFetch<{ summary: { attendance_percentage: number } }>(
          "/api/attendance/me/summary",
        ),
        apiFetch<{ summary: { approved_leave_days: number } }>(
          "/api/leaves/me/summary",
        ),
        apiFetch<{ requests: EmployeeRequest[] }>("/api/hr-requests/me"),
      ]);

      const requests = requestData.requests || [];
      setOverview({
        attendancePercent: attendance.summary.attendance_percentage ?? 0,
        approvedLeaveDays: leave.summary.approved_leave_days ?? 0,
        openRequests: requests.filter(
          (request) =>
            request.status === "open" || request.status === "in_progress",
        ).length,
        totalRequests: requests.length,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load employee overview.",
      );
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (profileLoading) return;
    if (!profile) {
      setLoading(false);
      setError("Sign in to view your employee overview.");
      return;
    }
    void loadOverview();
  }, [loadOverview, profile, profileLoading]);

  const greetingName = profile?.full_name?.trim().split(/\s+/)[0] || "there";

  const metrics = [
    {
      label: "Attendance",
      value: `${(overview?.attendancePercent ?? 0).toFixed(1)}%`,
      detail: "Current attendance rate",
      icon: CalendarDays,
      href: "/attendance",
    },
    {
      label: "Approved leave",
      value: `${overview?.approvedLeaveDays ?? 0}`,
      detail: "Days approved",
      icon: CalendarDays,
      href: "/leave",
    },
    {
      label: "Open requests",
      value: `${overview?.openRequests ?? 0}`,
      detail: `${overview?.totalRequests ?? 0} total submitted`,
      icon: FileText,
      href: "/requests",
    },
  ];

  return (
    <AppShell>
      <PageTransition>
        <main className="mx-auto min-h-[calc(100vh-116px)] max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10">
          <header className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Employee workspace
            </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Welcome, {greetingName}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Your attendance, leave, and HR activity at a glance.
              {profile?.designation ? ` ${profile.designation}.` : ""}
            </p>
          </header>

          {profileLoading || loading ? (
            <div className="grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-44 animate-pulse rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]"
                />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col gap-4 rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
                  <p role="alert" className="text-sm text-red-600 dark:text-red-200">{error}</p>
              {profile && (
                <button
                  type="button"
                  onClick={() => void loadOverview()}
                  className="inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                >
                  <RefreshCw size={15} />
                  Try again
                </button>
              )}
            </div>
          ) : (
            <>
              <section className="grid gap-5 md:grid-cols-3">
                {metrics.map(({ label, value, detail, icon: Icon, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="group min-h-44 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--foreground)] shadow-[0_8px_30px_rgba(0,0,0,0.13)] backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-[var(--surface-solid)]"
                  >
                    <div className="flex items-start justify-between">
                        <span className="text-sm font-semibold text-[var(--muted)]">{label}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--accent)]">
                        <Icon size={17} />
                      </span>
                    </div>
                    <p className="mt-5 text-4xl font-bold tracking-tight">{value}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-xs text-[var(--muted)]">{detail}</span>
                      <ArrowUpRight size={15} className="text-[var(--muted)] transition group-hover:text-[var(--foreground)]" />
                    </div>
                  </Link>
                ))}
              </section>

              <section className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 text-[var(--foreground)] shadow-lg backdrop-blur-2xl sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                    HR365 workspace
                  </p>
                    <h2 className="mt-3 text-2xl font-bold">What do you need today?</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
                    Ask a question about policies or get help navigating your HR services.
                  </p>
                  <Link
                    href="/assistant"
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    <Bot size={16} />
                    Open AI Assistant
                    <ArrowUpRight size={15} />
                  </Link>
                </div>

                <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 text-[var(--foreground)] shadow-lg backdrop-blur-2xl sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Quick access
                  </p>
                  <div className="mt-4 divide-y divide-[var(--border)]">
                    {[
                      { title: "Attendance history", href: "/attendance" },
                      { title: "Leave requests", href: "/leave" },
                      { title: "Contact HR", href: "/requests" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex min-h-12 items-center justify-between gap-3 text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--accent)]"
                      >
                        {item.title}
                        <ArrowUpRight size={15} className="text-[var(--muted)]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </PageTransition>
    </AppShell>
  );
}