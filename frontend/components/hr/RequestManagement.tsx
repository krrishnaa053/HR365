import type { HRRequest } from "@/types/requests";

interface RequestManagementProps {
  requests: HRRequest[];
  onUpdated: () => Promise<void> | void;
  getToken: () => Promise<string | null>;
  apiBaseUrl: string;
}

export default function RequestManagement({
  requests,
}: RequestManagementProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="text-xl font-bold">HR requests</h2>

      <div className="mt-5 space-y-4">
        {!requests.length ? (
          <p className="text-sm text-[var(--muted)]">No active requests.</p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-semibold">{request.subject}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Priority: {request.priority}
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                {request.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
