import { Link, useLocation } from "wouter";
import {
  Home,
  Users,
  Boxes,
  GitMerge,
  ListChecks,
  Sparkles,
  BarChart3,
  ShieldCheck,
  LayoutGrid,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof Home };

const SECTIONS: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Adoption",
    items: [
      { to: "/", label: "Home", icon: Home },
      { to: "/teams", label: "Teams", icon: Users },
      { to: "/tools", label: "Tool portfolio", icon: Boxes },
      { to: "/pipeline", label: "Enablement pipeline", icon: GitMerge },
    ],
  },
  {
    title: "Operations",
    items: [
      { to: "/interactions", label: "Interactions", icon: ListChecks },
      { to: "/insights", label: "AI insights", icon: Sparkles },
      { to: "/dashboards", label: "Dashboards", icon: BarChart3 },
    ],
  },
  {
    title: "System",
    items: [
      { to: "/governance", label: "Governance & trust", icon: ShieldCheck },
      { to: "/design-system", label: "Design system", icon: LayoutGrid },
    ],
  },
];

function isActive(current: string, to: string): boolean {
  if (to === "/") return current === "/" || current === "";
  return current === to || current.startsWith(to + "/");
}

function SidebarInner({
  dark,
  onToggleDark,
  onNavigate,
  showClose,
  onClose,
}: {
  dark: boolean;
  onToggleDark: () => void;
  onNavigate?: () => void;
  showClose?: boolean;
  onClose?: () => void;
}) {
  const [location] = useLocation();
  return (
    <>
      <div className="flex items-center justify-between px-6 pt-7 pb-6">
        <Link
          to="/"
          onClick={onNavigate}
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-7 w-7 items-center justify-center bg-foreground text-background">
            <span className="font-serif text-sm leading-none">Æ</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[12.5px] font-medium tracking-tight">Adoption CRM</span>
            <span className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
              for AI enablement
            </span>
          </div>
        </Link>
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {section.title}
            </div>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active = isActive(location, item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-sm px-3 py-2 text-[13.5px] transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-colors",
                          active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/80",
                        )}
                      />
                      <span className="tracking-tight">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Workspace
            </div>
            <div className="text-[13px] font-medium tracking-tight">Field & Foundry</div>
          </div>
          <button
            type="button"
            onClick={onToggleDark}
            className="inline-flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </>
  );
}

export function AppSidebar({
  dark,
  onToggleDark,
}: {
  dark: boolean;
  onToggleDark: () => void;
}) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[256px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <SidebarInner dark={dark} onToggleDark={onToggleDark} />
    </aside>
  );
}

export function MobileSidebar({
  open,
  onClose,
  dark,
  onToggleDark,
}: {
  open: boolean;
  onClose: () => void;
  dark: boolean;
  onToggleDark: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-full w-[280px] max-w-[85vw] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
          >
            <SidebarInner
              dark={dark}
              onToggleDark={onToggleDark}
              onNavigate={onClose}
              showClose
              onClose={onClose}
            />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
