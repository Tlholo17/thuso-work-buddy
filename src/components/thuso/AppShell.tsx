import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarCheck,
  LayoutDashboard,
  Mail,
  MessageCircleHeart,
  NotebookPen,
  Search,
  Settings,
  Menu,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RESPONSIBLE_AI_NOTICE } from "@/lib/thuso-data";
import { ChatLauncher } from "./ChatLauncher";
import logo from "@/assets/thuso-logo.png";

const NAV = [
  { to: "/", label: "Daily Brief", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Summarizer", icon: NotebookPen },
  { to: "/tasks", label: "Task Planner", icon: CalendarCheck },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/assistant", label: "Assistant", icon: MessageCircleHeart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = path === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            )}
          >
            <Icon className="size-4.5 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt="Thuso AI" className="size-10 rounded-xl" />
      <div className="leading-tight">
        <p className="font-display text-lg font-bold text-sidebar-foreground">Thuso AI</p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-sidebar-foreground/60">
          Help, in your language
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col gap-8 bg-sidebar p-6 lg:flex">
        <Brand />
        <NavList />
        <div className="mt-auto rounded-2xl bg-sidebar-accent p-4 text-xs leading-relaxed text-sidebar-foreground/80">
          <p className="font-mono text-[10px] uppercase tracking-widest text-sidebar-primary">
            Responsible AI
          </p>
          <p className="mt-2">Always review AI output before you send or decide.</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-sidebar px-4 py-3 lg:hidden">
        <Brand />
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl bg-sidebar-accent p-2.5 text-sidebar-foreground"
        >
          <Menu className="size-5" />
        </button>
      </header>
      {open && (
        <div className="sticky top-[60px] z-40 animate-rise bg-sidebar px-4 pb-4 lg:hidden">
          <NavList onNavigate={() => setOpen(false)} />
        </div>
      )}

      <main className="lg:pl-72">
        <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-40 sm:px-8 lg:pb-28">
          {children}
        </div>
        <footer className="lg:pl-0">
          <div className="mx-auto mb-24 w-full max-w-6xl px-4 sm:px-8 lg:mb-8">
            <p className="rounded-2xl bg-surface px-5 py-4 text-xs leading-relaxed text-foreground/70">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                Responsible AI notice ·{" "}
              </span>
              {RESPONSIBLE_AI_NOTICE}
            </p>
          </div>
        </footer>
      </main>

      {/* Mobile bottom tabs */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-between gap-1 bg-sidebar px-2 py-2 lg:hidden">
        {NAV.slice(0, 6).map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium",
              path === to
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70",
            )}
          >
            <Icon className="size-4.5" />
            <span className="truncate">{label.split(" ")[0]}</span>
          </Link>
        ))}
      </nav>

      <ChatLauncher />
    </div>
  );
}
