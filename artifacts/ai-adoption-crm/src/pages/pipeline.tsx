import { Link } from "wouter";
import { SectionHeader } from "@/components/section-header";
import { RiskBadge } from "@/components/risk-badge";
import { ScoreBar } from "@/components/score-bar";
import { TEAMS, type AdoptionStage } from "@/data/seed";

const COLUMNS: AdoptionStage[] = [
  "Discovery",
  "Pilot",
  "Training scheduled",
  "Active adoption",
  "Scaled",
  "Needs support",
];

const COLUMN_DESC: Record<AdoptionStage, string> = {
  "Not started": "Awaiting kickoff.",
  "Discovery": "Listening before recommending.",
  "Pilot": "Proving the value.",
  "Training scheduled": "Booked enablement, not yet delivered.",
  "Active adoption": "Habit forming. Patterns emerging.",
  "Scaled": "Across the team. Time to mentor others.",
  "Needs support": "Stalled or escalated. Reset required.",
};

export default function PipelinePage() {
  const grouped: Record<AdoptionStage, typeof TEAMS> = {
    "Not started": [],
    "Discovery": [],
    "Pilot": [],
    "Training scheduled": [],
    "Active adoption": [],
    "Scaled": [],
    "Needs support": [],
  };
  for (const t of TEAMS) grouped[t.adoptionStage].push(t);

  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Pipeline · stage view"
        title="Enablement pipeline"
        description="The map between intent and habit. Move teams left to right by listening, training, and shipping with them."
        size="xl"
      />

      <div className="flex gap-px overflow-x-auto bg-border pb-1">
        {COLUMNS.map((col) => (
          <div
            key={col}
            className="flex w-[280px] shrink-0 flex-col gap-3 bg-background p-4"
          >
            <header className="border-b border-border pb-3">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-lg tracking-tight text-foreground">{col}</h2>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                  {String(grouped[col].length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">
                {COLUMN_DESC[col]}
              </p>
            </header>
            <ul className="flex flex-col gap-3">
              {grouped[col].map((team) => (
                <li key={team.id}>
                  <Link
                    to={`/teams/${team.id}`}
                    className="block border border-border bg-background p-3 transition-colors hover:border-foreground/40 hover:bg-secondary/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-serif text-[15px] leading-snug tracking-tight text-foreground">
                          {team.name}
                        </div>
                        <div className="mt-0.5 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                          {team.department} · {team.region}
                        </div>
                      </div>
                      <RiskBadge level={team.riskLevel} />
                    </div>
                    <div className="mt-3">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        Usage
                      </div>
                      <div className="mt-1.5 flex items-center gap-2">
                        <ScoreBar value={team.usageScore} width="w-full flex-1" />
                        <span className="font-mono text-[11px] tabular-nums text-foreground/80">
                          {team.usageScore}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 border-t border-dashed border-border pt-2 text-[11.5px] leading-snug text-muted-foreground">
                      <span className="text-foreground/80">Next.</span> {team.nextAction}
                    </div>
                  </Link>
                </li>
              ))}
              {grouped[col].length === 0 && (
                <li className="border border-dashed border-border p-3 text-[12px] text-muted-foreground">
                  No teams in this column.
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
