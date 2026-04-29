import { SectionHeader } from "@/components/section-header";
import { RecommendationBadge } from "@/components/recommendation-badge";
import { RiskBadge } from "@/components/risk-badge";
import { ScoreBar } from "@/components/score-bar";
import {
  TOOLS,
  DEV_AGENT_SCORES,
  DEV_AGENT_DIMENSIONS,
  DEV_AGENT_DIMENSION_LABELS,
} from "@/data/seed";
import { cn } from "@/lib/utils";

export default function ToolsPage() {
  return (
    <div className="flex flex-col gap-16">
      <SectionHeader
        eyebrow={`${TOOLS.length} tools in portfolio`}
        title="Tool portfolio"
        description="The shape of the AI portfolio: what's adopted, what's piloting, what should be retired. A library, not a pile."
        size="xl"
      />

      {/* Tools grid */}
      <section>
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
          {TOOLS.map((tool) => (
            <article key={tool.id} className="flex flex-col gap-5 bg-background p-7">
              <header className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                    {tool.vendor} · {tool.category}
                  </div>
                  <h3 className="mt-1 font-serif text-2xl leading-tight tracking-tight text-foreground">
                    {tool.name}
                  </h3>
                </div>
                <RecommendationBadge value={tool.recommendation} />
              </header>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
              <div className="space-y-3 border-y border-dashed border-border py-4">
                <ToolMetric label="Adoption" value={tool.adoptionLevel} />
                <ToolMetric label="Productivity impact" value={tool.productivityImpact} />
                <ToolMetric label="Trust" value={tool.trustScore} />
                <ToolMetric label="Governance maturity" value={tool.governanceMaturity} />
              </div>
              <div className="space-y-2">
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                  Primary use cases
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tool.primaryUseCases.map((u) => (
                    <span
                      key={u}
                      className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] tracking-tight text-foreground/75"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-border pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {tool.departmentFit.slice(0, 4).map((d) => (
                    <span
                      key={d}
                      className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {d}
                    </span>
                  ))}
                  {tool.departmentFit.length > 4 && (
                    <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      +{tool.departmentFit.length - 4} more
                    </span>
                  )}
                </div>
                <RiskBadge level={tool.riskLevel} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Developer agent matrix */}
      <section className="border-t border-border pt-16">
        <SectionHeader
          eyebrow="Developer agents · comparative scorecard"
          title="Five agents, seven lenses."
          description="Not a leaderboard — a map of where each agent helps and where to set guardrails."
          size="lg"
        />
        <div className="mt-10 overflow-hidden border-y border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-[13px]">
              <thead>
                <tr className="border-b border-border text-left text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="py-3 pr-4 font-medium">Agent</th>
                  {DEV_AGENT_DIMENSIONS.map((dim) => (
                    <th key={dim} className="px-3 py-3 font-medium">
                      {DEV_AGENT_DIMENSION_LABELS[dim]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEV_AGENT_SCORES.map((row) => (
                  <tr
                    key={row.agent}
                    className="border-b border-border last:border-b-0 hover:bg-secondary/40"
                  >
                    <td className="py-4 pr-4 font-serif text-lg tracking-tight text-foreground">
                      {row.agent}
                    </td>
                    {DEV_AGENT_DIMENSIONS.map((dim) => (
                      <td key={dim} className="px-3 py-4 align-middle">
                        <ScoreCell value={row[dim] as number} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-[12px] text-muted-foreground">
          Scores are 1–10 and reflect program-level posture, not benchmark performance. Updated quarterly.
        </p>
      </section>
    </div>
  );
}

function ToolMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="flex items-center gap-3">
        <ScoreBar value={value} width="w-24" />
        <span className="w-8 text-right font-serif text-[15px] tabular-nums text-foreground">
          {value}
        </span>
      </div>
    </div>
  );
}

function ScoreCell({ value }: { value: number }) {
  const tone =
    value >= 8 ? "bg-foreground text-background" : value >= 6 ? "bg-secondary text-foreground" : "bg-background text-foreground/65 border border-border";
  return (
    <div className="flex items-center gap-2">
      <span className={cn("inline-flex h-6 w-7 items-center justify-center font-mono text-[12px] tabular-nums", tone)}>
        {value}
      </span>
    </div>
  );
}
