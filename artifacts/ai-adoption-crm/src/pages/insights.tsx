import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { EditorialQuote } from "@/components/editorial-quote";
import { INSIGHTS, type Insight } from "@/data/seed";
import { cn } from "@/lib/utils";

const CATEGORIES: Array<Insight["category"] | "All"> = [
  "All",
  "Executive",
  "Risk",
  "Action",
  "Anomaly",
  "Consolidation",
  "Enablement",
];

export default function InsightsPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (cat === "All" ? INSIGHTS : INSIGHTS.filter((i) => i.category === cat)),
    [cat],
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow={`${INSIGHTS.length} insights · refreshed weekly`}
        title="AI insights"
        description="Patterns the data is telling us — written for an executive audience, structured for an enablement team."
        size="xl"
      />

      <div className="flex flex-wrap items-center gap-2 border-y border-border py-5">
        <div className="mr-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Filter
        </div>
        {CATEGORIES.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "border px-2.5 py-1 text-[11.5px] tracking-tight transition-colors",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground/75 hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      {featured && (
        <article className="grid grid-cols-1 gap-10 border-y border-border py-10 md:grid-cols-3 md:py-14">
          <div className="md:col-span-1">
            <div className="text-[10.5px] uppercase tracking-[0.2em] text-[hsl(158_32%_28%)] dark:text-[hsl(158_32%_70%)]">
              {featured.category} · Editor's pick
            </div>
            <div className="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              The one to act on this week
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
              {featured.title}
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {featured.body}
            </p>
          </div>
        </article>
      )}

      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
        {rest.map((ins) => (
          <article key={ins.id} className="flex flex-col bg-background p-7 md:p-8">
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(158_32%_28%)] dark:text-[hsl(158_32%_70%)]">
              {ins.category}
            </div>
            <h3 className="mt-3 font-serif text-[20px] leading-snug tracking-tight text-foreground">
              {ins.title}
            </h3>
            <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
              {ins.body}
            </p>
          </article>
        ))}
      </div>

      <EditorialQuote eyebrow="Method" attribution="— Editorial standard">
        Insights are written, not generated. Every line is reviewed by a human before it
        is shown to a leader.
      </EditorialQuote>
    </div>
  );
}
