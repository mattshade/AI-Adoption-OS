import { useEffect, useState, type ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

const STORAGE_KEY = "adoption-crm:theme:v2";

export function AppLayout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return stored === "dark";
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground antialiased">
      <AppSidebar dark={dark} onToggleDark={() => setDark((d) => !d)} />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1400px] px-8 md:px-12">
          <AppHeader />
          <div className="py-10 md:py-14">{children}</div>
          <footer className="border-t border-border py-10 text-[12px] text-muted-foreground">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="uppercase tracking-[0.16em]">Adoption CRM · Concept</div>
              <div>Designed as a portfolio piece. All data is illustrative.</div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
