import type { AttendanceRecord } from "@/types/attendance";

export default function AttendanceTable({
  records,
}: {
  records: AttendanceRecord[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="border-b border-[var(--border)] px-6 py-5">
        <p className="text-sm font-medium">Attendance history</p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Recent attendance records
        </p>
      </div>

      {!records.length ? (
        <div className="p-10 text-center text-sm text-[var(--muted)]">
          No attendance records yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-6 py-3 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  Date
                </th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="px-6 py-4 text-sm">
                    {record.date}
                  </td>

                  <td className="px-6 py-4 text-sm capitalize text-[var(--muted)]">
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
