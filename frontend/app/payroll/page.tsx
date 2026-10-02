import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  CircleDollarSign,
  FileText,
  Wallet,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import PageTransition from "@/components/ui/PageTransition";

export default function PayrollPage() {
  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto flex min-h-[calc(100vh-116px)] max-w-[1400px] flex-col px-5 py-8 sm:px-8 lg:px-10">
          <header className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Employee workspace
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Salary &amp; Payroll
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Review payslips and payroll information when your organization connects its payroll records.
            </p>
          </header>

          <div className="grid flex-1 gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <section className="flex flex-col justify-between rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 text-[var(--foreground)] shadow-[0_8px_30px_rgba(0,0,0,0.16)] backdrop-blur-2xl sm:p-9">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--accent)]">
                  <Wallet size={22} />
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Payroll records
                </p>
                <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Payroll isn&apos;t connected yet
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
                  HR365 does not have a payroll data source configured, so no salary figures or payslips are available here yet.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/requests"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Contact HR about payroll
                  <ArrowUpRight size={15} />
                </Link>
                <Link
                  href="/assistant"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-5 text-sm font-semibold text-[var(--foreground)] transition hover:brightness-110"
                >
                  <Bot size={16} />
                  Ask HR365
                </Link>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 text-[var(--foreground)] shadow-lg backdrop-blur-2xl sm:p-9">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[var(--accent)]">
                  <FileText size={19} />
                </span>
                <div>
                  <h2 className="text-base font-semibold">What will appear here</h2>
                  <p className="mt-1 text-xs text-[var(--muted)]">When payroll is connected</p>
                </div>
              </div>

              <ul className="mt-8 space-y-5">
                {[
                  "Recent pay statements",
                  "Pay period and payment status",
                  "Year-to-date earnings and deductions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--foreground)]">
                    <CircleDollarSign size={17} className="mt-1 shrink-0 text-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
}