import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { HeroAnimation } from "@/components/hero-animation";
import { SectionHeader } from "@/components/section-header";
import { EditorialQuote } from "@/components/editorial-quote";
import { RiskBadge } from "@/components/risk-badge";
import { StageBadge } from "@/components/stage-badge";
import { ScoreBar } from "@/components/score-bar";
import {
  METRICS,
  TEAMS,
  INSIGHTS,
  TOOLS,
  relativeFromToday,
} from "@/data/seed";

export default function HomePage() {
  const topInsights = INSIGHTS.slice(0, 3);
  const featuredTeams = TEAMS.slice(0, 4);
  const adoptionPct = Math.round(METRICS.adoptionRate * 100);

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="pt-2 pb-12 sm:pb-16 md:pt-6 md:pb-24">
        <div className="mb-8 flex items-end justify-between gap-6 sm:mb-12">
          <div className="max-w-3xl">
            <div className="mb-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:mb-4 sm:text-[11px]">
              An adoption operating system for the AI era
            </div>
            <h1 className="font-serif text-[36px] leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[52px] md:text-[78px] md:leading-[1.02]">
              The CRM that made enterprise AI&nbsp;<em className="not-italic text-foreground/70">legible.</em>
            </h1>
            <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-[15px]">
              Track every AI tool, every team, every enablement moment in one editorial
              workspace. Built so an enablement leader can see the program at a glance
              and act on the next right thing.
            </p>
          </div>
          <div className="hidden text-right text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:block">
            <div>Vol. 04 · Issue 17</div>
            <div className="mt-1 text-foreground/80">Q2 · 2026</div>
          </div>
        </div>
        <HeroAnimation />
      </section>

      {/* BEFORE & AFTER CALLOUT */}
      <section className="grid grid-cols-1 gap-0 border-y border-border md:grid-cols-2">
        <div className="border-b border-border p-6 sm:p-8 md:border-b-0 md:border-r md:p-12">
          <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Before
          </div>
          <h3 className="font-serif text-xl leading-snug tracking-tight sm:text-2xl md:text-3xl">
            A spreadsheet of usernames, a Slack channel of complaints, and a quarterly
            pulse survey nobody trusts.
          </h3>
          <ul className="mt-5 space-y-2 text-[13.5px] text-muted-foreground sm:mt-6 sm:text-[14px]">
            <li>· No shared view of which team uses which tool</li>
            <li>· Risk surfaced only after an incident</li>
            <li>· Enablement work invisible to leadership</li>
          </ul>
        </div>
        <div className="bg-secondary/40 p-6 sm:p-8 md:p-12">
          <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            After
          </div>
          <h3 className="font-serif text-xl leading-snug tracking-tight sm:text-2xl md:text-3xl">
            One CRM that reads like an editorial — every team has a record, every record
            tells a story, every story leads to an action.
          </h3>
          <ul className="mt-5 space-y-2 text-[13.5px] text-foreground/80 sm:mt-6 sm:text-[14px]">
            <li>· {METRICS.teamsTracked} teams tracked across {TOOLS.length} tools</li>
            <li>· Risk and governance posture visible per team</li>
            <li>· Recommendations generated weekly, owned by champions</li>
          </ul>
        </div>
      </section>

      {/* METRICS */}
      <section className="py-16 md:py-24">
        <SectionHeader
          eyebrow="Program at a glance"
          title="A program reads like a newsroom."
          description="Five numbers tell the program's state of mind. Everything else is in service of these."
          size="lg"
        />
        <div className="mt-10 grid grid-cols-2 divide-y divide-border border-y border-border md:grid-cols-5 md:divide-x md:divide-y-0">
          <Metric label="Weekly active AI users" value={METRICS.weeklyActiveAIUsers.toLocaleString()} delta="+11% QoQ" />
          <Metric label="Adoption rate" value={`${adoptionPct}%`} delta="+7 pts QoQ" accent />
          <Metric label="Enablement sessions" value={String(METRICS.enablementSessionsCompleted)} delta="last 90 days" />
          <Metric label="Productivity index" value={String(METRICS.productivityIndex)} delta="of 100" />
          <Metric label="Open risks" value={String(METRICS.risksOpen)} delta={`${METRICS.risksCritical} critical`} risk />
        </div>
      </section>

      {/* TOP TEAMS */}
      <section className="border-t border-border py-16 md:py-24">
        <SectionHeader
          eyebrow="Teams in motion"
          title="Four teams worth your attention this week."
          action={
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-[12px] font-medium uppercase tracking-[0.16em] text-foreground"
            >
              All teams
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-10 divide-y divide-border border-y border-border">
          {featuredTeams.map((team) => (
            <Link
              key={team.id}
              to={`/teams/${team.id}`}
              className="group grid grid-cols-12 items-center gap-4 py-5 transition-colors hover:bg-secondary/40"
            >
              <div className="col-span-12 md:col-span-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {team.department}
                </div>
                <div className="mt-1 font-serif text-[22px] leading-tight tracking-tight text-foreground">
                  {team.name}
                </div>
                <div className="mt-1 text-[12px] text-muted-foreground">
                  Led by {team.leader} · Champion {team.champion}
                </div>
              </div>
              <div className="col-span-6 flex items-center gap-2 md:col-span-2">
                <StageBadge stage={team.adoptionStage} />
              </div>
              <div className="col-span-6 md:col-span-2">
                <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Usage score
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <ScoreBar value={team.usageScore} width="w-20" />
                  <span className="font-serif text-[18px] tabular-nums text-foreground">
                    {team.usageScore}
                  </span>
                </div>
              </div>
              <div className="col-span-6 md:col-span-2">
                <RiskBadge level={team.riskLevel} />
              </div>
              <div className="col-span-6 hidden text-right text-[12px] text-muted-foreground md:col-span-2 md:block">
                Last touch · {relativeFromToday(team.lastTouchpoint)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section className="border-t border-border py-16 md:py-24">
        <SectionHeader
          eyebrow="What the data is saying"
          title="Three things to do this week."
          action={
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-[12px] font-medium uppercase tracking-[0.16em]"
            >
              All insights
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {topInsights.map((ins) => (
            <Link
              key={ins.id}
              to="/insights"
              className="group flex flex-col bg-background p-7 transition-colors hover:bg-secondary/40 md:p-8"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(158_32%_28%)] dark:text-[hsl(158_32%_70%)]">
                {ins.category}
              </div>
              <h3 className="mt-3 font-serif text-[22px] leading-snug tracking-tight text-foreground">
                {ins.title}
              </h3>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                {ins.body}
              </p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground">
                Read full insight
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <EditorialQuote eyebrow="A point of view" attribution="— Author's note">
        Adoption isn't a dashboard. It's a relationship between every team and the
        tools they choose to trust. The CRM is how you remember the relationship.
      </EditorialQuote>

      {/* WHY THIS MATTERS — PORTFOLIO CALLOUT */}
      <section className="border-y border-border py-16 md:py-24">
        <SectionHeader
          eyebrow="Why this matters"
          title="A portfolio note from the designer."
          size="md"
        />
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="font-serif text-xl leading-relaxed text-foreground/85 md:text-2xl">
              Most enterprises now have more AI tools than they have policies to govern
              them. The interesting product question is not "which model is best?" but
              "how does an organization build a relationship with all of them at once?"
            </p>
            <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-muted-foreground">
              This concept reframes AI adoption as a CRM problem — every team is an
              account, every tool is a vendor, and every enablement session is a
              touchpoint. The interface borrows from editorial design: serifs for ideas,
              sans for data, generous whitespace for clarity, restrained color for
              status. Designed and built end-to-end as a portfolio piece.
            </p>
          </div>
          <aside className="border-l border-border pl-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Disciplines
            </div>
            <ul className="mt-3 space-y-2 text-[14px] text-foreground">
              <li>Product strategy</li>
              <li>Editorial visual design</li>
              <li>Information architecture</li>
              <li>Front-end engineering</li>
              <li>Data visualization</li>
            </ul>
            <div className="mt-8 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Stack
            </div>
            <p className="mt-2 text-[13px] text-foreground">
              React · TypeScript · Tailwind · Framer Motion · Recharts
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  delta,
  accent,
  risk,
}: {
  label: string;
  value: string;
  delta?: string;
  accent?: boolean;
  risk?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 px-3 py-6 md:px-6 md:py-7">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div
        className={
          "font-serif text-[30px] leading-none tracking-tight sm:text-[40px] md:text-[52px] " +
          (accent
            ? "text-[hsl(158_32%_28%)] dark:text-[hsl(158_32%_70%)]"
            : risk
              ? "text-[hsl(8_62%_44%)] dark:text-[hsl(8_60%_72%)]"
              : "text-foreground")
        }
      >
        {value}
      </div>
      {delta && (
        <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {delta}
        </div>
      )}
    </div>
  );
}
