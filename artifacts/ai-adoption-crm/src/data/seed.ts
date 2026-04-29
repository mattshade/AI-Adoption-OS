// AI Tool Adoption CRM — local mock dataset.
// Cross-referenced: team tools appear in usage events; risks/recommendations
// map to teams whose risk levels match.

export type Department =
  | "Engineering"
  | "Product"
  | "Design"
  | "Editorial"
  | "Marketing"
  | "Legal"
  | "Finance"
  | "HR"
  | "Data"
  | "Security"
  | "Operations";

export type AdoptionStage =
  | "Not started"
  | "Discovery"
  | "Pilot"
  | "Training scheduled"
  | "Active adoption"
  | "Scaled"
  | "Needs support";

export type EnablementStatus = "None" | "In progress" | "Completed" | "Stalled";
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type Region = "NA" | "EMEA" | "APAC";

export type ToolName =
  | "ChatGPT Enterprise"
  | "GitHub Copilot"
  | "Cursor"
  | "Claude Code"
  | "OpenAI Codex"
  | "Google Antigravity"
  | "Microsoft Copilot"
  | "Gemini"
  | "Figma Make";

export const TOOL_NAMES: ToolName[] = [
  "ChatGPT Enterprise",
  "GitHub Copilot",
  "Cursor",
  "Claude Code",
  "OpenAI Codex",
  "Google Antigravity",
  "Microsoft Copilot",
  "Gemini",
  "Figma Make",
];

export interface Team {
  id: string;
  name: string;
  department: Department;
  leader: string;
  champion: string;
  tools: ToolName[];
  adoptionStage: AdoptionStage;
  usageScore: number;
  enablementStatus: EnablementStatus;
  riskLevel: RiskLevel;
  lastTouchpoint: string;
  nextAction: string;
  notes: string;
  members: number;
  region: Region;
}

export interface Tool {
  id: string;
  name: ToolName;
  vendor: string;
  category: string;
  adoptionLevel: number;
  primaryUseCases: string[];
  departmentFit: Department[];
  governanceMaturity: number;
  productivityImpact: number;
  trustScore: number;
  riskLevel: RiskLevel;
  recommendation: "Adopt" | "Pilot" | "Monitor" | "Retire";
  description: string;
}

export interface DevAgentScore {
  agent: "Cursor" | "Codex" | "Copilot" | "Claude Code" | "Antigravity";
  autonomy: number;
  codebaseUnderstanding: number;
  safetyControl: number;
  developerTrust: number;
  productionReadiness: number;
  imageDesignSupport: number;
  enterpriseGovernance: number;
}

export interface UsageEvent {
  id: string;
  teamId: string;
  toolName: ToolName;
  date: string;
  eventType: "login" | "session" | "workflow_run" | "shared_artifact" | "feedback";
  durationMin: number;
  weekIndex: number;
}

export interface Interaction {
  id: string;
  teamId: string;
  owner: string;
  type:
    | "Office hours"
    | "Workshop"
    | "Tool onboarding"
    | "Security review"
    | "Prototype review"
    | "Leadership update"
    | "Follow-up needed";
  date: string;
  summary: string;
  outcome: string;
  nextStep: string;
}

export interface Risk {
  id: string;
  teamId: string;
  severity: RiskLevel;
  category:
    | "Data sensitivity"
    | "Compliance"
    | "Shadow IT"
    | "Vendor"
    | "Output quality"
    | "Cost";
  title: string;
  description: string;
  status: "Open" | "Mitigating" | "Resolved";
  opened: string;
}

export interface Recommendation {
  id: string;
  teamId: string;
  priority: "Low" | "Medium" | "High";
  title: string;
  rationale: string;
  suggestedOwner: string;
  dueIn: string;
  category: "Enablement" | "Governance" | "Tool change" | "Pilot" | "Consolidation";
}

export interface Insight {
  id: string;
  title: string;
  category: "Risk" | "Action" | "Anomaly" | "Consolidation" | "Enablement" | "Executive";
  body: string;
}

// ---------- TEAMS ----------
export const TEAMS: Team[] = [
  { id: "t01", name: "Design Systems", department: "Design", leader: "Mira Chen", champion: "Lukas Bauer", tools: ["Figma Make", "ChatGPT Enterprise", "Cursor"], adoptionStage: "Scaled", usageScore: 92, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-22", nextAction: "Document component governance for product orgs.", notes: "Moved from Pilot to Scaled after three enablement sessions and prototype support.", members: 9, region: "NA" },
  { id: "t02", name: "Engineering Platform", department: "Engineering", leader: "Anaya Iyer", champion: "Diego Romero", tools: ["GitHub Copilot", "Cursor", "Claude Code", "OpenAI Codex"], adoptionStage: "Active adoption", usageScore: 88, enablementStatus: "In progress", riskLevel: "Medium", lastTouchpoint: "2026-04-25", nextAction: "Stand up Cursor pilot governance to match Copilot baseline.", notes: "Strong Copilot adoption but rising Cursor experimentation outside policy.", members: 14, region: "NA" },
  { id: "t03", name: "Editorial Standards", department: "Editorial", leader: "Hannah Whitfield", champion: "Priya Subramanian", tools: ["ChatGPT Enterprise", "Gemini"], adoptionStage: "Active adoption", usageScore: 81, enablementStatus: "In progress", riskLevel: "High", lastTouchpoint: "2026-04-20", nextAction: "Run governance workshop on attribution and PII redaction.", notes: "High ChatGPT usage but low governance readiness — house style drift detected.", members: 11, region: "EMEA" },
  { id: "t04", name: "Brand Studio", department: "Design", leader: "Tomoko Arai", champion: "Owen Becker", tools: ["Figma Make", "ChatGPT Enterprise"], adoptionStage: "Pilot", usageScore: 64, enablementStatus: "In progress", riskLevel: "Low", lastTouchpoint: "2026-04-18", nextAction: "Schedule prototype review for campaign generator.", notes: "Pilot is generating reusable brand systems for downstream teams.", members: 7, region: "NA" },
  { id: "t05", name: "Legal Operations", department: "Legal", leader: "Sarah Goldfarb", champion: "Jules Rousseau", tools: ["ChatGPT Enterprise"], adoptionStage: "Discovery", usageScore: 32, enablementStatus: "None", riskLevel: "High", lastTouchpoint: "2026-04-12", nextAction: "Targeted enablement on retention and counsel review workflow.", notes: "Legal requires targeted enablement before expanding AI usage.", members: 6, region: "EMEA" },
  { id: "t06", name: "Revenue Operations", department: "Operations", leader: "Marcus Doyle", champion: "Elena Rodríguez", tools: ["ChatGPT Enterprise", "Microsoft Copilot"], adoptionStage: "Active adoption", usageScore: 76, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-24", nextAction: "Codify forecast playbook into shared workspace.", notes: "Quarterly forecasting cycle now AI-assisted across all segments.", members: 10, region: "NA" },
  { id: "t07", name: "Customer Insight", department: "Data", leader: "Yusra El-Sayed", champion: "Felix Andersen", tools: ["ChatGPT Enterprise", "Claude Code", "Gemini"], adoptionStage: "Active adoption", usageScore: 84, enablementStatus: "Completed", riskLevel: "Medium", lastTouchpoint: "2026-04-23", nextAction: "Review tool consolidation between Claude Code and Codex.", notes: "Three overlapping tools — consolidation opportunity identified.", members: 12, region: "EMEA" },
  { id: "t08", name: "Data Infrastructure", department: "Data", leader: "Rohan Verma", champion: "Kira Nakamura", tools: ["GitHub Copilot", "OpenAI Codex"], adoptionStage: "Scaled", usageScore: 89, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-26", nextAction: "Publish internal pattern library for pipeline scaffolding.", notes: "Codex used for orchestration boilerplate; high trust in outputs.", members: 13, region: "APAC" },
  { id: "t09", name: "Security Engineering", department: "Security", leader: "Naomi Castillo", champion: "Theo Park", tools: ["GitHub Copilot", "Claude Code"], adoptionStage: "Pilot", usageScore: 58, enablementStatus: "In progress", riskLevel: "High", lastTouchpoint: "2026-04-19", nextAction: "Restrict to non-sensitive repositories until audit log is in place.", notes: "Pilot blocked on audit logging maturity for source code AI tools.", members: 8, region: "NA" },
  { id: "t10", name: "Growth Marketing", department: "Marketing", leader: "Camila Soares", champion: "Henrik Lund", tools: ["ChatGPT Enterprise", "Gemini", "Figma Make"], adoptionStage: "Scaled", usageScore: 90, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-25", nextAction: "Open enablement to regional campaign teams.", notes: "Sustained 4x velocity on landing-page experiments since pilot.", members: 11, region: "NA" },
  { id: "t11", name: "Product Discovery", department: "Product", leader: "Adit Banerjee", champion: "Saoirse O'Connor", tools: ["ChatGPT Enterprise", "Cursor", "Figma Make"], adoptionStage: "Active adoption", usageScore: 79, enablementStatus: "In progress", riskLevel: "Medium", lastTouchpoint: "2026-04-22", nextAction: "Build internal prompt library for opportunity sizing.", notes: "Cursor used by PMs for spec scaffolding — unusual but productive.", members: 9, region: "NA" },
  { id: "t12", name: "Editorial Photography", department: "Editorial", leader: "Jasper Wei", champion: "Mariana Diaz", tools: ["ChatGPT Enterprise"], adoptionStage: "Discovery", usageScore: 28, enablementStatus: "None", riskLevel: "Medium", lastTouchpoint: "2026-04-08", nextAction: "Run discovery interviews on metadata workflows.", notes: "Awaiting kickoff with editorial standards review.", members: 5, region: "NA" },
  { id: "t13", name: "Internal Tools", department: "Engineering", leader: "Wei Zhang", champion: "Ada Bello", tools: ["Cursor", "Claude Code", "GitHub Copilot"], adoptionStage: "Scaled", usageScore: 91, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-26", nextAction: "Mentor adjacent teams via paired office hours.", notes: "Reference team for safe Cursor adoption inside the policy envelope.", members: 12, region: "APAC" },
  { id: "t14", name: "Finance Planning", department: "Finance", leader: "Victoria Asante", champion: "Nikolai Petrov", tools: ["Microsoft Copilot", "ChatGPT Enterprise"], adoptionStage: "Pilot", usageScore: 55, enablementStatus: "In progress", riskLevel: "Medium", lastTouchpoint: "2026-04-17", nextAction: "Validate variance commentary workflow with controllership.", notes: "Pilot focused on close-cycle commentary; awaiting accuracy review.", members: 8, region: "NA" },
  { id: "t15", name: "People Analytics", department: "HR", leader: "Olamide Adeyemi", champion: "Ines Marchetti", tools: ["ChatGPT Enterprise", "Gemini"], adoptionStage: "Discovery", usageScore: 35, enablementStatus: "None", riskLevel: "High", lastTouchpoint: "2026-04-09", nextAction: "Define data sensitivity rules before extending to performance data.", notes: "Cannot proceed without confirmed PII redaction patterns.", members: 6, region: "EMEA" },
  { id: "t16", name: "Workplace Operations", department: "Operations", leader: "Brendan Kavanagh", champion: "Mei-Lin Hsu", tools: ["Microsoft Copilot"], adoptionStage: "Active adoption", usageScore: 70, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-21", nextAction: "Roll out office-hours digest to all regional managers.", notes: "Steady, unspectacular gains across logistics workflows.", members: 7, region: "EMEA" },
  { id: "t17", name: "Trust & Safety", department: "Security", leader: "Ravi Krishnan", champion: "Lila Hassani", tools: ["Claude Code", "ChatGPT Enterprise"], adoptionStage: "Needs support", usageScore: 41, enablementStatus: "Stalled", riskLevel: "Critical", lastTouchpoint: "2026-04-05", nextAction: "Reset scope; pause until incident review closes.", notes: "Stalled after governance escalation around moderation prompts.", members: 9, region: "NA" },
  { id: "t18", name: "Editorial Multimedia", department: "Editorial", leader: "Imani Powell", champion: "Sven Karlsson", tools: ["Figma Make", "ChatGPT Enterprise", "Gemini"], adoptionStage: "Pilot", usageScore: 60, enablementStatus: "In progress", riskLevel: "Medium", lastTouchpoint: "2026-04-19", nextAction: "Define attribution metadata for AI-assisted assets.", notes: "Working closely with editorial standards on disclosure norms.", members: 8, region: "NA" },
  { id: "t19", name: "Sales Engineering", department: "Engineering", leader: "Catalina Mendes", champion: "Dimitri Volkov", tools: ["GitHub Copilot", "Microsoft Copilot"], adoptionStage: "Active adoption", usageScore: 73, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-23", nextAction: "Add demo prep template to SE knowledge base.", notes: "Demo build cycle dropped from 3 days to 1.", members: 10, region: "NA" },
  { id: "t20", name: "Mobile Apps", department: "Engineering", leader: "Hiroshi Tanaka", champion: "Aurora Vega", tools: ["Cursor", "GitHub Copilot", "Claude Code"], adoptionStage: "Active adoption", usageScore: 80, enablementStatus: "In progress", riskLevel: "Medium", lastTouchpoint: "2026-04-24", nextAction: "Audit Cursor usage on credential-handling code paths.", notes: "Productivity strong; safety guardrails need reinforcement.", members: 11, region: "APAC" },
  { id: "t21", name: "Brand Marketing", department: "Marketing", leader: "Elliot Ferreira", champion: "Reina Park", tools: ["ChatGPT Enterprise", "Figma Make"], adoptionStage: "Active adoption", usageScore: 77, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-22", nextAction: "Document brand-safe prompt patterns for asset generation.", notes: "Aligned with editorial standards on tone and disclosure.", members: 9, region: "NA" },
  { id: "t22", name: "Compliance Engineering", department: "Legal", leader: "Margaux Lefèvre", champion: "Asher Goldman", tools: ["ChatGPT Enterprise", "GitHub Copilot"], adoptionStage: "Training scheduled", usageScore: 45, enablementStatus: "In progress", riskLevel: "High", lastTouchpoint: "2026-04-15", nextAction: "Complete July training cohort before any production usage.", notes: "Awaiting training before issuing access.", members: 7, region: "EMEA" },
  { id: "t23", name: "Customer Support", department: "Operations", leader: "Hana Suzuki", champion: "Kemal Yılmaz", tools: ["ChatGPT Enterprise", "Gemini"], adoptionStage: "Active adoption", usageScore: 75, enablementStatus: "Completed", riskLevel: "Medium", lastTouchpoint: "2026-04-21", nextAction: "Tune escalation routing on AI-assisted replies.", notes: "Drafting and triage benefit; macros library still WIP.", members: 14, region: "APAC" },
  { id: "t24", name: "Data Science", department: "Data", leader: "Nadia Rashid", champion: "Pablo Gutiérrez", tools: ["Claude Code", "OpenAI Codex", "ChatGPT Enterprise"], adoptionStage: "Scaled", usageScore: 87, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-25", nextAction: "Share notebook scaffolding patterns with Customer Insight.", notes: "Notebook-first workflow with strong reproducibility checks.", members: 12, region: "NA" },
  { id: "t25", name: "DevX", department: "Engineering", leader: "Eitan Halevi", champion: "Sloane Chen", tools: ["GitHub Copilot", "Cursor", "Claude Code", "Google Antigravity"], adoptionStage: "Pilot", usageScore: 62, enablementStatus: "In progress", riskLevel: "High", lastTouchpoint: "2026-04-20", nextAction: "Tighten Antigravity policy around external network access.", notes: "Antigravity pilot promising but introduces new risk surface.", members: 10, region: "NA" },
  { id: "t26", name: "Editorial Operations", department: "Editorial", leader: "Beatriz Alves", champion: "Tomás Iglesias", tools: ["ChatGPT Enterprise"], adoptionStage: "Not started", usageScore: 12, enablementStatus: "None", riskLevel: "Medium", lastTouchpoint: "2026-04-02", nextAction: "Run kickoff alongside Editorial Standards.", notes: "Awaiting governance pattern from standards team.", members: 6, region: "EMEA" },
  { id: "t27", name: "Marketing Analytics", department: "Marketing", leader: "Léa Dubois", champion: "Idris Quinn", tools: ["ChatGPT Enterprise", "Microsoft Copilot", "Gemini"], adoptionStage: "Active adoption", usageScore: 78, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-23", nextAction: "Adopt shared attribution prompt library.", notes: "Strong cross-region coordination on attribution work.", members: 9, region: "EMEA" },
  { id: "t28", name: "Treasury", department: "Finance", leader: "Konstantin Weiss", champion: "Amaru Choque", tools: ["Microsoft Copilot"], adoptionStage: "Discovery", usageScore: 30, enablementStatus: "None", riskLevel: "Medium", lastTouchpoint: "2026-04-10", nextAction: "Define data-handling rules for cash-flow modeling.", notes: "Sensitive data category requires governance pre-work.", members: 5, region: "EMEA" },
  { id: "t29", name: "Talent Acquisition", department: "HR", leader: "Wren Okafor", champion: "Júlia Santos", tools: ["ChatGPT Enterprise", "Gemini"], adoptionStage: "Pilot", usageScore: 53, enablementStatus: "In progress", riskLevel: "Medium", lastTouchpoint: "2026-04-18", nextAction: "Audit prompts for bias before extending to outreach.", notes: "Sourcing assistance only; no candidate-facing usage.", members: 8, region: "NA" },
  { id: "t30", name: "Strategic Finance", department: "Finance", leader: "Alessio Conti", champion: "Niamh Brady", tools: ["ChatGPT Enterprise", "Microsoft Copilot"], adoptionStage: "Active adoption", usageScore: 72, enablementStatus: "Completed", riskLevel: "Low", lastTouchpoint: "2026-04-24", nextAction: "Codify scenario-modeling workflow for IR cycle.", notes: "Quiet, steady program; high trust scores from finance leadership.", members: 7, region: "EMEA" },
];

// ---------- TOOLS ----------
export const TOOLS: Tool[] = [
  { id: "tool-chatgpt", name: "ChatGPT Enterprise", vendor: "OpenAI", category: "General assistant", adoptionLevel: 88, primaryUseCases: ["Research", "Drafting", "Analysis"], departmentFit: ["Editorial", "Marketing", "Legal", "Product", "Finance", "HR", "Operations"], governanceMaturity: 78, productivityImpact: 82, trustScore: 80, riskLevel: "Medium", recommendation: "Adopt", description: "Default general-purpose assistant. Strong governance posture; broad fit; requires retention and PII guardrails." },
  { id: "tool-copilot", name: "GitHub Copilot", vendor: "GitHub", category: "Developer assistant", adoptionLevel: 81, primaryUseCases: ["Code completion", "Refactoring", "Test scaffolding"], departmentFit: ["Engineering", "Data", "Security"], governanceMaturity: 92, productivityImpact: 78, trustScore: 86, riskLevel: "Low", recommendation: "Adopt", description: "Enterprise-grade governance and audit posture. Most mature controls of any developer assistant in the portfolio." },
  { id: "tool-cursor", name: "Cursor", vendor: "Anysphere", category: "Developer agent", adoptionLevel: 64, primaryUseCases: ["Multi-file edits", "Refactors", "Repo Q&A"], departmentFit: ["Engineering", "Data"], governanceMaturity: 58, productivityImpact: 88, trustScore: 78, riskLevel: "Medium", recommendation: "Adopt", description: "Strong multi-file reasoning and editing. Governance maturity trails Copilot; pair with code-handling policy." },
  { id: "tool-claude-code", name: "Claude Code", vendor: "Anthropic", category: "Developer agent", adoptionLevel: 52, primaryUseCases: ["Long-context reviews", "Spec generation", "Refactors"], departmentFit: ["Engineering", "Data", "Product"], governanceMaturity: 70, productivityImpact: 80, trustScore: 82, riskLevel: "Low", recommendation: "Pilot", description: "Excellent long-context behavior and clear safety posture. Pair with Cursor where multi-file edits are needed." },
  { id: "tool-codex", name: "OpenAI Codex", vendor: "OpenAI", category: "Developer agent", adoptionLevel: 49, primaryUseCases: ["Async repository tasks", "Code generation", "Test repair"], departmentFit: ["Engineering", "Data"], governanceMaturity: 64, productivityImpact: 84, trustScore: 80, riskLevel: "Medium", recommendation: "Pilot", description: "Strong asynchronous task execution. Best for time-bounded jobs with repository scope." },
  { id: "tool-antigravity", name: "Google Antigravity", vendor: "Google", category: "Agentic environment", adoptionLevel: 18, primaryUseCases: ["Multi-step automation", "Browser-based tasks"], departmentFit: ["Engineering"], governanceMaturity: 38, productivityImpact: 72, trustScore: 58, riskLevel: "High", recommendation: "Monitor", description: "Promising agentic surface but introduces new network-access risk. Keep tightly scoped pilots only." },
  { id: "tool-msft-copilot", name: "Microsoft Copilot", vendor: "Microsoft", category: "Productivity assistant", adoptionLevel: 70, primaryUseCases: ["Email drafting", "Document summarization", "Meeting notes"], departmentFit: ["Operations", "Finance", "HR", "Legal"], governanceMaturity: 84, productivityImpact: 70, trustScore: 80, riskLevel: "Low", recommendation: "Adopt", description: "Native fit with the productivity suite; strong sensitivity-label support; predictable behavior." },
  { id: "tool-gemini", name: "Gemini", vendor: "Google", category: "General assistant", adoptionLevel: 46, primaryUseCases: ["Research", "Multimodal analysis"], departmentFit: ["Editorial", "Marketing", "Data"], governanceMaturity: 68, productivityImpact: 74, trustScore: 72, riskLevel: "Medium", recommendation: "Pilot", description: "Strong multimodal performance; complement to ChatGPT Enterprise rather than a replacement." },
  { id: "tool-figma-make", name: "Figma Make", vendor: "Figma", category: "Design generator", adoptionLevel: 38, primaryUseCases: ["Layout exploration", "Marketing mocks"], departmentFit: ["Design", "Marketing", "Editorial"], governanceMaturity: 60, productivityImpact: 76, trustScore: 74, riskLevel: "Low", recommendation: "Pilot", description: "Bridges design and downstream marketing/editorial workflows; useful for variant exploration." },
];

// ---------- DEV AGENT SCORES ----------
export const DEV_AGENT_SCORES: DevAgentScore[] = [
  { agent: "Cursor",       autonomy: 8, codebaseUnderstanding: 9, safetyControl: 6, developerTrust: 8, productionReadiness: 7, imageDesignSupport: 4, enterpriseGovernance: 6 },
  { agent: "Codex",        autonomy: 9, codebaseUnderstanding: 8, safetyControl: 6, developerTrust: 8, productionReadiness: 7, imageDesignSupport: 4, enterpriseGovernance: 6 },
  { agent: "Copilot",      autonomy: 6, codebaseUnderstanding: 7, safetyControl: 9, developerTrust: 8, productionReadiness: 9, imageDesignSupport: 5, enterpriseGovernance: 9 },
  { agent: "Claude Code",  autonomy: 7, codebaseUnderstanding: 8, safetyControl: 8, developerTrust: 8, productionReadiness: 7, imageDesignSupport: 6, enterpriseGovernance: 7 },
  { agent: "Antigravity",  autonomy: 9, codebaseUnderstanding: 6, safetyControl: 4, developerTrust: 6, productionReadiness: 5, imageDesignSupport: 7, enterpriseGovernance: 4 },
];

export const DEV_AGENT_DIMENSIONS: Array<keyof Omit<DevAgentScore, "agent">> = [
  "autonomy",
  "codebaseUnderstanding",
  "safetyControl",
  "developerTrust",
  "productionReadiness",
  "imageDesignSupport",
  "enterpriseGovernance",
];

export const DEV_AGENT_DIMENSION_LABELS: Record<string, string> = {
  autonomy: "Autonomy",
  codebaseUnderstanding: "Codebase understanding",
  safetyControl: "Safety & control",
  developerTrust: "Developer trust",
  productionReadiness: "Production readiness",
  imageDesignSupport: "Image & design support",
  enterpriseGovernance: "Enterprise governance",
};

// ---------- USAGE EVENTS (deterministic generator) ----------
function dateForWeek(weekIdx: number, dayOffset: number): string {
  // Weeks counted backward from 2026-04-26 (Sunday-anchored).
  const anchor = new Date("2026-04-26T00:00:00Z");
  const d = new Date(anchor);
  d.setUTCDate(anchor.getUTCDate() - weekIdx * 7 + dayOffset);
  return d.toISOString().slice(0, 10);
}

function buildUsageEvents(): UsageEvent[] {
  const events: UsageEvent[] = [];
  const types: UsageEvent["eventType"][] = ["login", "session", "workflow_run", "shared_artifact", "feedback"];
  let counter = 0;
  for (const team of TEAMS) {
    const eventsPerTeam = Math.max(3, Math.round(team.usageScore / 18));
    for (let i = 0; i < eventsPerTeam; i++) {
      const tool = team.tools[(i + counter) % team.tools.length];
      const week = (i * 3 + counter) % 12;
      const day = (i + counter) % 7;
      const type = types[(i + counter) % types.length];
      const duration = 10 + ((i * 17 + counter) % 50);
      counter++;
      events.push({
        id: `u${String(counter).padStart(4, "0")}`,
        teamId: team.id,
        toolName: tool,
        date: dateForWeek(11 - week, day),
        eventType: type,
        durationMin: duration,
        weekIndex: week,
      });
      if (events.length >= 160) break;
    }
    if (events.length >= 160) break;
  }
  return events.slice(0, 160);
}

export const USAGE_EVENTS: UsageEvent[] = buildUsageEvents();

// ---------- INTERACTIONS ----------
const INTERACTION_OWNERS = ["Mira Chen", "Anaya Iyer", "Diego Romero", "Hannah Whitfield", "Sarah Goldfarb", "Marcus Doyle", "Yusra El-Sayed", "Naomi Castillo", "Camila Soares", "Wei Zhang", "Olamide Adeyemi"];
const INTERACTION_TYPES: Interaction["type"][] = ["Office hours", "Workshop", "Tool onboarding", "Security review", "Prototype review", "Leadership update", "Follow-up needed"];

const INTERACTION_TEMPLATES: Array<{ summary: string; outcome: string; nextStep: string }> = [
  { summary: "Reviewed enablement roadmap for Q2 cohort.", outcome: "Aligned on three pilot expansions.", nextStep: "Send pilot scope to platform team by Friday." },
  { summary: "Walked through prompt patterns for variance commentary.", outcome: "Two patterns approved by controllership.", nextStep: "Add patterns to shared library." },
  { summary: "Evaluated Cursor-driven refactor on legacy module.", outcome: "Refactor merged with two reviewer comments.", nextStep: "Document refactor pattern for adjacent teams." },
  { summary: "Security review of new agentic environment.", outcome: "Network egress restricted; sandbox approved.", nextStep: "Schedule penetration test before broader rollout." },
  { summary: "Discussed editorial disclosure norms.", outcome: "Disclosure footer drafted for AI-assisted pieces.", nextStep: "Editorial council to ratify disclosure language." },
  { summary: "Onboarding session for ChatGPT Enterprise.", outcome: "12 new active users by end of week.", nextStep: "Office hours scheduled for week three." },
  { summary: "Leadership review of adoption metrics.", outcome: "Investment case approved for Cursor expansion.", nextStep: "Refresh dashboard ahead of next QBR." },
  { summary: "Prototype review of campaign generator.", outcome: "Brand alignment confirmed; ready for staged rollout.", nextStep: "Prepare staged rollout plan." },
  { summary: "Follow-up on stalled training cohort.", outcome: "New cohort scheduled with reset agenda.", nextStep: "Send revised pre-read by next Monday." },
  { summary: "Workshop on AI-assisted spec writing.", outcome: "Eight new specs drafted live.", nextStep: "Curate three exemplars for the pattern library." },
];

function buildInteractions(): Interaction[] {
  const out: Interaction[] = [];
  let counter = 0;
  for (const team of TEAMS) {
    const count = team.adoptionStage === "Scaled" || team.adoptionStage === "Active adoption" ? 3 : 2;
    for (let i = 0; i < count; i++) {
      counter++;
      const t = INTERACTION_TEMPLATES[(counter + i) % INTERACTION_TEMPLATES.length];
      const type = INTERACTION_TYPES[(counter + i) % INTERACTION_TYPES.length];
      const owner = INTERACTION_OWNERS[(counter + i) % INTERACTION_OWNERS.length];
      const week = (i * 4 + counter) % 12;
      const day = (counter + i * 2) % 7;
      out.push({
        id: `i${String(counter).padStart(4, "0")}`,
        teamId: team.id,
        owner,
        type,
        date: dateForWeek(11 - week, day),
        summary: t.summary,
        outcome: t.outcome,
        nextStep: t.nextStep,
      });
      if (out.length >= 60) return out;
    }
  }
  return out;
}

export const INTERACTIONS: Interaction[] = buildInteractions();

// ---------- RISKS ----------
const RISK_TEMPLATES: Array<{ category: Risk["category"]; title: string; description: string }> = [
  { category: "Data sensitivity", title: "Customer PII in prompt history", description: "Detected PII references in shared workspace prompts; redaction pattern needed." },
  { category: "Compliance", title: "Region-specific retention policy missing", description: "EMEA workspace lacks documented retention policy for AI session logs." },
  { category: "Shadow IT", title: "Unsanctioned developer agent in use", description: "Activity logs show usage of an unapproved developer agent in two repositories." },
  { category: "Vendor", title: "Vendor SOC 2 attestation pending refresh", description: "Annual SOC 2 attestation from vendor has lapsed; renewal in progress." },
  { category: "Output quality", title: "Hallucinated citations in editorial drafts", description: "Two drafts with hallucinated citations slipped past first review." },
  { category: "Cost", title: "Monthly token spend trending 38% above plan", description: "Forecasting model attributes overrun to long-context drafting workflows." },
  { category: "Data sensitivity", title: "Source code uploaded to consumer-tier tool", description: "One incident of repository code shared with a non-enterprise tier tool." },
  { category: "Compliance", title: "Counsel review missing on legal AI prompts", description: "Counsel review required before legal team expands AI usage." },
];

function buildRisks(): Risk[] {
  const out: Risk[] = [];
  const sevByLevel: Record<RiskLevel, RiskLevel> = { Low: "Low", Medium: "Medium", High: "High", Critical: "Critical" };
  const statuses: Risk["status"][] = ["Open", "Mitigating", "Resolved"];
  let counter = 0;
  for (const team of TEAMS) {
    const baseCount = team.riskLevel === "Critical" ? 3 : team.riskLevel === "High" ? 2 : team.riskLevel === "Medium" ? 1 : 1;
    for (let i = 0; i < baseCount; i++) {
      counter++;
      if (out.length >= 40) return out;
      const t = RISK_TEMPLATES[(counter + i) % RISK_TEMPLATES.length];
      out.push({
        id: `r${String(counter).padStart(4, "0")}`,
        teamId: team.id,
        severity: sevByLevel[team.riskLevel],
        category: t.category,
        title: t.title,
        description: t.description,
        status: statuses[(counter + i) % statuses.length],
        opened: dateForWeek(((counter + i) % 11) + 1, (counter + i) % 5),
      });
    }
  }
  return out;
}

export const RISKS: Risk[] = buildRisks();

// ---------- RECOMMENDATIONS ----------
const REC_TEMPLATES: Array<Pick<Recommendation, "title" | "rationale" | "category" | "priority" | "dueIn">> = [
  { title: "Schedule governance workshop", rationale: "High usage with low governance readiness creates audit exposure.", category: "Enablement", priority: "High", dueIn: "this week" },
  { title: "Consolidate overlapping developer agents", rationale: "Three overlapping tools dilute investment and trust.", category: "Consolidation", priority: "Medium", dueIn: "next sprint" },
  { title: "Open Cursor pilot with controlled scope", rationale: "Demand is real; structured pilot beats unsanctioned use.", category: "Pilot", priority: "Medium", dueIn: "next 2 weeks" },
  { title: "Pause production usage pending audit log", rationale: "Source-code AI tools require audit logging maturity.", category: "Governance", priority: "High", dueIn: "this week" },
  { title: "Run targeted onboarding for legal team", rationale: "Targeted enablement unblocks responsible expansion.", category: "Enablement", priority: "High", dueIn: "next 2 weeks" },
  { title: "Retire one chat tool from this team's workspace", rationale: "Two chat tools used interchangeably; pick one.", category: "Tool change", priority: "Low", dueIn: "this quarter" },
  { title: "Extend office hours cadence to weekly", rationale: "Teams with weekly office hours show 27% higher WAU.", category: "Enablement", priority: "Medium", dueIn: "next sprint" },
  { title: "Add governance pre-read to next workshop", rationale: "Workshop attendees lack shared baseline on policy.", category: "Governance", priority: "Medium", dueIn: "this week" },
];

function buildRecommendations(): Recommendation[] {
  const out: Recommendation[] = [];
  let counter = 0;
  for (const team of TEAMS) {
    if (out.length >= 30) break;
    counter++;
    const t = REC_TEMPLATES[counter % REC_TEMPLATES.length];
    out.push({
      id: `rec${String(counter).padStart(4, "0")}`,
      teamId: team.id,
      priority: t.priority,
      title: t.title,
      rationale: t.rationale,
      suggestedOwner: team.champion,
      dueIn: t.dueIn,
      category: t.category,
    });
  }
  return out;
}

export const RECOMMENDATIONS: Recommendation[] = buildRecommendations();

// ---------- DASHBOARD METRICS ----------
export const METRICS = {
  totalActiveUsers: 1284,
  adoptionRate: 0.62,
  weeklyActiveAIUsers: 942,
  enablementSessionsCompleted: 87,
  productivityIndex: 74,
  governanceReadiness: 68,
  risksOpen: 27,
  risksCritical: 3,
  prototypesShipped: 41,
  toolsInPortfolio: TOOLS.length,
  teamsTracked: TEAMS.length,
  topGrowthTeam: "Design Systems",
  topRiskTeam: "Trust & Safety",
};

// ---------- WEEKLY ACTIVE USERS BY TOOL ----------
export const WEEKLY_ACTIVE_BY_TOOL = (() => {
  const baseLines: Record<string, number[]> = {
    "ChatGPT Enterprise": [180, 195, 210, 222, 240, 256, 268, 280, 290, 305, 312, 318],
    "GitHub Copilot":     [120, 130, 142, 156, 168, 178, 188, 196, 204, 210, 216, 222],
    "Cursor":             [40, 46, 55, 62, 70, 80, 92, 102, 114, 126, 138, 148],
    "Claude Code":        [22, 28, 34, 41, 48, 56, 62, 70, 78, 84, 92, 98],
    "OpenAI Codex":       [18, 22, 28, 33, 38, 44, 49, 55, 61, 66, 71, 76],
    "Microsoft Copilot":  [80, 88, 94, 102, 110, 118, 124, 130, 136, 142, 148, 152],
    "Gemini":             [22, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82, 86],
    "Figma Make":         [12, 18, 24, 30, 36, 42, 48, 54, 60, 64, 68, 72],
    "Google Antigravity": [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
  };
  const rows: Array<Record<string, number | string>> = [];
  for (let w = 0; w < 12; w++) {
    const row: Record<string, number | string> = { week: `W${w + 1}` };
    for (const k of Object.keys(baseLines)) {
      row[k] = baseLines[k][w];
    }
    rows.push(row);
  }
  return rows;
})();

// ---------- ADOPTION BY DEPARTMENT ----------
export const ADOPTION_BY_DEPARTMENT = (() => {
  const departments: Department[] = ["Engineering", "Product", "Design", "Editorial", "Marketing", "Legal", "Finance", "HR", "Data", "Security", "Operations"];
  const counts: Record<Department, { scaled: number; active: number; pilot: number; discovery: number; notStarted: number }> = {} as Record<Department, { scaled: number; active: number; pilot: number; discovery: number; notStarted: number }>;
  for (const d of departments) counts[d] = { scaled: 0, active: 0, pilot: 0, discovery: 0, notStarted: 0 };
  for (const team of TEAMS) {
    const c = counts[team.department];
    if (team.adoptionStage === "Scaled") c.scaled++;
    else if (team.adoptionStage === "Active adoption") c.active++;
    else if (team.adoptionStage === "Pilot" || team.adoptionStage === "Training scheduled") c.pilot++;
    else if (team.adoptionStage === "Discovery") c.discovery++;
    else c.notStarted++;
  }
  return departments.map((d) => ({ department: d, ...counts[d] }));
})();

// ---------- ENABLEMENT IMPACT ----------
export const ENABLEMENT_IMPACT = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  sessions: 4 + i + ((i * 3) % 5),
  adoption: 32 + i * 4 + ((i * 7) % 6),
}));

// ---------- RISK DISTRIBUTION ----------
export const RISK_DISTRIBUTION = (() => {
  const counts: Record<RiskLevel, number> = { Low: 0, Medium: 0, High: 0, Critical: 0 };
  for (const r of RISKS) counts[r.severity]++;
  return [
    { name: "Low", value: counts.Low },
    { name: "Medium", value: counts.Medium },
    { name: "High", value: counts.High },
    { name: "Critical", value: counts.Critical },
  ];
})();

// ---------- TOOL SATISFACTION ----------
export const TOOL_SATISFACTION = TOOLS.map((t) => ({
  tool: t.name,
  score: Math.min(96, Math.round(t.trustScore * 0.55 + t.productivityImpact * 0.45)),
}));

// ---------- GOVERNANCE READINESS BY DEPARTMENT ----------
export const GOVERNANCE_READINESS = (() => {
  const departments: Department[] = ["Engineering", "Product", "Design", "Editorial", "Marketing", "Legal", "Finance", "HR", "Data", "Security", "Operations"];
  const baseline: Record<Department, number> = {
    Engineering: 78, Product: 70, Design: 74, Editorial: 48, Marketing: 66, Legal: 52,
    Finance: 64, HR: 58, Data: 76, Security: 80, Operations: 70,
  };
  return departments.map((d) => ({ department: d, score: baseline[d] }));
})();

// ---------- PROTOTYPE VELOCITY ----------
export const PROTOTYPE_VELOCITY = TEAMS.slice(0, 8).map((t, idx) => ({
  team: t.name,
  points: Array.from({ length: 8 }, (_, i) => 4 + ((idx + i * 3) % 9)),
}));

// ---------- USAGE BY ROLE ----------
export const USAGE_BY_ROLE = [
  { role: "Engineer", value: 412 },
  { role: "Designer", value: 98 },
  { role: "PM", value: 142 },
  { role: "Editor", value: 86 },
  { role: "Analyst", value: 124 },
  { role: "Marketer", value: 116 },
  { role: "Legal", value: 38 },
  { role: "HR", value: 42 },
  { role: "Finance", value: 64 },
  { role: "Operator", value: 78 },
  { role: "Security", value: 56 },
];

// ---------- INSIGHTS ----------
export const INSIGHTS: Insight[] = [
  { id: "ins-01", category: "Executive", title: "Design Systems moved from Pilot to Scaled after three enablement sessions and prototype support.", body: "A tight feedback loop of office hours and prototype review accelerated trust in tooling. Replicate the pattern across Brand Studio and Editorial Multimedia." },
  { id: "ins-02", category: "Risk", title: "Editorial has high ChatGPT usage but low governance readiness.", body: "Usage continues to grow without a clear disclosure or attribution standard. Schedule a governance workshop with editorial leadership this week." },
  { id: "ins-03", category: "Anomaly", title: "Engineering Platform shows strong Copilot adoption but rising Cursor experimentation.", body: "Cursor activity is growing 18% week over week. Open a structured Cursor pilot before unsanctioned use becomes the norm." },
  { id: "ins-04", category: "Enablement", title: "Legal requires targeted enablement before expanding AI usage.", body: "Counsel-led enablement should precede any expansion. A 2-session program covering retention and review patterns is recommended." },
  { id: "ins-05", category: "Executive", title: "Teams with office hours show 27% higher weekly active usage.", body: "The single highest-leverage program in the portfolio. Extend office hours to all teams in Active adoption or beyond." },
  { id: "ins-06", category: "Risk", title: "Trust & Safety needs reset before further activity.", body: "An incident review remains open. Pause expansion and revisit scope after closure." },
  { id: "ins-07", category: "Consolidation", title: "Customer Insight runs three overlapping general assistants.", body: "ChatGPT Enterprise, Claude Code, and Gemini overlap on research workflows. Consolidate to two tools to reduce dilution." },
  { id: "ins-08", category: "Action", title: "Schedule prototype review for Brand Studio campaign generator.", body: "The pilot is producing reusable systems. Capture them in the brand pattern library before adoption ships." },
  { id: "ins-09", category: "Anomaly", title: "Antigravity activity expanding outside DevX.", body: "Two adjacent teams have begun trial usage without governance review. Restate scope before further trials begin." },
  { id: "ins-10", category: "Enablement", title: "Suggested enablement: Microsoft Copilot for Operations cohort.", body: "Workplace Operations and Customer Support have plateaued at moderate usage. A targeted Copilot workshop will move them up the curve." },
  { id: "ins-11", category: "Executive", title: "Adoption rate up 7 points quarter over quarter.", body: "Most growth came from Active adoption stage; very few teams progressed all the way to Scaled. Invest in scaling support." },
  { id: "ins-12", category: "Risk", title: "Two teams are running source-code AI on credential-handling paths.", body: "Mobile Apps and DevX flagged for review. Audit Cursor usage on auth modules before next release." },
  { id: "ins-13", category: "Consolidation", title: "Consider retiring one productivity assistant in Operations.", body: "Microsoft Copilot is already the de facto choice; ChatGPT Enterprise usage has plateaued in Operations workflows." },
  { id: "ins-14", category: "Action", title: "Run a champions roundtable in EMEA region.", body: "EMEA champions are coordinating informally; formalize the cohort to compound learning." },
  { id: "ins-15", category: "Anomaly", title: "Editorial Operations is dormant despite high request volume.", body: "Twelve enablement requests opened in the last six weeks but no kickoff scheduled. Pair with Editorial Standards immediately." },
];

// ---------- COMPONENT EXAMPLES (for Design System page) ----------
export const COMPONENT_EXAMPLES = [
  { name: "Risk tag", description: "Compact pill that surfaces team risk posture across tables and cards.", kind: "tag" as const },
  { name: "Adoption stage badge", description: "Pipeline-aware badge with subtle stage shading.", kind: "badge" as const },
  { name: "Recommendation badge", description: "Adopt / Pilot / Monitor / Retire signal for tool portfolio cards.", kind: "badge" as const },
  { name: "Score bar", description: "Editorial mini bar for usage, governance, and trust metrics.", kind: "metric" as const },
  { name: "Team CRM row", description: "Standard row pattern used across Teams CRM and pipeline lists.", kind: "table-row" as const },
  { name: "Insight card", description: "Editorial insight pattern used across Insights and home callouts.", kind: "insight" as const },
  { name: "Chart tile", description: "Container shell that frames Recharts visualizations consistently.", kind: "chart-tile" as const },
  { name: "Empty state", description: "Calm empty state used when filters return no rows.", kind: "empty-state" as const },
];

// ---------- HELPERS ----------
export function teamById(id: string): Team | undefined {
  return TEAMS.find((t) => t.id === id);
}
export function risksForTeam(id: string): Risk[] {
  return RISKS.filter((r) => r.teamId === id);
}
export function interactionsForTeam(id: string): Interaction[] {
  return INTERACTIONS.filter((i) => i.teamId === id);
}
export function recommendationsForTeam(id: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.teamId === id);
}
export function usageForTeam(id: string): UsageEvent[] {
  return USAGE_EVENTS.filter((e) => e.teamId === id);
}

export function relativeFromToday(iso: string): string {
  const today = new Date("2026-04-29T00:00:00Z");
  const d = new Date(iso + "T00:00:00Z");
  const days = Math.round((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return "1 month ago";
  return `${Math.floor(days / 30)} months ago`;
}
