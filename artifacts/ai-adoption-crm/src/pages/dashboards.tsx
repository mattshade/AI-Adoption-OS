import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { SectionHeader } from "@/components/section-header";
import {
  WEEKLY_ACTIVE_BY_TOOL,
  ADOPTION_BY_DEPARTMENT,
  ENABLEMENT_IMPACT,
  RISK_DISTRIBUTION,
  TOOL_SATISFACTION,
  USAGE_BY_ROLE,
  METRICS,
  TOOL_NAMES,
} from "@/data/seed";

const NEUTRAL_PALETTE = [
  "hsl(24 10% 14%)",   // ink
  "hsl(24 8% 32%)",
  "hsl(24 8% 50%)",
  "hsl(24 8% 65%)",
  "hsl(24 8% 75%)",
  "hsl(158 32% 28%)",  // accent for highlight series
  "hsl(24 8% 80%)",
  "hsl(24 8% 88%)",
  "hsl(24 8% 92%)",
];

const RISK_COLORS = [
  "hsl(24 8% 78%)",     // Low
  "hsl(38 60%  60%)",   // Medium
  "hsl(8 62% 52%)",     // High
  "hsl(8 62% 32%)",     // Critical
];

const AXIS_STYLE = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };
const TICK_LINE = { stroke: "hsl(var(--border))" };

export default function DashboardsPage() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Dashboards · Q2 · 2026"
        title="The numbers behind the program."
        description="Read top-down: trajectory, then composition, then risk. Charts are deliberately quiet."
        size="xl"
      />

      {/* Top stat strip */}
      <div className="grid grid-cols-2 divide-y divide-border border-y border-border md:grid-cols-4 md:divide-x md:divide-y-0">
        <Stat label="Total active users" value={METRICS.totalActiveUsers.toLocaleString()} />
        <Stat label="Weekly active AI users" value={METRICS.weeklyActiveAIUsers.toLocaleString()} />
        <Stat label="Prototypes shipped" value={String(METRICS.prototypesShipped)} />
        <Stat label="Tools in portfolio" value={String(METRICS.toolsInPortfolio)} />
      </div>

      {/* Big chart: weekly active by tool */}
      <ChartTile
        eyebrow="Trajectory · 12 weeks"
        title="Weekly active users by tool"
        description="Cursor and Claude Code growth is bending upward; ChatGPT remains the steady spine."
      >
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={WEEKLY_ACTIVE_BY_TOOL} margin={{ top: 16, right: 16, left: -8, bottom: 8 }}>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
            <XAxis dataKey="week" axisLine={TICK_LINE} tickLine={false} tick={AXIS_STYLE} />
            <YAxis axisLine={false} tickLine={false} tick={AXIS_STYLE} width={40} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                fontSize: 12,
                borderRadius: 0,
              }}
              cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              iconType="plainline"
              align="right"
              verticalAlign="top"
              height={28}
            />
            {TOOL_NAMES.map((name, idx) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={NEUTRAL_PALETTE[idx % NEUTRAL_PALETTE.length]}
                strokeWidth={name === "Cursor" || name === "Claude Code" ? 2 : 1.25}
                dot={false}
                activeDot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartTile>

      {/* Two-up: department adoption + enablement impact */}
      <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2">
        <ChartTile
          eyebrow="Composition · by department"
          title="Adoption stage by department"
          description="Stacked teams across departments. Engineering and Marketing lead; Editorial and Legal are still maturing."
          flush
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ADOPTION_BY_DEPARTMENT} margin={{ top: 16, right: 16, left: -8, bottom: 8 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="department" axisLine={TICK_LINE} tickLine={false} tick={{ ...AXIS_STYLE, fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={70} />
              <YAxis axisLine={false} tickLine={false} tick={AXIS_STYLE} width={28} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: 12,
                  borderRadius: 0,
                }}
                cursor={{ fill: "hsl(var(--secondary))" }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" />
              <Bar stackId="a" dataKey="scaled" name="Scaled" fill="hsl(158 32% 28%)" />
              <Bar stackId="a" dataKey="active" name="Active" fill="hsl(24 10% 22%)" />
              <Bar stackId="a" dataKey="pilot" name="Pilot" fill="hsl(24 8% 50%)" />
              <Bar stackId="a" dataKey="discovery" name="Discovery" fill="hsl(24 8% 75%)" />
              <Bar stackId="a" dataKey="notStarted" name="Not started" fill="hsl(24 8% 90%)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartTile>

        <ChartTile
          eyebrow="Outcome · enablement impact"
          title="Enablement sessions vs. adoption"
          description="More enablement, more adoption. The relationship is direct, not noisy."
          flush
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ENABLEMENT_IMPACT} margin={{ top: 16, right: 16, left: -8, bottom: 8 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
              <defs>
                <linearGradient id="adoption-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(158 32% 28%)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(158 32% 28%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" axisLine={TICK_LINE} tickLine={false} tick={AXIS_STYLE} />
              <YAxis axisLine={false} tickLine={false} tick={AXIS_STYLE} width={28} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: 12,
                  borderRadius: 0,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" />
              <Area type="monotone" dataKey="adoption" name="Adoption %" stroke="hsl(158 32% 28%)" fill="url(#adoption-grad)" strokeWidth={2} />
              <Bar dataKey="sessions" name="Sessions" fill="hsl(24 10% 22%)" barSize={10} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartTile>
      </div>

      {/* Three-up: risk distribution + tool satisfaction + usage by role */}
      <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-3">
        <ChartTile eyebrow="Risk" title="Risk distribution" flush>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={RISK_DISTRIBUTION}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={85}
                stroke="hsl(var(--background))"
                strokeWidth={2}
                paddingAngle={1}
              >
                {RISK_DISTRIBUTION.map((_, idx) => (
                  <Cell key={idx} fill={RISK_COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: 12,
                  borderRadius: 0,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" />
            </PieChart>
          </ResponsiveContainer>
        </ChartTile>

        <ChartTile eyebrow="Trust" title="Tool satisfaction" flush>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={TOOL_SATISFACTION} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={AXIS_STYLE} domain={[0, 100]} />
              <YAxis dataKey="tool" type="category" axisLine={false} tickLine={false} tick={{ ...AXIS_STYLE, fontSize: 10 }} width={120} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: 12,
                  borderRadius: 0,
                }}
                cursor={{ fill: "hsl(var(--secondary))" }}
              />
              <Bar dataKey="score" fill="hsl(24 10% 22%)" barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </ChartTile>

        <ChartTile eyebrow="People" title="Usage by role" flush>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={USAGE_BY_ROLE} margin={{ top: 8, right: 16, left: -8, bottom: 24 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="role" axisLine={TICK_LINE} tickLine={false} tick={{ ...AXIS_STYLE, fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={50} />
              <YAxis axisLine={false} tickLine={false} tick={AXIS_STYLE} width={28} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: 12,
                  borderRadius: 0,
                }}
                cursor={{ fill: "hsl(var(--secondary))" }}
              />
              <Bar dataKey="value" fill="hsl(158 32% 28%)" barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </ChartTile>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 px-3 py-7 md:px-6">
      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="font-serif text-[40px] leading-none tracking-tight text-foreground">
        {value}
      </div>
    </div>
  );
}

function ChartTile({
  eyebrow,
  title,
  description,
  children,
  flush,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  flush?: boolean;
}) {
  return (
    <section className={"flex flex-col gap-4 bg-background p-6 md:p-8 " + (flush ? "" : "border border-border")}>
      <header>
        {eyebrow && (
          <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-1 font-serif text-2xl tracking-tight text-foreground">{title}</h2>
        {description && (
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </header>
      <div className="-mx-2 mt-2 md:-mx-3">{children}</div>
    </section>
  );
}
