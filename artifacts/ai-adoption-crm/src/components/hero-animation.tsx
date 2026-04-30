import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

type Fragment = {
  id: string;
  label: string;
  // Random scattered position (Phase 1) — percent of canvas
  scatterX: number;
  scatterY: number;
  scatterRot: number;
  // Target position inside the structured CRM mock (Phase 2) — pixel offsets within the target tile
  // Slot identifier — what structured element it lands inside
  slot:
    | "card1-tool1"
    | "card1-tool2"
    | "card1-risk"
    | "card2-tool1"
    | "card2-tool2"
    | "card2-risk"
    | "card3-tool1"
    | "card3-tool2"
    | "pipeline-pilot"
    | "pipeline-active"
    | "chart-label"
    | "chart-anomaly";
  toneOnLand?: "default" | "accent" | "risk";
};

const FRAGMENTS: Fragment[] = [
  { id: "f1", label: "Cursor pilot",        scatterX: 6,  scatterY: 14, scatterRot: -8,  slot: "card1-tool1" },
  { id: "f2", label: "ChatGPT usage spike", scatterX: 18, scatterY: 70, scatterRot: 5,   slot: "chart-label", toneOnLand: "accent" },
  { id: "f3", label: "Copilot adoption",    scatterX: 32, scatterY: 8,  scatterRot: 4,   slot: "card1-tool2" },
  { id: "f4", label: "Design workshop",     scatterX: 70, scatterY: 12, scatterRot: -3,  slot: "pipeline-active" },
  { id: "f5", label: "Governance risk",     scatterX: 84, scatterY: 28, scatterRot: 7,   slot: "card1-risk", toneOnLand: "risk" },
  { id: "f6", label: "Prototype shipped",   scatterX: 88, scatterY: 76, scatterRot: -6,  slot: "pipeline-active" },
  { id: "f7", label: "Codex experiment",    scatterX: 12, scatterY: 42, scatterRot: 9,   slot: "card2-tool1" },
  { id: "f8", label: "Claude review",       scatterX: 76, scatterY: 58, scatterRot: -5,  slot: "card2-tool2" },
  { id: "f9", label: "Figma Make demo",     scatterX: 58, scatterY: 80, scatterRot: 6,   slot: "card3-tool1" },
  { id: "f10", label: "Office hours",       scatterX: 44, scatterY: 6,  scatterRot: -7,  slot: "pipeline-pilot" },
  { id: "f11", label: "Anomaly detected",   scatterX: 4,  scatterY: 84, scatterRot: 4,   slot: "chart-anomaly", toneOnLand: "risk" },
  { id: "f12", label: "Champion identified", scatterX: 60, scatterY: 38, scatterRot: -4, slot: "card3-tool2", toneOnLand: "accent" },
];

const PHASES = {
  scatter: 0,
  organize: 1500,
  reveal: 3000,
  done: 4200,
};

type Phase = "scatter" | "organize" | "reveal" | "done";

export function HeroAnimation() {
  const [phase, setPhase] = useState<Phase>("scatter");

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("organize"), PHASES.organize));
    timers.push(window.setTimeout(() => setPhase("reveal"), PHASES.reveal));
    timers.push(window.setTimeout(() => setPhase("done"), PHASES.done));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const organized = phase !== "scatter";

  return (
    <div className="relative isolate w-full">
      {/* The CRM mock surface — appears beneath fragments during organize phase */}
      <div className="relative h-[340px] w-full sm:h-[420px] md:h-[480px]">
        {/* Subtle background grid */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: organized ? 1 : 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 80%)",
            opacity: 0.5,
          }}
        />

        {/* Three CRM elements: team cards (left), pipeline (middle), chart (right) */}
        <motion.div
          className="grid h-full grid-cols-12 gap-3 sm:gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: organized ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
        >
          {/* Team cards column */}
          <div className="col-span-7 flex flex-col gap-3 sm:col-span-5 md:gap-4">
            <MockTeamCard
              slotPrefix="card1"
              teamName="Engineering Platform"
              department="Engineering"
              fragments={FRAGMENTS.filter((f) => f.slot.startsWith("card1"))}
              showRisk
            />
            <MockTeamCard
              slotPrefix="card2"
              teamName="Editorial Standards"
              department="Editorial"
              fragments={FRAGMENTS.filter((f) => f.slot.startsWith("card2"))}
            />
            <MockTeamCard
              slotPrefix="card3"
              teamName="Brand Studio"
              department="Design"
              fragments={FRAGMENTS.filter((f) => f.slot.startsWith("card3"))}
            />
          </div>

          {/* Pipeline column — hidden on mobile to keep things readable */}
          <div className="hidden flex-col gap-2 sm:col-span-3 sm:flex">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Pipeline
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <MockPipelineColumn slotId="pipeline-pilot" stage="Pilot" />
              <MockPipelineColumn slotId="pipeline-active" stage="Active adoption" />
            </div>
          </div>

          {/* Chart column */}
          <div className="col-span-5 flex flex-col sm:col-span-4">
            <div className="flex items-baseline justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Weekly active AI users
              </div>
              <div className="font-serif text-xl tracking-tight text-foreground">
                <Counter from={0} to={942} active={organized} />
              </div>
            </div>
            <MockChart fragments={FRAGMENTS.filter((f) => f.slot.startsWith("chart"))} active={organized} />
          </div>
        </motion.div>

        {/* The fragments themselves — float above and animate to slot positions */}
        {FRAGMENTS.map((f, idx) => (
          <FragmentChip
            key={f.id}
            fragment={f}
            phase={phase}
            stagger={idx * 0.05}
          />
        ))}
      </div>

      {/* Reveal line + CTA */}
      <div className="mt-8 flex flex-col items-start gap-5 border-t border-border pt-8 md:flex-row md:items-baseline md:justify-between">
        <AnimatePresence>
          {(phase === "reveal" || phase === "done") && (
            <motion.p
              key="reveal-line"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-serif text-xl leading-snug tracking-tight text-foreground md:text-[26px]"
            >
              AI adoption is now visible, governable, and actionable.
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {(phase === "reveal" || phase === "done") && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <Link
                to="/teams"
                className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-2.5 text-[12.5px] font-medium uppercase tracking-[0.14em] text-background transition-opacity hover:opacity-90"
              >
                View the operating system
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------- Subcomponents ----------

function FragmentChip({
  fragment,
  phase,
  stagger,
}: {
  fragment: Fragment;
  phase: Phase;
  stagger: number;
}) {
  const organized = phase !== "scatter";
  const tone = fragment.toneOnLand ?? "default";

  return (
    <motion.div
      initial={{
        opacity: 0,
        left: `${fragment.scatterX}%`,
        top: `${fragment.scatterY}%`,
        rotate: fragment.scatterRot,
        scale: 0.95,
      }}
      animate={
        organized
          ? {
              opacity: 1,
              // Move into target slot using CSS layout — we use a layoutId approach below for the slot.
              // Here we hide the floating chip after organize starts; the slot version takes over.
              left: `${fragment.scatterX}%`,
              top: `${fragment.scatterY}%`,
              rotate: 0,
            }
          : {
              opacity: [0, 0.85, 0.85],
              left: `${fragment.scatterX}%`,
              top: `${fragment.scatterY}%`,
              rotate: fragment.scatterRot + (Math.sin(stagger * 30) * 1),
              scale: 1,
            }
      }
      transition={
        organized
          ? { duration: 0.4, delay: stagger * 0.5, ease: "easeOut" }
          : { duration: 0.6, delay: stagger, ease: "easeOut" }
      }
      style={{ position: "absolute" }}
      className="pointer-events-none"
    >
      <span
        className={
          "inline-flex select-none items-center rounded-full border bg-background/90 px-2.5 py-0.5 text-[10.5px] font-medium tracking-tight backdrop-blur-sm " +
          (tone === "risk"
            ? "border-[hsl(8_60%_85%)] text-[hsl(8_62%_36%)] dark:border-[hsl(8_30%_28%)] dark:text-[hsl(8_60%_72%)]"
            : tone === "accent"
              ? "border-[hsl(158_28%_75%)] text-[hsl(158_32%_28%)] dark:border-[hsl(158_25%_30%)] dark:text-[hsl(158_32%_70%)]"
              : "border-border text-foreground/80")
        }
        style={{ opacity: organized ? 0 : undefined, transition: "opacity .25s ease" }}
      >
        {fragment.label}
      </span>
    </motion.div>
  );
}

function MockTeamCard({
  slotPrefix,
  teamName,
  department,
  fragments,
  showRisk,
}: {
  slotPrefix: string;
  teamName: string;
  department: string;
  fragments: Fragment[];
  showRisk?: boolean;
}) {
  const tool1 = fragments.find((f) => f.slot === `${slotPrefix}-tool1`);
  const tool2 = fragments.find((f) => f.slot === `${slotPrefix}-tool2`);
  const risk = fragments.find((f) => f.slot === `${slotPrefix}-risk`);
  return (
    <div className="flex items-center justify-between border border-border bg-card px-3 py-2.5 md:px-4 md:py-3">
      <div className="min-w-0">
        <div className="truncate font-serif text-[14px] tracking-tight">{teamName}</div>
        <div className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">{department}</div>
      </div>
      <div className="flex items-center gap-1.5">
        {tool1 && <SlotChip label={tool1.label} delay={0.4} />}
        {tool2 && <SlotChip label={tool2.label} delay={0.55} />}
        {showRisk && risk && <SlotChip label={risk.label} delay={0.7} tone="risk" />}
      </div>
    </div>
  );
}

function MockPipelineColumn({ slotId, stage }: { slotId: Fragment["slot"]; stage: string }) {
  const item = FRAGMENTS.find((f) => f.slot === slotId);
  return (
    <div className="flex flex-1 flex-col gap-1.5 border border-dashed border-border p-2">
      <div className="text-[9.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {stage}
      </div>
      {item && <SlotChip label={item.label} delay={0.5} block />}
    </div>
  );
}

function MockChart({ fragments, active }: { fragments: Fragment[]; active: boolean }) {
  const main = fragments.find((f) => f.slot === "chart-label");
  const anomaly = fragments.find((f) => f.slot === "chart-anomaly");
  // 12 sample bars
  const heights = [22, 30, 28, 38, 44, 50, 48, 58, 62, 70, 76, 84];
  return (
    <div className="mt-3 flex flex-1 flex-col border border-border bg-card p-3 md:p-4">
      <div className="flex items-center gap-1.5">
        {main && <SlotChip label={main.label} delay={0.5} tone="accent" />}
        {anomaly && <SlotChip label={anomaly.label} delay={0.65} tone="risk" />}
      </div>
      <div className="mt-3 flex flex-1 items-end gap-1.5">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: active ? `${h}%` : 0 }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.04, ease: "easeOut" }}
            className="flex-1 bg-foreground/85"
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>W1</span>
        <span>W12</span>
      </div>
    </div>
  );
}

function SlotChip({
  label,
  delay,
  tone = "default",
  block,
}: {
  label: string;
  delay: number;
  tone?: "default" | "accent" | "risk";
  block?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={
        "rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-tight " +
        (block ? "block w-fit " : "") +
        (tone === "risk"
          ? "border-[hsl(8_60%_85%)] bg-[hsl(8_60%_96%)] text-[hsl(8_62%_36%)] dark:border-[hsl(8_30%_28%)] dark:bg-[hsl(8_40%_14%)] dark:text-[hsl(8_60%_72%)]"
          : tone === "accent"
            ? "border-[hsl(158_28%_75%)] bg-[hsl(158_28%_94%)] text-[hsl(158_32%_24%)] dark:border-[hsl(158_25%_30%)] dark:bg-[hsl(158_25%_14%)] dark:text-[hsl(158_32%_70%)]"
            : "border-border bg-secondary text-foreground/80")
      }
    >
      {label}
    </motion.span>
  );
}

function Counter({ from, to, active }: { from: number; to: number; active: boolean }) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, from, to]);
  return <span className="tabular-nums">{val.toLocaleString()}</span>;
}
