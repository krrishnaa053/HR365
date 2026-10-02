"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Users,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/lib/supabase";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Attendance", href: "/attendance", icon: CalendarDays },
  { label: "Leave", href: "/leave", icon: ClipboardList },
  { label: "AI Assistant", href: "/assistant", icon: Bot },
  { label: "Employees", href: "/employee", icon: Users },
  { label: "Requests", href: "/requests", icon: ClipboardList },
  { label: "Feedback", href: "/employee/feedback", icon: MessageSquare },
];

interface SidebarProps {
  collapsed: boolean;
  mobile?: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

export default function Sidebar({
  collapsed,
  mobile = false,
  onToggle,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();
  const { profile } = useProfile();
  const role = profile?.role?.trim().toLowerCase();
  const isHR = role === "hr" || role === "admin";

  async function signOut() {
    await supabase.auth.signOut();
    window.location.assign("/login");
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-screen shrink-0 flex-col border-r border-[var(--border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)] transition-[width] duration-300 ${
        mobile
          ? "w-[280px] lg:hidden"
          : `hidden lg:flex ${collapsed ? "w-[76px]" : "w-[260px]"}`
      }`}
    >
      <div
        className={`flex h-20 shrink-0 items-center ${
          collapsed && !mobile ? "justify-center" : "px-6"
        }`}
      >
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
          aria-label="HR365 dashboard"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-white text-sm font-bold">
            H
          </span>
          {(!collapsed || mobile) && (
            <span>
              <span className="block text-base font-semibold">HR365</span>
              <span className="mt-0.5 block text-[11px] text-[var(--sidebar-muted)]">
                Intelligent HR
              </span>
            </span>
          )}
        </Link>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 pt-5">
        {(!collapsed || mobile) && (
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sidebar-muted)]">
            Workspace
          </p>
        )}
        <div className="space-y-1">
          {links.map(({ label, href, icon: Icon }) => {
            const active =
              pathname === href ||
              (pathname.startsWith(`${href}/`) &&
                !links.some(
                  (l) =>
                    l.href !== href &&
                    l.href.startsWith(`${href}/`) &&
                    (pathname === l.href || pathname.startsWith(`${l.href}/`)),
                ));

            return (
              <Link
                key={href}
                href={href}
                title={collapsed && !mobile ? label : undefined}
                onClick={onNavigate}
                className={`flex h-11 items-center rounded-xl transition-colors ${
                  collapsed && !mobile ? "justify-center" : "gap-3 px-3"
                } ${
                  active
                    ? "bg-[var(--nav-active-bg)] text-[var(--nav-active-text)] border border-[var(--nav-active-border)] shadow-[var(--nav-active-glow)] font-semibold"
                    : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon size={18} strokeWidth={1.7} className="shrink-0" />
                {(!collapsed || mobile) && (
                  <span className="text-sm">{label}</span>
                )}
              </Link>
            );
          })}
        </div>

        {isHR && (
          <div className="mt-8 border-t border-white/[0.07] pt-5">
            {(!collapsed || mobile) && (
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7b8995]">
                Management
              </p>
            )}
            <Link
              href="/hr"
              onClick={onNavigate}
              title={collapsed && !mobile ? "HR Dashboard" : undefined}
              className={`flex h-11 items-center rounded-xl text-[#9aa6b0] transition-colors hover:bg-white/[0.05] hover:text-[#f4f1de] ${
                collapsed && !mobile ? "justify-center" : "gap-3 px-3"
              }`}
            >
              <Users size={18} strokeWidth={1.7} />
              {(!collapsed || mobile) && (
                <span className="text-sm">HR Dashboard</span>
              )}
            </Link>
          </div>
        )}
      </nav>

      <div className="shrink-0 border-t border-white/[0.07] p-3">
        <button
          type="button"
          onClick={() => void signOut()}
          title={collapsed && !mobile ? "Sign out" : undefined}
          className={`flex h-11 w-full items-center rounded-xl text-[#9aa6b0] transition-colors hover:bg-white/[0.05] hover:text-white ${
            collapsed && !mobile ? "justify-center" : "gap-3 px-3"
          }`}
        >
          <LogOut size={17} strokeWidth={1.7} />
          {(!collapsed || mobile) && <span className="text-sm">Sign out</span>}
        </button>
      </div>

      {!mobile && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-[72px] flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.12] bg-[#1b263b] text-[#91a0ad] shadow-sm hover:text-white"
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      )}
    </aside>
  );
}