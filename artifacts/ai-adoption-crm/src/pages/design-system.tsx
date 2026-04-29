import { SectionHeader } from "@/components/section-header";
import { EditorialQuote } from "@/components/editorial-quote";
import { RiskBadge } from "@/components/risk-badge";
import { StageBadge } from "@/components/stage-badge";
import { RecommendationBadge } from "@/components/recommendation-badge";
import { ScoreBar } from "@/components/score-bar";
import { Monogram } from "@/components/monogram";

const COLORS = [
  { name: "Ink", token: "--foreground", hex: "warm near-black", swatch: "bg-foreground" },
  { name: "Page", token: "--background", hex: "warm off-white", swatch: "bg-background border border-border" },
  { name: "Paper", token: "--secondary", hex: "warm secondary", swatch: "bg-secondary" },
  { name: "Muted", token: "--muted-foreground", hex: "warm grey", swatch: "bg-[hsl(var(--muted-foreground))]" },
  { name: "Forest accent", token: "--accent", hex: "deep forest green", swatch: "bg-[hsl(158_32%_28%)]" },
  { name: "Burnt clay", token: "--destructive", hex: "risk red", swatch: "bg-[hsl(8_62%_48%)]" },
  { name: "Border", token: "--border", hex: "hairline", swatch: "bg-border" },
  { name: "Card", token: "--card", hex: "card surface", swatch: "bg-card border border-border" },
];

const TYPE_SCALE = [
  { label: "Display 01", className: "font-serif text-[80px] leading-[0.95] tracking-[-0.02em]", sample: "Adoption" },
  { label: "Display 02", className: "font-serif text-[56px] leading-[1.02] tracking-[-0.015em]", sample: "Enablement" },
  { label: "Heading 01", className: "font-serif text-[40px] leading-tight tracking-tight", sample: "Tool portfolio" },
  { label: "Heading 02", className: "font-serif text-[28px] leading-tight tracking-tight", sample: "Recent interactions" },
  { label: "Editorial body", className: "font-serif text-xl leading-snug", sample: "A program is only as strong as the trust around it." },
  { label: "Body", className: "text-[15px] leading-relaxed text-foreground/85", sample: "Body copy reads at a comfortable length, with restrained tracking and warm contrast." },
  { label: "Caption · uppercase", className: "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground", sample: "Section eyebrow" },
];

export default function DesignSystemPage() {
  return (
    <div className="flex flex-col gap-16">
      {/* Design challenge — portfolio callout */}
      <header className="flex flex-col gap-8 border-b border-border pb-12">
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Design system · v0.4 · Concept
        </div>
        <h1 className="font-serif text-[56px] leading-[1.02] tracking-tight md:text-[88px]">
          A quiet system for a noisy category.
        </h1>
        <p className="max-w-2xl font-serif text-2xl leading-snug text-foreground/85">
          The design challenge: build software that talks about AI without sounding like
          AI marketing. No purple gradients, no sparkle icons, no breathless copy. The
          tools speak loudly enough on their own — the interface should be the calm
          surface where real decisions get made.
        </p>
      </header>

      {/* Three principles */}
      <section className="grid grid-cols-1 gap-px border-y border-border bg-border md:grid-cols-3">
        <Principle
          eyebrow="Principle 01"
          title="Editorial first."
          body="Read the page like a magazine. Serifs lead the eye into ideas; sans-serifs serve the data."
        />
        <Principle
          eyebrow="Principle 02"
          title="Restraint over flourish."
          body="One accent color. One destructive color. Borders before shadows. Whitespace before density."
        />
        <Principle
          eyebrow="Principle 03"
          title="Status earns color."
          body="Color is a signal, not a decoration. Most of the system is monochrome on purpose."
        />
      </section>

      {/* Color */}
      <section>
        <SectionHeader eyebrow="Color" title="A monochrome base, two earned accents." size="lg" />
        <div className="mt-8 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {COLORS.map((c) => (
            <div key={c.name} className="flex flex-col gap-3 bg-background p-5">
              <div className={"h-20 w-full " + c.swatch} />
              <div>
                <div className="font-serif text-base text-foreground">{c.name}</div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {c.token}
                </div>
                <div className="mt-1 text-[12px] text-muted-foreground">{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <SectionHeader
          eyebrow="Typography"
          title="Fraunces and Inter, with intent."
          description="Fraunces sets the editorial mood for ideas, headlines, and quotes. Inter handles every label, table, and number."
          size="lg"
        />
        <div className="mt-8 divide-y divide-border border-y border-border">
          {TYPE_SCALE.map((t) => (
            <div key={t.label} className="grid grid-cols-12 items-baseline gap-4 py-6">
              <div className="col-span-12 md:col-span-3">
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                  {t.label}
                </div>
              </div>
              <div className={"col-span-12 md:col-span-9 " + t.className}>{t.sample}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section>
        <SectionHeader
          eyebrow="Components"
          title="The shared vocabulary."
          description="Eight patterns do most of the work across the app. Each is shown in light context, then catalogued."
          size="lg"
        />
        <div className="mt-10 grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          <ComponentTile name="Risk tag" description="Compact pill that surfaces team risk posture across tables and cards.">
            <div className="flex flex-wrap gap-2">
              <RiskBadge level="Low" />
              <RiskBadge level="Medium" />
              <RiskBadge level="High" />
              <RiskBadge level="Critical" />
            </div>
          </ComponentTile>
          <ComponentTile name="Adoption stage badge" description="Pipeline-aware badge with subtle stage shading.">
            <div className="flex flex-wrap gap-2">
              <StageBadge stage="Discovery" />
              <StageBadge stage="Pilot" />
              <StageBadge stage="Active adoption" />
              <StageBadge stage="Scaled" />
              <StageBadge stage="Needs support" />
            </div>
          </ComponentTile>
          <ComponentTile name="Recommendation badge" description="Adopt / Pilot / Monitor / Retire signal for tool portfolio cards.">
            <div className="flex flex-wrap gap-2">
              <RecommendationBadge value="Adopt" />
              <RecommendationBadge value="Pilot" />
              <RecommendationBadge value="Monitor" />
              <RecommendationBadge value="Retire" />
            </div>
          </ComponentTile>
          <ComponentTile name="Score bar" description="Editorial mini bar for usage, governance, and trust metrics.">
            <div className="flex flex-col gap-3">
              {[28, 54, 72, 89].map((v) => (
                <div key={v} className="flex items-center gap-3">
                  <ScoreBar value={v} width="w-40" />
                  <span className="font-serif text-base tabular-nums text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </ComponentTile>
          <ComponentTile name="Team CRM row" description="Standard row pattern used across Teams CRM and pipeline lists.">
            <div className="grid grid-cols-12 items-center gap-3 border-y border-border bg-background py-4">
              <div className="col-span-6 flex items-center gap-3">
                <Monogram name="Editorial Standards" />
                <div>
                  <div className="font-serif text-[15px] text-foreground">Editorial Standards</div>
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                    Editorial · EMEA
                  </div>
                </div>
              </div>
              <div className="col-span-3"><StageBadge stage="Active adoption" /></div>
              <div className="col-span-3 flex justify-end"><RiskBadge level="High" /></div>
            </div>
          </ComponentTile>
          <ComponentTile name="Insight card" description="Editorial insight pattern used across Insights and home callouts.">
            <article className="flex flex-col bg-background">
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(158_32%_28%)] dark:text-[hsl(158_32%_70%)]">
                Risk
              </div>
              <h3 className="mt-2 font-serif text-lg leading-snug tracking-tight">
                Editorial has high ChatGPT usage but low governance readiness.
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                Schedule a governance workshop with editorial leadership this week.
              </p>
            </article>
          </ComponentTile>
          <ComponentTile name="Chart tile" description="Container shell that frames Recharts visualizations consistently.">
            <div className="flex h-32 items-end gap-1.5 border border-border bg-background p-3">
              {[18, 26, 22, 34, 42, 48, 56, 64, 60, 72, 80, 88].map((h, i) => (
                <div key={i} className="flex-1 bg-foreground/85" style={{ height: `${h}%` }} />
              ))}
            </div>
          </ComponentTile>
          <ComponentTile name="Empty state" description="Calm empty state used when filters return no rows.">
            <div className="flex flex-col items-center gap-3 border border-dashed border-border py-10 text-center">
              <div className="font-serif text-xl text-foreground/80">No teams match these filters.</div>
              <p className="text-[12.5px] text-muted-foreground">
                Try a broader department or remove the risk filter.
              </p>
            </div>
          </ComponentTile>
        </div>
      </section>

      <EditorialQuote eyebrow="Closing note" attribution="— Designer's note">
        The aesthetic is on purpose. A workspace about responsible AI ought to feel
        like a place where careful work gets done.
      </EditorialQuote>
    </div>
  );
}

function Principle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <article className="flex flex-col gap-4 bg-background p-8">
      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </div>
      <h3 className="font-serif text-3xl leading-tight tracking-tight">{title}</h3>
      <p className="text-[14px] leading-relaxed text-muted-foreground">{body}</p>
    </article>
  );
}

function ComponentTile({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className="flex flex-col gap-5 bg-background p-7">
      <header>
        <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Component
        </div>
        <h3 className="mt-1 font-serif text-2xl tracking-tight">{name}</h3>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>
      <div className="flex min-h-[100px] flex-col justify-center border-t border-dashed border-border pt-5">
        {children}
      </div>
    </article>
  );
}
