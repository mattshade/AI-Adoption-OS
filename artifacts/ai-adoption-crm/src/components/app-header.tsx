import { Link, useLocation } from "wouter";
import { ChevronRight, Menu, Search } from "lucide-react";

const TITLES: Record<string, string> = {
  "/": "Home",
  "/teams": "Teams",
  "/tools": "Tool portfolio",
  "/pipeline": "Enablement pipeline",
  "/interactions": "Interactions",
  "/insights": "AI insights",
  "/dashboards": "Dashboards",
  "/governance": "Governance & trust",
  "/design-system": "Design system",
};

export function AppHeader({ onOpenNav }: { onOpenNav?: () => void }) {
  const [location] = useLocation();
  let label = TITLES[location];
  if (!label) {
    if (location.startsWith("/teams/")) label = "Team record";
    else label = "Page";
  }
  return (
    <header className="sticky top-0 z-20 -mx-5 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 sm:py-4 md:-mx-12 md:px-12">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenNav}
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
        <a href="./" className="flex items-center gap-2 lg:hidden">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-foreground text-background">
            <span className="font-serif text-sm leading-none">Æ</span>
          </div>
          <span className="text-[12.5px] font-medium tracking-tight">Adoption CRM</span>
        </a>
        <div className="hidden min-w-0 items-center gap-2 text-[12px] text-muted-foreground lg:flex">
          <span className="uppercase tracking-[0.18em]">Adoption CRM</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate tracking-tight text-foreground">{label}</span>
        </div>
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <Link
          to="/teams"
          className="flex h-8 items-center gap-2 border border-border bg-background px-3 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-[12px] tracking-tight">Search teams, tools, insights</span>
          <span className="ml-2 hidden border border-border px-1.5 py-px font-mono text-[10px] uppercase tracking-wider md:inline">⌘K</span>
        </Link>
      </div>
    </header>
  );
}
