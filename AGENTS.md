# AGENTS.md — Development Guidelines for AI Agents

This document defines core rules, architectural invariants, and boundaries for any AI assistant or automated agent working on `lautech-life-backend`.

---

## 1. Prime Directives

1. **Follow PRODUCT_SPEC.md**:
   - `PRODUCT_SPEC.md` (Version 0.2) is the primary source of truth.
   - Always read and consult the specification before planning or generating code.

2. **Backend Only**:
   - This repository is exclusively the backend service (`lautech-life-backend`).
   - Do **NOT** generate a React frontend, Vite application, Three.js canvas, or HTML UI here.
   - The frontend resides in a separate repository (`lautech-life-frontend`). Never combine them.

3. **Language Specification**:
   - Write all code in **JavaScript (ES Modules)**.
   - Do **NOT** use TypeScript per Sections 1 & 16 of `PRODUCT_SPEC.md`.

4. **Strict ₦0 Budget & Zero Paid Services**:
   - Strict ₦0 development budget.
   - Use only open-source, free dependencies (`express`, `cors`, `socket.io`, `dotenv`, etc.).
   - Never introduce paid cloud services, paid APIs, or paid tiers.

5. **Phase Boundaries**:
   - Adhere strictly to the authorized phase.
   - Do not jump ahead into implementing unrequested features, premature database schemas, or mock simulations unless explicitly authorized by the developer.

6. **Approval Before Commit / Push**:
   - Always run tests and report real output.
   - Always wait for the user's explicit approval before committing or pushing changes to Git.

---

## 2. Architectural Invariants

- **Server Authority**:
  - The Node.js/Express backend possesses sole authority over player balances, rental statuses, academic credits, inventory items, and task rewards.
  - The client is completely untrusted. Clients submit intentions, not authorized state updates.

- **Confirmed Database — Supabase PostgreSQL**:
  - Supabase PostgreSQL is the confirmed primary relational database.
  - MongoDB and separate self-hosted databases are deprecated and forbidden.
  - Schema migrations will be version-controlled in the backend repository.
  - Runtime database access must use a dedicated, least-privilege role.

- **Confirmed Authentication — Supabase Auth**:
  - Supabase Auth is the confirmed authentication provider.
  - Express must verify JWT signatures, issuer, audience, and subject claims.
  - Derive player identity exclusively from the verified token subject.
  - Never construct a parallel user credential or password database.

- **Realtime Networking — Socket.IO**:
  - Socket.IO handles room-scoped multiplayer movement (10 Hz), presence, and room chat (max 240 characters, rate-limited).
  - Socket handshakes will verify Supabase Auth tokens.
  - Keep ephemeral movement/presence separate from durable database records.

- **Virtual Economy & Financial Integrity**:
  - Virtual naira values must always be represented as integers (no fractional naira).
  - Handle PostgreSQL `BIGINT` safely in JavaScript.
  - Never trust client-generated monetary values or balances submitted by the browser.
  - The backend determines prices, rewards, and eligibility.
  - Every financial transaction must create an immutable ledger entry (`wallet_transactions`).
  - Balances and lease/item changes must commit atomically within a single PostgreSQL transaction.
  - Idempotency keys must be validated to prevent replay exploits.
  - Concurrent operations must never produce negative balances.

---

## 3. Security Principles

- Keep all database credentials and Supabase secret keys server-only.
- Never commit `.env` or secrets to Git.
- Maintain controlled CORS origins via `FRONTEND_ORIGIN`.
- Apply request body size limits (`100kb`) and bounded input validation.
- Centralized error handling: Never expose stack traces or internals in production responses.
- Before enabling chat, enforce message length limits (240 chars) and rate limiting (5 msgs / 10s).

---

## 4. Project File Structure (Phase 1B)

```
lautech-life-backend/
├── .env.example              # Reference environment variables
├── .gitignore                # Git exclusion rules
├── AGENTS.md                 # Agent instructions (this file)
├── package.json              # Project manifest and scripts
├── PRODUCT_SPEC.md           # Source of truth specification (v0.2)
├── README.md                 # Project documentation and setup guide
├── src/
│   ├── config/
│   │   └── env.js            # Environment validation & defaults
│   ├── middleware/
│   │   ├── errorHandler.js   # Centralized error handler
│   │   └── notFound.js       # Safe 404 fallback
│   ├── routes/
│   │   ├── health.routes.js  # GET /api/health route
│   │   └── index.js          # Main API router
│   ├── app.js                # Express application configuration
│   └── index.js              # Server entrypoint
└── tests/
    └── health.test.js        # Node.js built-in automated test suite
```

---

## 5. Verification Workflow

Before reporting completion on any task or phase:
1. Run `npm test` and ensure all test suites pass.
2. Verify that `GET /api/health` responds with HTTP 200 and the expected JSON payload.
3. Verify that `PRODUCT_SPEC.md` remains intact.
4. Report actual terminal output and wait for the user's explicit approval before proceeding.
