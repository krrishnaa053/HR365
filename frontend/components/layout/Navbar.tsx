"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Sun,
  Users,
  Wallet,
} from "lucide-react";

import { useProfile } from "@/hooks/useProfile";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/lib/supabase";

const workspaceLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Attendance", href: "/attendance", icon: CalendarDays },
  { label: "Leaves", href: "/leave", icon: ClipboardList },
  { label: "Payroll", href: "/payroll", icon: Wallet },
  { label: "AI Assistant", href: "/assistant", icon: Bot },
  { label: "Requests", href: "/requests", icon: ClipboardList },
  { label: "Feedback", href: "/employee/feedback", icon: MessageSquare },
  { label: "Employees", href: "/employee", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const { profile } = useProfile();
  const { theme, toggleTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const role = profile?.role?.trim().toLowerCase();
  const links =
    role === "hr" || role === "admin"
      ? [...workspaceLinks, { label: "HR workspace", href: "/hr", icon: Users }]
      : workspaceLinks;
  const query = searchValue.trim().toLowerCase();
  const searchResults = query
    ? links.filter((link) => link.label.toLowerCase().includes(query))
    : links;
  const initials =
    profile?.full_name
      ?.split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  function isActive(href: string) {
    if (pathname === href) {
      return true;
    }
    // Prevent shorter parent route from matching when a more specific sibling route is active
    const hasMoreSpecificLink = links.some(
      (link) =>
        link.href !== href &&
        link.href.startsWith(`${href}/`) &&
        (pathname === link.href || pathname.startsWith(`${link.href}/`)),
    );
    if (hasMoreSpecificLink) {
      return false;
    }
    return pathname.startsWith(`${href}/`);
  }

  function closePanels() {
    setSearchOpen(false);
    setSettingsOpen(false);
    setProfileOpen(false);
  }

  async function signOut() {
    setSigningOut(true);
    try {
      await supabase.auth.signOut();
    } finally {
      window.location.assign("/login");
    }
  }

  function linkClass(href: string) {
    const active = isActive(href);
    return `flex min-h-10 shrink-0 items-center justify-center rounded-full border px-3.5 text-xs font-medium backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 xl:px-3 ${
      active
        ? "border-[var(--nav-active-border)] bg-[var(--nav-active-bg)] text-[var(--nav-active-text)] shadow-[var(--nav-active-glow)] font-semibold"
        : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
    }`;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[76px] border-b border-[var(--header-border)] bg-[var(--header-bg)] text-[var(--header-text)] shadow-lg backdrop-blur-xl md:h-[156px] xl:h-[76px] transition-colors">
      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-lg font-bold text-[var(--foreground)] shadow-sm backdrop-blur-xl sm:px-5 hover:bg-[var(--surface-hover)] transition"
        >
          HR365
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 flex-1 items-center justify-center gap-1.5 xl:flex"
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={linkClass(href)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative">
            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Search HR365"}
              title="Search HR365"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((open) => !open);
                setSettingsOpen(false);
                setProfileOpen(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]"
            >
              <Search size={19} />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-[min(340px,calc(100vw-32px))] rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-3 text-[var(--foreground)] shadow-2xl backdrop-blur-2xl">
                <label htmlFor="workspace-search" className="sr-only">
                  Search workspace pages
                </label>
                <input
                  id="workspace-search"
                  autoFocus
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search workspace pages..."
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <div className="mt-2 max-h-64 overflow-y-auto">
                  {searchResults.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => {
                        setSearchValue("");
                        closePanels();
                      }}
                      className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                    >
                      <Icon size={16} />
                      {label}
                    </Link>
                  ))}
                  {searchResults.length === 0 && (
                    <p className="px-3 py-4 text-sm text-[var(--muted)]">
                      No matching pages
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Direct Light/Dark Mode Toggle */}
          <button
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] active:scale-95"
          >
            {theme === "dark" ? (
              <Sun size={19} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon size={19} className="text-indigo-500 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Appearance & Preferences Settings */}
          <div className="relative">
            <button
              type="button"
              aria-label="Settings"
              title="Appearance & Settings"
              aria-expanded={settingsOpen}
              onClick={() => {
                setSettingsOpen((open) => !open);
                setSearchOpen(false);
                setProfileOpen(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]"
            >
              <Settings size={19} />
            </button>
            {settingsOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-3.5 text-[var(--foreground)] shadow-2xl backdrop-blur-2xl">
                <p className="px-1 pb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Color Mode
                </p>
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-[var(--surface-hover)] p-1 border border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition ${
                      theme === "light"
                        ? "bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/40 shadow-sm"
                        : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <Sun size={14} className={theme === "light" ? "text-amber-500" : ""} />
                    Light
                    {theme === "light" && <Check size={12} className="ml-0.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition ${
                      theme === "dark"
                        ? "bg-[#91a994]/25 text-[#e6f4e8] border border-[#91a994]/50 shadow-sm"
                        : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <Moon size={14} className={theme === "dark" ? "text-indigo-300" : ""} />
                    Dark
                    {theme === "dark" && <Check size={12} className="ml-0.5" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill (Clean, aligned, contained) */}
          <div className="relative">
            <button
              type="button"
              aria-label={`Account ${initials}`}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              onClick={() => {
                setProfileOpen((open) => !open);
                setSearchOpen(false);
                setSettingsOpen(false);
              }}
              className="flex h-11 items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 text-[var(--foreground)] shadow-sm backdrop-blur-xl transition hover:bg-[var(--surface-hover)]"
            >
              <span className="hidden max-w-[120px] truncate text-sm font-semibold sm:block">
                {profile?.full_name || "Account"}
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 text-xs font-bold text-[var(--accent)] shadow-sm">
                {initials}
              </span>
              <ChevronDown
                size={14}
                className={`text-[var(--muted)] transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-64 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-2 text-[var(--foreground)] shadow-2xl backdrop-blur-2xl">
                <div className="border-b border-[var(--border)] px-3 py-3">
                  <p className="truncate text-sm font-semibold">
                    {profile?.full_name || "HR365 user"}
                  </p>
                  <p className="mt-1 truncate text-xs text-[var(--muted)]">
                    {profile?.email || ""}
                  </p>
                </div>

                {/* Quick Theme Toggle Option in Profile menu */}
                <div className="border-b border-[var(--border)] p-1.5">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                  >
                    <span className="flex items-center gap-2">
                      {theme === "dark" ? (
                        <Sun size={14} className="text-amber-400" />
                      ) : (
                        <Moon size={14} className="text-indigo-600" />
                      )}
                      Theme
                    </span>
                    <span className="capitalize font-semibold text-[var(--foreground)]">
                      {theme} mode
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  role="menuitem"
                  disabled={signingOut}
                  onClick={() => void signOut()}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-hover)] disabled:opacity-50"
                >
                  <LogOut size={15} className="text-[var(--muted)]" />
                  {signingOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm backdrop-blur-xl transition hover:bg-[var(--surface-hover)] md:hidden"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>

      <nav
        aria-label="Main navigation"
        className="hidden h-[80px] items-center justify-center border-t border-[var(--border)] px-3 py-2 md:grid md:grid-cols-5 xl:hidden"
      >
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className={linkClass(href)}
          >
            {label}
          </Link>
        ))}
      </nav>

      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full border-b border-[var(--border)] bg-[var(--surface-solid)] p-3 shadow-xl backdrop-blur-2xl md:hidden"
        >
          {/* Mobile Theme Switcher Bar */}
          <div className="mb-3 flex items-center justify-between rounded-xl bg-[var(--surface-hover)] p-2 border border-[var(--border)]">
            <span className="text-xs text-[var(--muted)] font-medium">Appearance</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                  theme === "light"
                    ? "bg-sky-500/25 text-sky-100 border border-sky-400/50 shadow-sm"
                    : "text-[var(--muted)] hover:bg-[var(--surface)]"
                }`}
              >
                <Sun size={12} className="text-amber-400" /> Light
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                  theme === "dark"
                    ? "bg-[#91a994]/25 text-[#e6f4e8] border border-[#91a994]/50 shadow-sm"
                    : "text-[var(--muted)] hover:bg-[var(--surface)]"
                }`}
              >
                <Moon size={12} className="text-indigo-300" /> Dark
              </button>
            </div>
          </div>

          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-1 sm:grid-cols-3">
            {links.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
                className={`flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium transition ${
                  isActive(href)
                    ? "border border-[var(--nav-active-border)] bg-[var(--nav-active-bg)] text-[var(--nav-active-text)] font-semibold shadow-sm"
                    : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}