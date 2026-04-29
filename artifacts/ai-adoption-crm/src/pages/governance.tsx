import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { SectionHeader } from "@/components/section-header";
import { EditorialQuote } from "@/components/editorial-quote";
import { RiskBadge } from "@/components/risk-badge";
import {
  GOVERNANCE_READINESS,
  RISKS,
  TEAMS,
  METRICS,
  DEV_AGENT_SCORES,
  DEV_AGENT_DIMENSIONS,
  DEV_AGENT_DIMENSION_LABELS,
  relativeFromToday,
} from "@/data/seed";

const PRINCIPLES = [
  {
    title: "Visible by default.",
    body: "If a team is using AI, the program knows about it. Visibility is the first form of governance.",
  },
  {
    title: "Enablement before enforcement.",
    body: "Policies are useless without practice. Every restriction comes with an enablement plan.",
  },
  {
    title: "Risk lives in the open.",
    body: "Risks are tracked publicly to the team that owns them. No private risk registers, ever.",
  },
  {
    title: "Recommendations, not mandates.",
    body: "The CRM proposes; the team decides. Trust compounds when leaders are not micromanaged.",
  },
];

const AXIS_STYLE = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };

export default function GovernancePage() {
  const openRisks = RISKS.filter((r) => r.status !== "Resolved");
  const teamMap = Object.fromEntries(TEAMS.map((t) => [t.id, t]));

  const radarData = DEV_AGENT_DIMENSIONS.map((dim) => {
    const row: Record<string, string | number> = {
      dimension: DEV_AGENT_DIMENSION_LABELS[dim].replace(" & ", " /\n"),
    };
    for (const a of DEV_AGENT_SCORES) {
      row[a.agent] = a[dim] as number;
    }
    return row;
  });

  return (
    <div className="flex flex-col gap-16">
      <SectionHeader
        eyebrow="Governance & trust"
        title="A program is only as strong as the trust around it."
        description="Governance is not a gate at the end. It is the texture of everything we ship."
        size="xl"
      />

      {/* Principles */}
      <section className="grid grid-cols-1 gap-px border-y border-border bg-border md:grid-cols-2">
        {PRINCIPLES.map((p, idx) => (
          <article key={p.title} className="flex flex-col gap-4 bg-background p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              0{idx + 1}
            </div>
            <h3 className="font-serif text-3xl leading-tight tracking-tight text-foreground">
              {p.title}
            </h3>
            <p className="text-[14px] leading-relaxed text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </section>

      {/* Top stats */}
      <div className="grid grid-cols-2 divide-y divide-border border-y border-border md:grid-cols-4 md:divide-x md:divide-y-0">
        <Stat label="Governance readiness" value={`${METRICS.governanceReadiness}`} suffix=" / 100" />
        <Stat label="Risks open" value={String(METRICS.risksOpen)} />
        <Stat label="Critical risks" value={String(METRICS.risksCritical)} risk />
        <Stat label="Tools at low risk" value={String(TEAMS.filter((t) => t.riskLevel === "Low").length)} />
      </div>

      {/* Two charts */}
      <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2">
        <section className="flex flex-col gap-4 bg-background p-6 md:p-8">
          <header>
            <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              By department
            </div>
            <h2 className="mt-1 font-serif text-2xl tracking-tight">Governance readiness</h2>
          </header>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={GOVERNANCE_READINESS} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={AXIS_STYLE} domain={[0, 100]} />
              <YAxis dataKey="department" type="category" axisLine={false} tickLine={false} tick={{ ...AXIS_STYLE, fontSize: 10 }} width={88} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: 12,
                  borderRadius: 0,
                }}
                cursor={{ fill: "hsl(var(--secondary))" }}
              />
              <Bar dataKey="score" fill="hsl(158 32% 28%)" barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="flex flex-col gap-4 bg-background p-6 md:p-8">
          <header>
            <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Developer agents · safety lens
            </div>
            <h2 className="mt-1 font-serif text-2xl tracking-tight">
              Where governance shows up by tool
            </h2>
          </header>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} outerRadius={100}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 9.5, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
              <Radar name="Copilot" dataKey="Copilot" stroke="hsl(158 32% 28%)" fill="hsl(158 32% 28%)" fillOpacity={0.18} strokeWidth={1.5} />
              <Radar name="Claude Code" dataKey="Claude Code" stroke="hsl(24 10% 22%)" fill="hsl(24 10% 22%)" fillOpacity={0.12} strokeWidth={1.25} />
              <Radar name="Antigravity" dataKey="Antigravity" stroke="hsl(8 62% 48%)" fill="hsl(8 62% 48%)" fillOpacity={0.1} strokeWidth={1.25} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: 12,
                  borderRadius: 0,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-[12px] text-muted-foreground">
            Three contrasted profiles: Copilot's mature controls, Claude Code's even profile, Antigravity's pilot-stage gaps.
          </p>
        </section>
      </div>

      {/* Risk register */}
      <section>
        <SectionHeader
          eyebrow="Live register"
          title="Open and mitigating risks"
          description="The full list, owned and visible. Resolved risks are archived but not hidden."
          size="md"
        />
        <div className="mt-8 overflow-hidden border-y border-border">
          <div className="hidden grid-cols-12 gap-4 border-b border-border px-3 py-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:grid">
            <div className="col-span-1">Severity</div>
            <div className="col-span-3">Team</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Opened</div>
          </div>
          <ul className="divide-y divide-border">
            {openRisks.slice(0, 24).map((r) => {
              const team = teamMap[r.teamId];
              return (
                <li key={r.id} className="grid grid-cols-12 items-start gap-4 px-3 py-4 text-[13px]">
                  <div className="col-span-6 md:col-span-1">
                    <RiskBadge level={r.severity} />
                  </div>
                  <div className="col-span-6 md:col-span-3 font-serif text-[15px] tracking-tight text-foreground">
                    {team?.name ?? "—"}
                  </div>
                  <div className="col-span-6 md:col-span-2 text-foreground/80">{r.category}</div>
                  <div className="col-span-12 md:col-span-4 text-muted-foreground">
                    <span className="text-foreground">{r.title}.</span> {r.description}
                  </div>
                  <div className="col-span-6 md:col-span-1 text-foreground/80">{r.status}</div>
                  <div className="col-span-6 md:col-span-1 text-right text-muted-foreground">
                    {relativeFromToday(r.opened)}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <EditorialQuote eyebrow="Trust" attribution="— Program principle">
        Trust is built one explained decision at a time. The CRM is the explanation
        layer.
      </EditorialQuote>
    </div>
  );
}

function Stat({ label, value, suffix, risk }: { label: string; value: string; suffix?: string; risk?: boolean }) {
  return (
    <div className="flex flex-col gap-2 px-3 py-7 md:px-6">
      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div
        className={
          "font-serif text-[40px] leading-none tracking-tight " +
          (risk ? "text-[hsl(8_62%_44%)] dark:text-[hsl(8_60%_72%)]" : "text-foreground")
        }
      >
        {value}
        {suffix && <span className="text-[20px] text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}
