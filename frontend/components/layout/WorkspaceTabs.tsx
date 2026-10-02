"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Attendance", href: "/attendance" },
  { label: "Leave", href: "/leave" },
];

export default function WorkspaceTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Employee workspace"
      className="mb-10 inline-flex max-w-full flex-wrap items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1.5 shadow-lg backdrop-blur-2xl"
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-6 ${
              active
                ? "bg-white text-gray-900 shadow-sm"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}