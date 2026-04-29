import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { RiskBadge } from "@/components/risk-badge";
import { StageBadge } from "@/components/stage-badge";
import { ScoreBar } from "@/components/score-bar";
import { Monogram } from "@/components/monogram";
import {
  TEAMS,
  type Department,
  type AdoptionStage,
  type RiskLevel,
  relativeFromToday,
} from "@/data/seed";
import { cn } from "@/lib/utils";

const DEPARTMENTS: Array<Department | "All"> = [
  "All",
  "Engineering",
  "Product",
  "Design",
  "Editorial",
  "Marketing",
  "Legal",
  "Finance",
  "HR",
  "Data",
  "Security",
  "Operations",
];

const STAGES: Array<AdoptionStage | "All"> = [
  "All",
  "Not started",
  "Discovery",
  "Pilot",
  "Training scheduled",
  "Active adoption",
  "Scaled",
  "Needs support",
];

const RISKS: Array<RiskLevel | "All"> = ["All", "Low", "Medium", "High", "Critical"];

export default function TeamsPage() {
  const [dept, setDept] = useState<(typeof DEPARTMENTS)[number]>("All");
  const [stage, setStage] = useState<(typeof STAGES)[number]>("All");
  const [risk, setRisk] = useState<(typeof RISKS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return TEAMS.filter((t) => {
      if (dept !== "All" && t.department !== dept) return false;
      if (stage !== "All" && t.adoptionStage !== stage) return false;
      if (risk !== "All" && t.riskLevel !== risk) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !t.name.toLowerCase().includes(q) &&
          !t.leader.toLowerCase().includes(q) &&
          !t.champion.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [dept, stage, risk, query]);

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        eyebrow={`${TEAMS.length} teams · ${TEAMS.reduce((acc, t) => acc + t.members, 0)} people`}
        title="Teams"
        description="Every team is a record. Every record is a relationship — between leaders, champions, the tools they trust, and the work they ship."
        size="xl"
      />

      {/* Filters */}
      <div className="flex flex-col gap-4 border-y border-border py-5">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teams, leaders, champions"
            className="h-9 min-w-[260px] flex-1 border border-border bg-background px-3 text-[13px] tracking-tight outline-none placeholder:text-muted-foreground focus:border-foreground"
          />
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {filtered.length} of {TEAMS.length}
          </div>
        </div>
        <FilterRow
          label="Department"
          options={DEPARTMENTS as readonly string[]}
          value={dept}
          onChange={(v) => setDept(v as (typeof DEPARTMENTS)[number])}
        />
        <FilterRow
          label="Stage"
          options={STAGES as readonly string[]}
          value={stage}
          onChange={(v) => setStage(v as (typeof STAGES)[number])}
        />
        <FilterRow
          label="Risk"
          options={RISKS as readonly string[]}
          value={risk}
          onChange={(v) => setRisk(v as (typeof RISKS)[number])}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden border-y border-border">
        <div className="hidden grid-cols-12 gap-4 border-b border-border px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:grid">
          <div className="col-span-4">Team</div>
          <div className="col-span-2">Stage</div>
          <div className="col-span-2">Usage</div>
          <div className="col-span-1">Risk</div>
          <div className="col-span-2">Champion</div>
          <div className="col-span-1 text-right">Last touch</div>
        </div>
        <ul className="divide-y divide-border">
          {filtered.map((team) => (
            <li key={team.id}>
              <Link
                to={`/teams/${team.id}`}
                className="grid grid-cols-12 items-center gap-4 px-4 py-4 transition-colors hover:bg-secondary/50"
              >
                <div className="col-span-12 md:col-span-4">
                  <div className="flex items-center gap-3">
                    <Monogram name={team.name} size="md" />
                    <div className="min-w-0">
                      <div className="font-serif text-[17px] leading-tight tracking-tight text-foreground">
                        {team.name}
                      </div>
                      <div className="text-[11.5px] uppercase tracking-[0.14em] text-muted-foreground">
                        {team.department} · {team.region} · {team.members} people
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-2">
                  <StageBadge stage={team.adoptionStage} />
                </div>
                <div className="col-span-6 md:col-span-2">
                  <div className="flex items-center gap-3">
                    <ScoreBar value={team.usageScore} width="w-20" />
                    <span className="text-[13px] tabular-nums text-foreground/80">{team.usageScore}</span>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-1">
                  <RiskBadge level={team.riskLevel} />
                </div>
                <div className="col-span-6 md:col-span-2 text-[13px] text-foreground/80">
                  {team.champion}
                </div>
                <div className="col-span-12 md:col-span-1 flex items-center justify-end gap-2 text-[12px] text-muted-foreground">
                  {relativeFromToday(team.lastTouchpoint)}
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </Link>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="flex flex-col items-center gap-3 px-4 py-16 text-center">
              <div className="font-serif text-2xl text-foreground/80">No teams match these filters.</div>
              <p className="text-[13px] text-muted-foreground">Try a broader department or remove the risk filter.</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="w-20 text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={cn(
                "border px-2.5 py-1 text-[11.5px] tracking-tight transition-colors",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground/75 hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
