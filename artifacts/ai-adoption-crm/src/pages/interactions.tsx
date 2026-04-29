import { useMemo, useState } from "react";
import { Link } from "wouter";
import { SectionHeader } from "@/components/section-header";
import { INTERACTIONS, TEAMS, type Interaction } from "@/data/seed";
import { cn } from "@/lib/utils";

const TYPES: Array<Interaction["type"] | "All"> = [
  "All",
  "Office hours",
  "Workshop",
  "Tool onboarding",
  "Security review",
  "Prototype review",
  "Leadership update",
  "Follow-up needed",
];

export default function InteractionsPage() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const teamMap = useMemo(() => Object.fromEntries(TEAMS.map((t) => [t.id, t])), []);

  const sorted = useMemo(() => {
    return [...INTERACTIONS]
      .filter((i) => type === "All" || i.type === type)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [type]);

  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow={`${INTERACTIONS.length} interactions logged`}
        title="Interactions"
        description="A timeline of every meaningful conversation between the AI program and the rest of the company. Read it like a journal."
        size="xl"
      />

      <div className="flex flex-wrap items-center gap-2 border-y border-border py-5">
        <div className="mr-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Filter by type
        </div>
        {TYPES.map((t) => {
          const active = t === type;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={cn(
                "border px-2.5 py-1 text-[11.5px] tracking-tight transition-colors",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground/75 hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>

      <ol className="relative ml-4 border-l border-border md:ml-6">
        {sorted.map((i) => {
          const team = teamMap[i.teamId];
          return (
            <li key={i.id} className="relative pl-8 pb-12 last:pb-0 md:pl-12">
              <span
                aria-hidden
                className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-foreground"
              />
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                    {i.date}
                  </div>
                  <div className="mt-1 font-serif text-base text-foreground">{i.type}</div>
                  <div className="mt-1 text-[12px] text-muted-foreground">{i.owner}</div>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <Link
                    to={`/teams/${i.teamId}`}
                    className="inline-block text-[10.5px] uppercase tracking-[0.18em] text-[hsl(158_32%_28%)] hover:underline dark:text-[hsl(158_32%_70%)]"
                  >
                    {team?.name ?? "—"}
                  </Link>
                  <p className="mt-1 font-serif text-xl leading-snug text-foreground md:text-2xl">
                    {i.summary}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    <span className="text-foreground/80">Outcome.</span> {i.outcome}
                  </p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    <span className="text-foreground/80">Next.</span> {i.nextStep}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
