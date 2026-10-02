type HRStatsProps = {
  pendingLeaves: number;
  openRequests: number;
  escalatedRequests: number;
  urgentRequests: number;
};

export default function HRStats({
  pendingLeaves,
  openRequests,
  escalatedRequests,
  urgentRequests,
}: HRStatsProps) {
  const stats = [
    {
      title: "Pending Leaves",
      value: String(pendingLeaves),
    },
    {
      title: "Open Requests",
      value: String(openRequests),
    },
    {
      title: "Escalated Requests",
      value: String(escalatedRequests),
    },
    {
      title: "Urgent Requests",
      value: String(urgentRequests),
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {stats.map((item) => (
        <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted)]">{item.title}</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}
