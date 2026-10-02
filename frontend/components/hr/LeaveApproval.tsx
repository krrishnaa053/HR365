"use client";

import type { Leave } from "@/types/leave";

interface LeaveApprovalProps {
  leaves: Leave[];
  onUpdated: () => Promise<void> | void;
  getToken: () => Promise<string | null>;
  apiBaseUrl: string;
}

export default function LeaveApproval({
  leaves,
  onUpdated,
  getToken,
  apiBaseUrl,
}: LeaveApprovalProps) {
  async function update(id: string, status: "approved" | "rejected") {
    const token = await getToken();

    if (!token) {
      return;
    }

    await fetch(`${apiBaseUrl}/api/leaves/${id}/status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    await onUpdated();
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="text-xl font-bold">Pending leave approvals</h2>

      <div className="mt-5 space-y-5">
        {!leaves.length ? (
          <p className="text-sm text-[var(--muted)]">No pending leave requests.</p>
        ) : (
          leaves.map((leave) => (
            <div
              key={leave.id}
              className="flex flex-col gap-4 rounded-xl border border-[var(--border)] p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {leave.employee_name ?? leave.employee ?? leave.employee_id ?? "Employee"}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {leave.leave_type ?? leave.type ?? "Leave"}
                </p>
                <p className="mt-1 text-sm">
                  {(leave.start_date ?? leave.startDate) ?? "?"} ? {(leave.end_date ?? leave.endDate) ?? "?"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => update(leave.id, "approved")}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() => update(leave.id, "rejected")}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
