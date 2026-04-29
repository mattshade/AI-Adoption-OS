import { useLocation } from "wouter";
import { ChevronRight, Search } from "lucide-react";

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

export function AppHeader() {
  const [location] = useLocation();
  let label = TITLES[location];
  if (!label) {
    if (location.startsWith("/teams/")) label = "Team record";
    else label = "Page";
  }
  return (
    <header className="sticky top-0 z-20 -mx-8 flex items-center justify-between gap-6 border-b border-border bg-background/85 px-8 py-4 backdrop-blur md:-mx-12 md:px-12">
      <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
        <span className="uppercase tracking-[0.18em]">Adoption CRM</span>
        <ChevronRight className="h-3 w-3" />
        <span className="tracking-tight text-foreground">{label}</span>
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <div className="flex h-8 items-center gap-2 border border-border bg-background px-3 text-muted-foreground">
          <Search className="h-3.5 w-3.5" />
          <span className="text-[12px] tracking-tight">Search teams, tools, insights</span>
          <span className="ml-2 hidden border border-border px-1.5 py-px font-mono text-[10px] uppercase tracking-wider md:inline">⌘K</span>
        </div>
      </div>
    </header>
  );
}
