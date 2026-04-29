import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { RiskBadge } from "@/components/risk-badge";
import { StageBadge } from "@/components/stage-badge";
import { ScoreBar } from "@/components/score-bar";
import {
  teamById,
  risksForTeam,
  interactionsForTeam,
  recommendationsForTeam,
  usageForTeam,
  relativeFromToday,
} from "@/data/seed";

export default function TeamDetailPage() {
  const params = useParams<{ id: string }>();
  const team = teamById(params.id);
  if (!team) return <NotFoundTeam />;

  const risks = risksForTeam(team.id);
  const interactions = interactionsForTeam(team.id);
  const recs = recommendationsForTeam(team.id);
  const usage = usageForTeam(team.id);

  return (
    <div className="flex flex-col gap-12">
      <Link
        to="/teams"
        className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        All teams
      </Link>

      {/* Header */}
      <header className="flex flex-col gap-8 border-b border-border pb-12">
        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>{team.department}</span>
          <span>·</span>
          <span>{team.region}</span>
          <span>·</span>
          <span>{team.members} people</span>
        </div>
        <h1 className="font-serif text-[56px] leading-[1.02] tracking-tight md:text-[80px]">
          {team.name}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <StageBadge stage={team.adoptionStage} />
          <RiskBadge level={team.riskLevel} />
          <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] tracking-tight text-foreground/75">
            Enablement: {team.enablementStatus}
          </span>
        </div>
        <p className="max-w-2xl font-serif text-2xl leading-snug text-foreground/85">
          {team.notes}
        </p>
      </header>

      {/* Two-column body */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Sidebar */}
        <aside className="space-y-10 md:col-span-1">
          <FactBlock label="Leader" value={team.leader} />
          <FactBlock label="Champion" value={team.champion} />
          <div>
            <FactLabel>Tools in use</FactLabel>
            <ul className="mt-3 space-y-2">
              {team.tools.map((t) => (
                <li
                  key={t}
                  className="flex items-center justify-between border-b border-dashed border-border pb-2 text-[13.5px]"
                >
                  <span className="text-foreground">{t}</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <FactLabel>Usage score</FactLabel>
            <div className="mt-3 flex items-center gap-3">
              <ScoreBar value={team.usageScore} width="w-32" />
              <span className="font-serif text-2xl tabular-nums text-foreground">
                {team.usageScore}
              </span>
            </div>
          </div>
          <FactBlock label="Last touchpoint" value={`${team.lastTouchpoint} · ${relativeFromToday(team.lastTouchpoint)}`} />
          <div>
            <FactLabel>Next action</FactLabel>
            <p className="mt-3 font-serif text-lg leading-snug text-foreground">
              {team.nextAction}
            </p>
          </div>
        </aside>

        {/* Main */}
        <div className="space-y-14 md:col-span-2">
          <section>
            <SectionHeader eyebrow="Recommendations" title="What to do next" size="md" />
            <div className="mt-6 divide-y divide-border border-y border-border">
              {recs.length === 0 && (
                <div className="py-6 text-[13px] text-muted-foreground">
                  No standing recommendations. Watch this space after the next interaction.
                </div>
              )}
              {recs.map((r) => (
                <div key={r.id} className="grid grid-cols-12 items-start gap-4 py-5">
                  <div className="col-span-12 md:col-span-8">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {r.category}
                    </div>
                    <div className="mt-1 font-serif text-xl tracking-tight text-foreground">
                      {r.title}
                    </div>
                    <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">
                      {r.rationale}
                    </p>
                  </div>
                  <div className="col-span-6 md:col-span-2 text-[12px] text-foreground/80">
                    Owner · {r.suggestedOwner}
                  </div>
                  <div className="col-span-6 md:col-span-2 text-right text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                    {r.priority} · due {r.dueIn}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader eyebrow="Risks" title="Open risks" size="md" />
            <div className="mt-6 divide-y divide-border border-y border-border">
              {risks.length === 0 && (
                <div className="py-6 text-[13px] text-muted-foreground">
                  No risks currently logged.
                </div>
              )}
              {risks.map((r) => (
                <div key={r.id} className="grid grid-cols-12 items-start gap-4 py-5">
                  <div className="col-span-12 md:col-span-8">
                    <div className="flex items-center gap-2">
                      <RiskBadge level={r.severity} />
                      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {r.category}
                      </span>
                    </div>
                    <div className="mt-2 font-serif text-lg tracking-tight text-foreground">
                      {r.title}
                    </div>
                    <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">
                      {r.description}
                    </p>
                  </div>
                  <div className="col-span-6 md:col-span-2 text-[12px] text-foreground/80">
                    Status · {r.status}
                  </div>
                  <div className="col-span-6 md:col-span-2 text-right text-[12px] text-muted-foreground">
                    Opened {relativeFromToday(r.opened)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader eyebrow="Touchpoints" title="Recent interactions" size="md" />
            <div className="mt-6 space-y-6 border-y border-border py-6">
              {interactions.map((i) => (
                <div key={i.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-3">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {i.date}
                    </div>
                    <div className="mt-1 text-[12px] text-foreground/80">{i.type}</div>
                    <div className="mt-1 text-[11.5px] text-muted-foreground">{i.owner}</div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <p className="font-serif text-lg leading-snug text-foreground">{i.summary}</p>
                    <p className="mt-2 text-[13px] text-muted-foreground">
                      <span className="text-foreground/80">Outcome.</span> {i.outcome}
                    </p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      <span className="text-foreground/80">Next.</span> {i.nextStep}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader eyebrow="Activity" title="Usage events" size="md" />
            <div className="mt-6 overflow-hidden border-y border-border">
              <div className="hidden grid-cols-12 gap-4 border-b border-border px-1 py-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:grid">
                <div className="col-span-3">Date</div>
                <div className="col-span-3">Tool</div>
                <div className="col-span-3">Event</div>
                <div className="col-span-3 text-right">Duration</div>
              </div>
              <ul className="divide-y divide-border">
                {usage.map((u) => (
                  <li key={u.id} className="grid grid-cols-12 gap-4 px-1 py-3 text-[13px]">
                    <div className="col-span-6 md:col-span-3 text-muted-foreground">{u.date}</div>
                    <div className="col-span-6 md:col-span-3 text-foreground">{u.toolName}</div>
                    <div className="col-span-6 md:col-span-3 capitalize text-foreground/80">
                      {u.eventType.replace(/_/g, " ")}
                    </div>
                    <div className="col-span-6 md:col-span-3 text-right tabular-nums text-foreground">
                      {u.durationMin} min
                    </div>
                  </li>
                ))}
                {usage.length === 0 && (
                  <li className="px-1 py-6 text-[13px] text-muted-foreground">
                    No recent usage events.
                  </li>
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function FactLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </div>
  );
}

function FactBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <FactLabel>{label}</FactLabel>
      <div className="mt-2 font-serif text-xl tracking-tight text-foreground">{value}</div>
    </div>
  );
}

function NotFoundTeam() {
  return (
    <div className="flex flex-col items-start gap-4 py-20">
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        404
      </div>
      <h1 className="font-serif text-5xl tracking-tight">Team not found.</h1>
      <Link
        to="/teams"
        className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-[12px] uppercase tracking-[0.16em]"
      >
        Return to teams
      </Link>
    </div>
  );
}
