# LAUTECH Life — Backend Service

**Repository**: `lautech-life-backend`  
**Current Phase**: Phase 1B (Backend Foundation & Health Check)  
**Specification**: `PRODUCT_SPEC.md` (Version 0.2, Phase 1B Update)  
**Target Environment**: Windows 10/11, Visual Studio Code, Node.js LTS, npm  

---

## 1. Project Purpose

**LAUTECH Life** is an independent, lightweight browser-based 3D university-life simulation inspired by student life around Ladoke Akintola University of Technology (LAUTECH) and Ogbomoso, Oyo State, Nigeria.

Players balance academic attendance, accommodation leases, virtual finances, and campus friendships in a compact virtual campus. 

This repository (`lautech-life-backend`) contains the authoritative server application. The client frontend is maintained in a completely separate repository (`lautech-life-frontend`).

---

## 2. Technology Stack

- **Runtime**: Node.js (v22 LTS recommended)
- **Language**: JavaScript (ES Modules, standard `.js`)
- **Web Framework**: Express (`^4.21.2`)
- **Real-time Engine**: Socket.IO (`^4.8.1` planned for Phase 4 multiplayer)
- **Database (Confirmed)**: Supabase PostgreSQL (Phase 1 documentation; live connections in Phase 2)
- **Authentication (Confirmed)**: Supabase Auth (Phase 1 documentation; JWT verification in Phase 2)
- **Testing**: Node.js built-in native test runner (`node:test`, `node:assert`)
- **Development Tooling**: Node.js built-in watch mode (`node --watch`)
- **Development Budget**: Strict ₦0 budget using only open-source, free libraries

---

## 3. Repository Structure

```
lautech-life-backend/
├── .env.example              # Reference environment variables
├── .gitignore                # Git exclusions (node_modules, .env, logs)
├── AGENTS.md                 # Development rules and invariants for AI agents
├── package.json              # Project scripts and dependencies
├── PRODUCT_SPEC.md           # Source of truth project specification (v0.2)
├── README.md                 # Project documentation and setup guide (this file)
├── src/
│   ├── config/
│   │   └── env.js            # Environment variable validation & fallback defaults
│   ├── middleware/
│   │   ├── errorHandler.js   # Centralized error handler (no stack traces in prod)
│   │   └── notFound.js       # Standardized 404 handler for unknown routes
│   ├── routes/
│   │   ├── health.routes.js  # GET /api/health implementation
│   │   └── index.js          # API route registry (/api)
│   ├── app.js                # Express app setup (CORS, body limits, middleware)
│   └── index.js              # Server entrypoint & port listener
└── tests/
    └── health.test.js        # Node.js native test suite
```

---

## 4. Local Requirements

To develop on Windows:
1. **Operating System**: Windows 10 or Windows 11 (or macOS / Linux).
2. **Node.js**: Node.js 22 LTS or later. Verify by opening Windows PowerShell or Command Prompt:
   ```cmd
   node -v
   ```
3. **npm**: Included with Node.js (`npm -v`).
4. **Editor**: Visual Studio Code (recommended extensions: ESLint, Prettier).
5. **Git**: Git for Windows (`git -v`).

---

## 5. Installation Instructions

Open your terminal (PowerShell, Command Prompt, or VS Code integrated terminal) inside the project folder:

```bash
# Clone the repository (if not already cloned)
git clone https://github.com/Oke-Precious/lautech-life-backend.git
cd lautech-life-backend

# Install free dependencies
npm install
```

---

## 6. Development Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Starts server with automatic file watching (`node --watch src/index.js`) |
| `npm start` | Starts server in production mode (`node src/index.js`) |
| `npm test` | Runs the automated test suite using Node.js built-in test runner |
| `npm run build` | Validates JavaScript syntax across server entrypoints |

---

## 7. Environment Configuration

Copy `.env.example` to create your local `.env` file:

In Windows PowerShell:
```powershell
Copy-Item .env.example .env
```
In Command Prompt:
```cmd
copy .env.example .env
```

### Active Configuration:
```dotenv
NODE_ENV=development
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
```

### Future Supabase Placeholders (Commented):
```dotenv
# DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
# DATABASE_POOL_MAX=5
# SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
# SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

> **Security Note**: Never commit `.env` or live database secrets to Git. `.gitignore` is pre-configured to ignore all `.env` files.

---

## 8. Health-Check Endpoint

### `GET /api/health`
Returns a `200 OK` status confirming that the HTTP server is running.

**Example Response**:
```json
{
  "status": "ok",
  "service": "lautech-life-backend",
  "version": "0.1.0",
  "phase": "1B",
  "timestamp": "2026-10-12T15:33:36.000Z"
}
```

- **Port**: `4000` (configurable via `PORT` environment variable).
- **Independence**: This endpoint does not require database credentials or an active Supabase project. It verifies HTTP server process readiness only.

---

## 9. Supabase Architecture (Confirmed)

The confirmed primary database for LAUTECH Life is **Supabase PostgreSQL**. MongoDB and separate self-hosted databases are deprecated.

### Relational Entities Planned:
- `player_profiles`: UUID referencing Supabase Auth ID, student display name, programme, avatar preset.
- `wallets`: BigInt non-negative integer balance in virtual naira.
- `wallet_transactions`: Immutable financial ledger records for every credit/debit.
- `hostels` & `hostel_rooms`: Campus accommodation buildings and room records.
- `rentals`: Active and expired student room tenancy agreements.
- `academic_activities` & `academic_completions`: Lecture seminars and daily completion logs.
- `hustles` & `hustle_runs`: Student errands, package delivery states, and rewards.
- `inventories` & `items`: Food (jollof rice), snacks, and educational supplies.
- `friendships` & `invitations`: Student contacts and peer activity invites.
- `reports` & `moderation_actions`: Student conduct evidence and moderation queues.

---

## 10. Authentication Direction (Supabase Auth)

Supabase Auth is the confirmed identity provider:
1. The user authenticates on the frontend via Supabase Auth (email or anonymous session).
2. The frontend receives an access token (JWT).
3. The frontend passes this token in the `Authorization: Bearer <token>` header on backend API calls.
4. Express verifies the token signature, audience, issuer, and expiry using supported Supabase verification or standard JWT/JWKS tooling.
5. Express derives the player's identity strictly from the verified subject (`sub` claim).
6. The backend validates player permissions before granting any mutation or action.

No parallel user credential or password tables will be created in PostgreSQL.

---

## 11. Database and Migration Direction

When database development begins in Phase 2:
- Version-controlled SQL migration files will be maintained in this repository (e.g., `supabase/migrations/` or `migrations/`).
- Migrations will run sequentially with restricted operator credentials.
- Runtime backend queries will connect through a dedicated least-privilege role with bounded connection pooling (`DATABASE_POOL_MAX=5`).
- Sensitive mutations will run in single atomic PostgreSQL transactions.
- Row Level Security (RLS) will be enabled on exposed tables.

---

## 12. Socket.IO Multiplayer Direction

In Phase 4, Socket.IO will handle real-time multiplayer:
- **Capped Rooms**: Spatial zone rooms (e.g. 8 players per room, 40-metre interest radius).
- **Movement Rate**: Position updates sent at 10 Hz with interpolation.
- **Room Chat**: Sanitized text messages bounded to 240 characters and rate-limited to 5 messages per 10 seconds.
- **Activity Invitations**: Structured peer invitations (study session, quad hangout).
- **Authority**: Movement collision and speed are checked by the server. Movement data remains ephemeral in memory and is not written to the database every frame.

---

## 13. Security Principles

1. **Server Authority**: The browser is completely untrusted. Balances, prices, rewards, and eligibility are determined exclusively by Express.
2. **CORS Control**: Access restricted to `FRONTEND_ORIGIN` (default `http://localhost:5173`).
3. **Payload Limits**: JSON bodies bounded to `100kb` to prevent memory flooding.
4. **Error Masking**: Stack traces and error internals are suppressed in production.
5. **Virtual Economy Protection**: Every financial change requires an idempotency key, integer arithmetic, and an atomic ledger entry. Balances can never become negative.

---

## 14. Testing Instructions

Automated tests use the Node.js built-in test runner (`node:test` and `node:assert`):

```bash
npm test
```

### Test Coverage in Phase 1B:
- Verifies `GET /api/health` returns HTTP 200.
- Verifies JSON schema of `/api/health`.
- Verifies that unknown routes return standardized JSON 404 responses.
- Verifies that the server runs and responds cleanly without any Supabase credentials present.

---

## 15. Current Development Status

- **Phase 1B Complete**: Clean Node.js/Express backend foundation established.
- Working `/api/health` endpoint on port `4000`.
- Documented Supabase PostgreSQL, Supabase Auth, and Socket.IO plans.
- Automated tests passing 100%.

---

## 16. Planned Future Milestones

- **Phase 2A**: Supabase connection setup, SQL migrations, and least-privilege database role.
- **Phase 2B**: Supabase Auth JWT verification middleware.
- **Phase 3**: Server-authoritative economy (starter grant ₦5,000, hostel lease ₦2,000, food purchases, courier errands ₦500).
- **Phase 4**: Socket.IO room multiplayer, movement interpolation, and room chat.
- **Phase 5**: Integration testing with `lautech-life-frontend`.
