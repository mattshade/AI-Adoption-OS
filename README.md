# AI Adoption OS

A **pnpm monorepo** for building and operating an **AI adoption / CRM-style product**: React front ends (Vite), an **Express** API server, shared **Drizzle ORM** schemas for PostgreSQL, typed API contracts (**Zod** + optional **Orval** codegen), and tooling scripts. The workspace is tuned for safe dependency installs (**minimum package release age**) and consistent versions via a **pnpm catalog**.

---

## Table of contents

- [Repository layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Root scripts](#root-scripts)
- [Packages at a glance](#packages-at-a-glance)
- [Local development](#local-development)
- [Environment variables](#environment-variables)
- [Database (Drizzle)](#database-drizzle)
- [API contract & clients](#api-contract--clients)
- [pnpm catalog & security](#pnpm-catalog--security)
- [Tooling](#tooling)
- [License](#license)

---

## Repository layout

```
AI-Adoption-OS/
├── artifacts/                    # Runnable applications (deployable units)
│   ├── ai-adoption-crm/          # Primary CRM UI — Vite + React + Radix + Tailwind v4
│   ├── api-server/               # Express API — Drizzle, logging (pino)
│   └── mockup-sandbox/           # Secondary Vite app — UI/mock exploration
├── lib/                          # Shared libraries (workspace packages)
│   ├── db/                       # Drizzle schema + Postgres (DATABASE_URL)
│   ├── api-zod/                  # Shared Zod schemas/types for APIs
│   ├── api-spec/                 # OpenAPI / Orval codegen entry (`pnpm run codegen`)
│   └── api-client-react/         # React Query–oriented API helpers (workspace:*)
├── scripts/                      # Misc TS utilities (`pnpm --filter @workspace/scripts hello`)
├── package.json                  # Root workspace scripts + meta
├── pnpm-workspace.yaml           # Workspace globs + dependency catalog + release-age policy
└── pnpm-lock.yaml                # Lockfile (commit this)
```

---

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| **Node.js** | Active LTS recommended (align with `catalog` / CI expectations). |
| **pnpm** | **Required.** Root `preinstall` rejects npm/yarn installs (`Use pnpm instead`). |
| **PostgreSQL** | Needed when running migrations/pushes against `@workspace/db` (provide `DATABASE_URL`). |

Install pnpm globally if needed:

```bash
npm install -g pnpm
```

---

## Install

From the repository root:

```bash
pnpm install
```

Do **not** use `npm install` or `yarn install` at the root (they are blocked by design).

---

## Root scripts

Defined in the root `package.json`:

| Script | Purpose |
|--------|---------|
| `pnpm run build` | Runs workspace **typecheck**, then **`pnpm -r --if-present run build`** on packages that define `build`. |
| `pnpm run typecheck` | Typechecks shared libs + filtered artifacts/scripts (`./artifacts/**`, `./scripts`). |
| `pnpm run typecheck:libs` | `tsc --build` for composite TS projects. |

Run **full build + typecheck** before merging significant changes:

```bash
pnpm run build
```

---

## Packages at a glance

| Package | Path | Role |
|---------|------|------|
| `@workspace/ai-adoption-crm` | `artifacts/ai-adoption-crm` | Main **SPA**: React 19, **Vite 7**, **Tailwind v4**, Radix UI, **wouter**, TanStack Query via `@workspace/api-client-react`, charts (**Recharts**), forms (**react-hook-form** + **zod**). Dev server defaults to port **5173** (override with `PORT`). |
| `@workspace/api-server` | `artifacts/api-server` | **Express 5** HTTP API, **esbuild** bundle to `dist/`, structured logging (**pino**). **Requires `PORT`** at runtime. |
| `@workspace/mockup-sandbox` | `artifacts/mockup-sandbox` | Separate Vite app for mockups / experimentation. |
| `@workspace/db` | `lib/db` | **Drizzle ORM** schema + Postgres; use **`pnpm run push`** (see below). Requires **`DATABASE_URL`**. |
| `@workspace/api-zod` | `lib/api-zod` | Shared **Zod** models consumed by server/clients. |
| `@workspace/api-spec` | `lib/api-spec` | **Orval** codegen (`pnpm run codegen` inside package). |
| `@workspace/api-client-react` | `lib/api-client-react` | Thin React-oriented API surface (peer: React ≥ 18). |
| `@workspace/scripts` | `scripts` | Example TS scripts (`hello`). |

---

## Local development

### CRM front end (`ai-adoption-crm`)

```bash
pnpm --filter @workspace/ai-adoption-crm dev
```

- Opens **Vite** dev server (default **http://localhost:5173** unless `PORT` / `BASE_PATH` override — see `vite.config.ts`).

### API server (`api-server`)

Build bundles then start Node (the package `dev` script builds then runs `start`):

```bash
cd artifacts/api-server
PORT=3001 pnpm run dev
```

Or from root after setting **`PORT`**:

```bash
export PORT=3001
pnpm --filter @workspace/api-server dev
```

### Mockup sandbox

```bash
pnpm --filter @workspace/mockup-sandbox dev
```

### Scripts package

```bash
pnpm --filter @workspace/scripts hello
```

---

## Environment variables

| Variable | Where | Purpose |
|----------|--------|---------|
| **`PORT`** | `artifacts/api-server` | **Required** — HTTP listen port (validated at startup). |
| **`LOG_LEVEL`** | `api-server` | Optional — pino level (default `info`). |
| **`DATABASE_URL`** | `lib/db` (Drizzle CLI) | **Required** for `drizzle-kit push` — PostgreSQL connection string. |
| **`NODE_ENV`** | Various | Standard Node / bundler behavior. |
| **`BASE_PATH`** | `ai-adoption-crm` Vite | Optional — asset base path (default `/`). |

Create a **`.env`** or shell exports appropriate for your machine; keep secrets out of git (only `node_modules` is gitignored in this repo’s minimal `.gitignore` — **add `.env` if you store secrets locally**).

---

## Database (Drizzle)

Schemas live under **`lib/db`**. With **`DATABASE_URL`** set:

```bash
pnpm --filter @workspace/db push
```

Use **`push-force`** only when you understand destructive drift implications (`package.json` scripts in `@workspace/db`).

---

## API contract & clients

- **`@workspace/api-zod`** — canonical Zod shapes for API payloads/responses.
- **`@workspace/api-spec`** — hosts Orval config; run **`pnpm run codegen`** inside that package after updating OpenAPI/spec sources (script chains workspace lib typecheck).

Wire the CRM to your API base URL via whatever convention your `api-client-react` layer expects (extend env-based base URL in client code as the project evolves).

---

## pnpm catalog & security

`pnpm-workspace.yaml` defines:

- **`catalog:`** — pinned dependency versions shared across packages (`react`, `vite`, `zod`, etc.).
- **`minimumReleaseAge: 1440`** — npm packages must be published **≥ 1 day** before install (supply-chain mitigation). Exceptions include **`@replit/*`** and **`stripe-replit-sync`**.
- **esbuild / rollup / lightningcss overrides** — trims optional platform binaries where applicable.

**Do not disable `minimumReleaseAge` casually.** Use **`minimumReleaseAgeExclude`** only for trusted urgent pins and remove exclusions once versions age in.

---

## Tooling

| Tool | Usage |
|------|--------|
| **TypeScript** | ~5.9 — strict workspace builds (`pnpm run typecheck`). |
| **Prettier** | Root devDependency — format consistently (`pnpm exec prettier --write .` as needed). |
| **ESBuild** | API server production bundle (`artifacts/api-server/build.mjs`). |

---

## License

Root `package.json` declares **MIT** for the workspace metadata; confirm per-package `license` fields if you publish individual artifacts.

---

## Contributing

1. Use **pnpm** only at the repository root.  
2. Run **`pnpm run typecheck`** (or **`pnpm run build`**) before pushing.  
3. Respect **`minimumReleaseAge`** when bumping dependencies; document any allowlist additions in PR description.
