# LAUTECH Life — Product Specification

Status: Phase 0 product specification with Phase 1B backend implementation update  
Version: 0.2  
Updated: 9 October 2026 (Phase 1B updated 12 October 2026)  
Project name: Working name; subject to branding/legal review

This document is the source of truth for development.

The confirmed architecture uses Supabase PostgreSQL and Supabase Auth, with Node.js/Express retaining authority over important gameplay actions and Socket.IO handling real-time multiplayer.

This revision supersedes the previous MongoDB/separately hosted PostgreSQL alternatives and custom authentication proposal.

Phase 1 covers architectural documentation, environment-variable examples, and the approved Phase 1B runnable Node.js/Express backend foundation (health check and integration scaffolding). It does not create database tables, configure authentication, provision cloud infrastructure, or implement gameplay code.

“Must” indicates a requirement. “Proposed” indicates a decision requiring validation. Prices, schedules, distances, rewards, programmes, and geography are fictional design proposals unless explicitly researched and confirmed.

## 1. Product Vision

LAUTECH Life is a lightweight browser-based 3D university-life simulation inspired by student life around LAUTECH and Ogbomoso, Nigeria.

Players balance education, accommodation, finances, and friendship through understandable choices in a compact world.

The product must:

- Run directly in modern desktop and mobile browsers.
- Prioritize ordinary Android phones.
- Use JavaScript, not TypeScript.
- Begin with a strict ₦0 development budget.
- Use open-source tools, original work, appropriately licensed free assets, and suitable free service tiers.
- Support a small multiplayer experiment and future expansion.
- Use recognizable landmarks only after research and rights review.
- Permit fictional houses, shops, hostels, and streets inspired by the environment.

V0.1 proves one complete student-life loop. It does not attempt to reproduce the entire university or city.

## 2. Player Fantasy

“I have just arrived as a newly admitted student. I can settle in, work toward my education, manage my money, and find my community.”

The eventual experience includes:

- Character customization.
- Programme selection.
- School-related registration activities.
- Accommodation and hostel rental.
- Academic activities.
- Food and necessities.
- Legitimate work and virtual-naira earnings.
- Friendships and in-game contacts.
- Invitations and social events.
- Entertainment.
- Reputation.
- Vehicles.
- Relationships.
- Property and post-graduation life.

Choices should create clear tradeoffs without permanently trapping players after poor spending decisions.

The setting should feel locally inspired without stereotyping students or surrounding communities.

## 3. Target Audience

Primary audiences:

- Students, prospective students, alumni, and interested simulation players.
- Players seeking short browser sessions.
- Android users with limited hardware or unreliable mobile data.
- Desktop players using keyboard and pointer controls.

Proposed V0.1 audience: an 18+ closed playtest, with all controllable characters and social NPCs represented as adults.

This does not imply that all real university students are adults. Public audience policy and appropriate age assurance require confirmation.

Romantic and intimate gameplay is excluded from V0.1.

English is a proposed initial interface language. Additional languages require player research.

## 4. Core Gameplay Loop

1. Review objectives, wallet, and accommodation.
2. Travel to a nearby activity point.
3. Complete an academic activity or legitimate hustle.
4. Receive a server-confirmed result or reward.
5. Spend on accommodation or essentials.
6. Interact socially if desired.
7. Continue or leave with confirmed progress saved.

Proposed session targets:

- First-session onboarding: 15–25 minutes.
- Repeat sessions: useful activities within 5–15 minutes.

Validate these through playtesting. Travel and tutorial text must not dominate the experience.

## 5. New Player Journey

| Step | Experience | Completion condition |
| --- | --- | --- |
| Account | Read independence notice and age policy; create a Supabase Auth account | Backend validates authenticated identity |
| Character | Choose display name and appearance presets | Validated profile saved |
| Programme | Select a fictional or confirmed programme | Programme reference saved |
| Arrival | Spawn at a fictional arrival point | Movement tutorial completed |
| Registration | Visit a fictional student-services point | Checklist completion saved |
| Accommodation | Inspect and rent a hostel room | Rental and debit commit together |
| Academics | Attend one short activity | Completion saved |
| Hustle | Complete an NPC delivery/errand | Validated reward granted once |
| Essentials | Buy food or a basic necessity | Purchase commits correctly |
| Social | Greet an NPC; optionally contact a peer | NPC route works without peers |
| Return | Leave and sign in again | Confirmed progress restores |

Proposed starter funds: ₦5,000 virtual naira.

Onboarding must leave a viable route to accommodation and essentials. A free-to-start hustle remains available for financial recovery.

Disconnects resume from committed checkpoints without duplicate charges or rewards.

## 6. V0.1 Features

| Feature | Minimum required behavior |
| --- | --- |
| Small 3D zone | One bounded LAUTECH/Ogbomoso-inspired area |
| Character creation | Small appearance preset selection and display name |
| Programme selection | Small fictional or researched selection |
| Movement | Walking; optional running |
| Desktop controls | Keyboard movement and pointer camera |
| Mobile controls | Touch joystick, camera drag, interaction buttons |
| Camera | Third-person follow, rotation, reset, obstruction handling |
| Collision | Grounding, static walls, world boundaries |
| Accommodation | One hostel, one room tier, rental and room access |
| Academic activity | One short study/attendance activity |
| Legitimate hustle | One NPC delivery/errand |
| Wallet | Server-confirmed balance and recent transactions |
| Buying/spending | One vendor with at least two essentials |
| Social interaction | NPC greeting and nearby player interaction |
| Contacts | Mutual in-game contact requests |
| Day/night | Shared cosmetic lighting cycle |
| Accounts | Supabase Auth sign-up, sign-in, sign-out, and session handling |
| Saved progress | Supabase PostgreSQL profile, economy, rental, and progression |
| Multiplayer | At least two clients in a capped Socket.IO room |
| Chat | Bounded text chat in the current room |
| Invitations | Structured activity invites with accept/decline/expiry |
| Safety | Blocking, reporting, moderation, and sanctions |

Proposed room cap: eight players, subject to testing.

Customization excludes uploads. Chat excludes attachments, voice, external contact fields, and private messaging threads.

## 7. V0.1 Non-Goals

Excluded from V0.1:

- Complete LAUTECH or Ogbomoso reproduction.
- Geographically accurate campus mapping.
- All real programmes or registration procedures.
- Exams, grades, graduation, and careers.
- Multiple hustles or player businesses.
- Player-to-player money transfers and trading.
- Vehicles, transportation, and racing.
- Property ownership.
- Complex NPC routines.
- Dating, romance, and intimate interactions.
- Marriage and family.
- Large-scale multiplayer.
- Native apps, VR, voice chat, and uploaded content.
- Real payments, cash-out, gambling, and monetization.
- Offline economic progression.
- Distributed servers or realistic rigid-body simulation.

Planning future vehicle tables and transfer transactions does not add those features to V0.1.

The game is not an official university service or real registration system.

## 8. World Design

Create one fictional compact zone with:

- Arrival point.
- Student-services interaction point.
- Academic activity point.
- Hostel.
- Essentials vendor.
- Hustle pickup and delivery points.
- Social gathering area.

Proposed dimensions: approximately 200 × 200 game metres, subject to traversal and performance testing.

Use short walking routes, low-poly buildings, shared materials, reusable props, and clear navigation cues.

Environmental references require research. Do not invent real street names, coordinates, historical facts, official signage, or landmark details.

Recognizable landmarks are optional for V0.1 and require confirmation and rights review.

Limit interiors to one reusable hostel-room environment. Provide safe spawn points and a server-validated unstuck action.

## 9. Student-Life Systems

V0.1 tracks:

- Onboarding objectives.
- Programme choice.
- Academic completion.
- Active hustle.
- Accommodation.
- Wallet.
- Essential items.
- Contacts and invitations.

A simple journal explains available actions.

Food and necessities may satisfy objectives or provide a small consumption effect. Complex hunger, illness, hygiene, stamina, and survival systems are deferred.

Registration is a fictional checklist. Programme choice provides identity without requiring separate content branches.

Day/night must not prevent onboarding completion. Essential activities must work without other players online.

## 10. Social and Relationship Systems

V0.1 supports greetings, mutual contact requests, contact removal, and invitations to existing activity points.

“In-game contact details” means an internal player ID and display name. It does not mean real phone numbers, email addresses, or social-media accounts.

Requests and invitations have explicit states:

- Pending.
- Accepted.
- Declined.
- Cancelled.
- Expired.

Accepting an invitation cannot force teleportation, spending, or participation.

Players can disable incoming invitations and block others. Blocks persist across reconnects and prevent delivered chat, contact requests, and invitations from the blocked account.

Shared-room blocking does not guarantee avatar disappearance. Provide room switching and exit options.

Post-V0.1 relationships require a separate design. All intimate interactions must involve adult characters, mutual affirmative consent, withdrawal at any time, and non-explicit/fade-to-black presentation.

Previous consent, friendship, or accepted invitations never imply consent to intimacy.

## 11. Economy

Virtual naira has no real monetary value. It cannot be purchased, sold, transferred externally, or cashed out.

Proposed fictional balancing values:

| Action/item | Value |
| --- | --- |
| Starter grant | ₦5,000 once |
| Hostel rental | ₦2,000 per seven-game-day term |
| Food | ₦200 |
| Basic necessity | ₦100 |
| Validated delivery reward | ₦500 |

These values require affordability and exploit testing.

Economy requirements:

- Store integer naira amounts.
- Handle PostgreSQL BIGINT safely in JavaScript.
- Express owns balances, prices, rewards, and eligibility.
- Clients submit intentions and catalog IDs, not trusted totals.
- Every debit/credit creates a ledger record.
- Money and related rental/inventory/progression changes commit atomically.
- Idempotency keys prevent duplicate retry effects.
- Unique completion constraints prevent repeated rewards.
- Concurrent spending cannot produce negative balances.
- Failed operations leave no partial changes.
- Confirmed transactions survive browser and backend restarts.

Sensitive operations use one PostgreSQL transaction through a backend database connection or a narrowly permissioned server-only database function.

Separate Supabase API requests do not constitute one atomic transaction.

Transaction sequence:

1. Authenticate and authorize.
2. Claim an idempotency key and validate its request fingerprint.
3. Lock affected wallet/state records in a consistent order.
4. Validate funds, eligibility, prices, and task state.
5. Apply ledger, balance, inventory, rental, or completion changes.
6. Commit before acknowledging success or emitting notifications.

Future money transfers require distinct authorized parties, balanced debit/credit entries, and concurrency protection. No transfer endpoint is included in V0.1.

Hustle safeguards include one active task, validated sequence, server-known proximity, minimum duration, and configurable cooldowns.

No rewards accrue while disconnected. Maintain a free recovery activity. Exclude debt and punitive eviction mechanics.

## 12. Academic System

Implement one fictional study or attendance activity.

Proposed participation duration: 60 seconds, measured by the backend.

The backend validates location, eligibility, duration, and completion. Leaving or cancelling does not grant credit.

Completion is limited to once per game day and persists across reconnects.

The interface shows game attendance/study progress without implying real academic credit.

Programme names remain fictional until confirmed. Exams, grades, detailed timetables, real-person lecturers, and graduation are deferred.

## 13. Accommodation System

One fictional hostel offers one room tier.

Players see price, term, and expiry rules before confirmation. Rental and wallet debit commit together.

Use personal room instances or records so limited room stock cannot block onboarding.

Proposed term: seven game days. Renewal requires explicit confirmation; no automatic debit.

Expiry:

- Ends access safely.
- Returns an occupying player to a safe exterior point if necessary.
- Does not destroy inventory.
- Does not create debt.
- Does not reset progress.

Proposed clock policy: simulation time advances while the backend runs and pauses during downtime. Persist its anchor so restarts do not reset rental terms.

Confirm this policy before implementation.

Room entry, renewal, expiry, and rental rights remain backend-authoritative.

## 14. Multiplayer Direction

Socket.IO remains responsible for:

- Multiplayer movement.
- Player presence.
- Room chat.
- Invitations and live notifications.

Supabase Realtime does not replace Socket.IO in this architecture.

Start with one Node.js process and capped rooms for the initial zone.

Socket rooms determine delivery groups; they do not replace authorization. Validate membership and permissions for each action.

Use a simple spatial grid or distance filter for nearby peers.

Proposed values:

- Eight players per room.
- 40-game-metre interest radius.
- Movement updates at 10 Hz.

Validate these through testing.

Public peer state contains only identifiers, appearance, position, orientation, and animation. Never broadcast balances, account details, reports, or private profiles.

Client prediction and interpolation provide responsiveness. The backend checks movement speed, elapsed time, boundaries, coarse collision, and interaction proximity.

Authenticate socket handshakes using verified Supabase access tokens. Define token refresh/reconnection behavior and enforce expiry and account sanctions during long-running connections.

On reconnect, restore an authoritative snapshot. Socket recovery is supplementary; full resynchronization must work when recovery fails.

Pending durable actions reconcile through identifiers and acknowledgements. Late packets cannot replay expired actions.

Chat is room-scoped. Invitations are targeted and permission-checked.

Do not broadcast the entire world state. Defer distributed servers and cross-server migration until measured need.

Reference: https://socket.io/docs/v4/how-it-works/

## 15. Frontend Architecture

Repository: `lautech-life-frontend`

Required technologies:

- React.
- Vite.
- JavaScript.
- Three.js.
- React Three Fiber.
- Supabase JavaScript client for authentication.

Responsibilities:

- Rendering.
- Character presentation.
- Camera.
- Desktop and touch controls.
- Game UI.
- Local effects.
- Loading and quality settings.
- Supabase Auth user flows.
- Backend communication.
- Prediction and interpolation.

Gameplay reads and important writes go through Express. The browser cannot directly modify wallets, rewards, rentals, purchases, or progress.

Conceptual modules:

- Scene/world.
- Characters.
- Controls/camera.
- Interface.
- Asset loading.
- Authentication/session.
- Backend networking.
- Client view state.

Keep per-frame rendering state out of unnecessary React rerenders.

Desktop controls: WASD/arrows, pointer camera rotation, E/interact, Escape/menu, optional Shift/run.

Mobile controls: left joystick, right camera drag region, large interaction button, visible chat/menu controls.

Chat focus disables movement inputs. Support portrait and landscape.

Use basic lighting, limited shadows, and simple colliders. Avoid heavy postprocessing.

Environment-variable example, documentation only:

```dotenv
# lautech-life-frontend/.env.example
# All VITE_ values are public build output.

VITE_API_BASE_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

A publishable key is intended for public clients and depends on proper permissions/RLS. It is not an administrative secret.

Never include Supabase secret/service-role keys, database credentials, connection strings, or admin tokens in frontend code or VITE variables.

## 16. Backend Architecture

Repository: `lautech-life-backend`

Required technologies:

- Node.js.
- Express.
- Socket.IO.
- JavaScript.
- Supabase PostgreSQL.
- Supabase Auth verification tooling.
- PostgreSQL driver for transactional operations.

Supabase PostgreSQL is the confirmed primary relational database. MongoDB and separately hosted primary PostgreSQL are removed from the plan.

Supabase Auth manages credentials, sign-up, sign-in, token refresh, verification, and recovery. Do not build a parallel password database.

Express must verify access-token signature, issuer, audience, expiry, and subject using supported Supabase verification or established JWT/JWKS tooling.

Decoding a token without verification is insufficient. Derive identity from the verified subject, not a submitted player ID.

Backend responsibilities:

- Profile and progress rules.
- Economy.
- Academics.
- Rentals.
- Hustles.
- Future transfers and vehicles.
- Multiplayer authority.
- Chat/invitations.
- Moderation.
- Authorization and validation.

HTTP and Socket.IO handlers use the same authoritative domain rules.

Use a dedicated least-privilege runtime database role, TLS, and bounded pooling. Keep owner/migration credentials separate from runtime credentials.

Select the appropriate Supabase direct or pooler connection endpoint based on backend networking and driver compatibility. Never disable certificate verification to resolve connection errors.

Apply explicit origin allowlists, bounded inputs, request-size limits, account/IP rate limits, token-safe logging, and restricted admin permissions.

Backend sanctions must be checked independently of Auth login success. Document logout/revocation behavior: issued access tokens may remain valid until expiry unless additional backend controls deny them.

Environment-variable example, documentation only:

```dotenv
# lautech-life-backend/.env.example
# Placeholder values only.

NODE_ENV=development
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173

SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY

DATABASE_URL=YOUR_LEAST_PRIVILEGE_BACKEND_CONNECTION_URL
DATABASE_POOL_MAX=5

# Optional privileged Auth administration only:
# SUPABASE_SECRET_KEY=YOUR_SERVER_ONLY_SECRET_KEY
```

Real environment files must be ignored by Git. Migration credentials and CLI access tokens belong in restricted operator configuration.

Secret/service-role credentials can bypass RLS. Isolate their use and never treat them as proof that a player is authorized.

Keep one deployable backend process for V0.1. No microservices.

## 17. Data/Persistence Direction

Supabase PostgreSQL stores player profiles, wallets, transactions, hostels, academics, inventories, friendships, game progress, and future vehicle state.

The following is conceptual design only. No database tables or SQL migrations are created in Phase 1.

| Tables | Planned keys and relationships |
| --- | --- |
| player_profiles | UUID primary key referencing auth.users.id; unique normalized display name; programme foreign key |
| programmes | Primary key; unique code; fictional/confirmed reference status |
| wallets | Player primary/foreign key; nonnegative BIGINT balance |
| economy_operations | Primary key; actor foreign key; unique actor/idempotency key; request fingerprint |
| wallet_transactions | Wallet/operation foreign keys; immutable entries; nonzero amount; duplicate-entry constraint |
| hostels | Primary key; unique code; fictional location/catalog data |
| hostel_rooms | Primary key; hostel foreign key; unique hostel/room code |
| rentals | Player/room foreign keys; valid dates; status; active-rental constraint |
| academic_activities | Primary key; unique activity code; eligibility configuration |
| academic_completions | Player/activity foreign keys; unique player/activity/game-day completion |
| items | Primary key; unique catalog code; nonnegative price |
| inventories | Composite player/item primary key; foreign keys; nonnegative quantity |
| hustles, hustle_runs | Task/player foreign keys; valid states; single active task; unique reward completion |
| friendship_requests, friendships | Player foreign keys; no self-relations; unique pair rules |
| blocks | Composite blocker/blocked key; no self-block |
| invitations | Sender/recipient/activity references; status and expiry |
| game_progress | Player primary/foreign key; checkpoints and progression version |
| world_clock | Persisted simulation time and restart anchor |
| reports, moderation_actions | Restricted evidence, case state, and moderator audit |
| vehicle_models, player_vehicles | Post-V0.1 model/player relationships and ownership/rental state |

Use appropriate indexes for:

- Frequently queried foreign keys.
- Wallet transaction history by wallet/time.
- Incoming requests/invitations by recipient/status.
- Academic completion eligibility.
- Active rentals and hustle runs.
- Moderation review queues.

PostgreSQL does not automatically index every referencing foreign key.

Define deletion behavior explicitly. Account deletion must not accidentally cascade away financial audit history. Retention and pseudonymization require privacy review.

Use required-field constraints, bounded states, integer counts, and timezone-aware timestamps.

Ledger/balance consistency requires transaction routines and reconciliation; CHECK constraints alone cannot enforce every cross-table invariant.

### RLS and database permissions

Enable RLS on exposed application tables and default to denied access.

Revoke unnecessary anon/authenticated table and function privileges. V0.1 browser gameplay access through the Data API remains denied; supported Supabase Auth flows remain available.

Any later direct browser reads require narrow own-row policies, appropriate column access, and explicit tests. Important mutations remain backend-only.

Keep moderation data in a restricted, unexposed schema where practical.

Owner, secret/service-role, and BYPASSRLS access can bypass policies. RLS does not replace Express authorization.

The runtime database role should not own tables or have BYPASSRLS. Grant only required operations with documented backend policies.

If per-player database context is adopted, set verified identity transaction-locally and test against pooled-connection context leakage.

Restrict function execution and search paths. Do not expose privileged mutation RPCs to anonymous/authenticated browser roles.

### Persistence

Persist confirmed money, rentals, inventory, and completion changes immediately.

Movement/presence is ephemeral. Save safe positions periodically, proposed every 30 seconds, and on orderly disconnect.

Proposed day length: 20 real minutes.

Version schemas, catalogs, and network protocols.

### Migrations

When implementation is authorized:

1. Store versioned migrations in the backend repository.
2. Test with local Supabase.
3. Verify constraints, RLS, grants, functions, and compatibility.
4. Back up before risky changes.
5. Apply migrations sequentially with restricted migration credentials.
6. Validate schema version and gameplay invariants.

Avoid untracked dashboard-only changes. Prefer corrective forward migrations. Destructive resets are limited to disposable local data.

No existing MongoDB database is assumed. If existing data is discovered, separately plan ID mapping, validation, and financial reconciliation.

### Backup and restore

Use regular encrypted off-site logical exports on Free. Do not assume dashboard recovery or point-in-time recovery is available.

Document backup coverage for:

- Application schema/data.
- Constraints and indexes.
- Roles/grants.
- RLS policies.
- Functions.
- Supported Auth identity export/restore.
- Project configuration outside the database dump.

Default dump behavior may exclude managed schemas. Do not assume Auth users, credentials, sessions, and settings are covered.

Do not commit backups, credentials, or personal data to Git.

Proposed recovery targets, requiring validation:

- RPO: 24 hours during active playtests.
- RTO: one working day.

Restore first into an isolated local environment. Verify schema versions, foreign keys, ledger reconciliation, permissions, RLS, Auth identity mapping, recovery/login behavior, and game progress.

Reconfigure settings not included in the dump. Revoke sessions or rotate credentials when appropriate.

Document forced reauthentication/recovery if supported restoration cannot preserve authentication safely.

Future Storage objects require separate backup coverage.

A demonstrated restore is required before external playtesting.

## 18. Mobile Performance Strategy

Mobile performance is a release gate.

Use:

- Low-poly reusable models.
- Shared materials.
- Small textures.
- Compressed delivery.
- Progressive loading.
- Nearby-content loading.
- Instancing.
- Simple collision.
- Limited shadows.
- Minimal dependencies.
- Adaptive render resolution.

Default textures should be 256–512 px. A provisional 1024 px maximum requires measured justification.

Proposed low-quality device pixel ratio cap: 1–1.5.

All numeric targets require real-device validation:

| Measure | Proposed target |
| --- | --- |
| Required initial compressed transfer | ≤8 MB |
| Complete zone compressed assets | ≤20 MB |
| Visible triangles on low quality | ≤100,000 |
| Draw calls at busiest required view | ≤100 |
| Median frame rate | ≥30 FPS |
| 95th-percentile frame time | ≤50 ms |
| Observable app memory | Aim ≤250 MB; tooling limitations documented |
| First useful UI at 5 Mbps/150 ms RTT | ≤5 seconds |
| Spawn ready at 5 Mbps/150 ms RTT | ≤20 seconds, warm services |
| Spawn ready at 2 Mbps/300 ms RTT | ≤45 seconds, warm services |
| Ongoing up/down traffic | ≤1 MB/minute with eight nearby peers |
| Reconnection after service returns | ≤10 seconds, warm services |
| Touch targets | ≥44 × 44 CSS px |

Select a named ordinary Android device before declaring success. Proposed baseline: 3 GB RAM entry-level Android.

Measure sustained play for thermal slowdown. Emulation is supplementary.

Measure Supabase/backend cold starts separately.

Show loading progress, retry controls, connection status, and service-waking feedback. Use bounded backoff with jitter.

Do not queue new economic actions offline. Reconcile previously pending actions after reconnect.

## 19. Safety and Moderation

Before enabling chat, provide:

- Code of conduct.
- Blocking and reporting.
- Moderation review tools.
- Mute/suspend/ban enforcement.
- Restricted moderator access.
- Audit records.
- A designated moderator and review process.

Report categories include harassment, threats, sexual content, hate, scams, and personal-data disclosure.

Use safely escaped plain text, bounded lengths, screening, and spam controls.

Proposed chat limit: 240 characters and five messages per ten seconds, with additional burst controls.

Filters do not replace human review.

Reports attach server message identifiers and bounded evidence. Do not expose reporter identities to reported users.

Blocking persists and prevents delivered chat/contact/invitation interactions.

All characters involved in future intimacy must be adults. Consent must be affirmative, revocable, and specific. Presentation remains non-explicit/fade-to-black.

Self-declared age must not be described as verified age.

Validate identity, money, rewards, task sequence, proximity, rental rights, and room membership. Apply replay protection and rate limits.

Do not automatically punish network jitter as cheating.

Proposed retention:

- Restricted chat moderation buffer: up to 24 hours.
- Report evidence: up to 90 days, subject to case policy.
- Operational logs: seven days.

Confirm privacy requirements before public release. Account deletion must coordinate Supabase Auth and application records while preserving required integrity and lawful retention.

Do not collect private university records, real contact details, or identity documents without a separately justified requirement.

## 20. Branding and Legal Considerations

LAUTECH Life is a working name.

State that the project is independent and fictional. Do not imply official endorsement or affiliation.

Do not automatically use official logos, protected branding, photographs, identifiable real people, private data, or copyrighted assets.

Record rights or permission before use.

Maintain an asset register containing creator, source, exact license, permitted uses, attribution, modifications, and permission evidence.

“Free to download” does not establish reuse rights.

Prefer original or documented permissive assets. Ship required attribution and notices.

Public commercial launch requires name/branding, privacy, moderation, asset, and landmark review.

Applicable Nigerian and other jurisdictional requirements require confirmation. This specification is not a legal determination.

Real institutional claims require dated reliable sources.

## 21. Free/Zero-Cost Development Strategy

New development spending must remain ₦0.

Supabase Free is the only permitted hosted database/Auth plan during early development. No paid upgrades or add-ons.

Existing hardware and connectivity are assumptions, not claims that electricity or data are free.

Use local development as the reliable baseline. Local Supabase may be used when implementation is authorized.

Use open-source tools, licensed free assets, free Node hosting, and free static hosting where suitable.

No paid APIs, assets, domains, SMS, analytics, SMTP, or subscriptions.

Before hosted playtesting, confirm:

- Current Free quotas.
- Database and egress limits.
- Connection limits.
- Project pausing behavior.
- Region availability.
- Auth email verification/recovery restrictions.
- Suitable backend Socket.IO support.

Do not assume production-ready email delivery is included. Resolve recovery/verification within the free budget rather than silently adding paid delivery.

Monitor usage. At quota exhaustion, pause hosted testing or return to local development. Never automatically upgrade or bypass provider limits.

Supabase remains the primary database choice; a separately hosted PostgreSQL database is not an alternative in this approved architecture.

## 22. Testing Strategy

Test:

- Full onboarding and repeat gameplay.
- Financial recovery and insufficient funds.
- Rental renewal/expiry.
- Persistence after browser/backend restart.
- Real Android and desktop controls.
- Portrait/landscape layouts and camera/collision.
- Sustained loading/rendering performance.
- Multiplayer room capacity and interest filtering.
- Slow networks, reconnects, transport fallback, and service pauses.
- Invalid, expired, wrong-project, and tampered tokens.
- Socket authentication/expiry/sanctions.
- Unauthorized Data API access by anonymous and other-user identities.
- RLS, grants, and function permissions.
- Concurrent spending, idempotency, replay, and atomic rollback.
- Pooled database identity isolation where applicable.
- Auth/application deletion consistency.
- Blocking, reports, sanctions, and spam limits.
- Migration from blank and previous schema versions.
- Backup restoration, including Auth mapping and recovery.
- Asset rights and independence notices.

Prioritize automated tests for economy invariants, authorization, transactions, and persistence.

Use real-device tests for visual/control behavior.

Record browser/device versions and conditions. Do not claim universal compatibility from a small test matrix.

No implementation tests, migrations, or provisioning are executed in this documentation phase.

## 23. V0.1 Definition of Done

V0.1 is ready for a closed playtest when:

1. Every section 6 feature works in one small zone.
2. New players complete the full student-life loop.
3. Desktop and ordinary Android players can complete it.
4. At least two authenticated clients interact in a room.
5. The selected room cap passes testing.
6. Rooms and private information remain isolated.
7. Chat, contacts, invitations, blocking, reports, and sanctions work.
8. Express and Socket.IO verify Supabase identities correctly.
9. Server authority and PostgreSQL transaction integrity pass testing.
10. RLS and database permissions deny unauthorized access.
11. No secret or database credential appears in frontend output or repository history.
12. Confirmed progress survives reconnects and restarts.
13. Migrations and an Auth-aware restore are demonstrated.
14. Performance targets are measured on a named Android device.
15. Missed targets are resolved or explicitly revised and revalidated.
16. Only free dependencies/services are required.
17. Hosting limitations are honestly documented.
18. Rights, independence, age, conduct, and privacy notices are present.
19. No unresolved critical security, data-loss, onboarding-blocking, or severe moderation defect remains.

Phase 1 completion means updated architecture and environment examples only.

V0.1 completion does not authorize public commercial launch.

## 24. Post-V0.1 Roadmap

Everything below is post-V0.1 and unimplemented.

| Stage | Potential features | Gate |
| --- | --- | --- |
| Deeper daily life | Multiple hostels, quality/price tiers, restaurants, food vendors, more courses/activities/hustles, smarter NPC routines | Core-loop and mobile validation |
| Academic/social depth | Exams, grades, organizations, parties, hotels, nightclubs, entertainment, reputation | Moderation and balanced progression |
| Economy/mobility | Businesses, future transfers, rented/owned cars, transportation, racing, larger areas, property | Integrity, streaming, performance |
| Relationships | Dating and adult consensual non-explicit relationships | Separate age, consent, privacy, moderation review |
| Longer life arc | Graduation, careers, post-graduation life, marriage/family if appropriate | Player demand and responsible scope |
| Multiplayer growth | More zones, larger multiplayer, multiple backend processes | Measured demand and sustainable capacity |

Vehicles and transfers may have documented future relational designs but are not implemented in V0.1.

These stages are dependency directions, not promised delivery dates.

Expansion beyond sustainable free capacity requires a separately approved budget decision.

## 25. Open Questions and Assumptions

Confirmed decisions:

- Supabase PostgreSQL is the primary relational database.
- Supabase Auth provides authentication.
- Express remains authoritative for important game actions.
- Socket.IO provides real-time movement, presence, and chat.
- Frontend and backend repositories remain separate.
- Application code uses JavaScript.
- Early development uses Supabase Free only.
- Phase 1 is documentation and environment examples only.

Remaining questions:

| Item | Requires confirmation |
| --- | --- |
| Geography | Local references and landmark rights |
| Programmes | Current offerings if real names are used |
| Registration | Any intended accurate references |
| Audience | Public policy and age assurance |
| Hardware | Named Android device and measurements |
| Compatibility | Exact browser/graphics requirements |
| Economy | Affordability and exploit resistance |
| Clock/rental | Downtime policy and expiry fairness |
| Multiplayer | Room cap and nearby-sync performance |
| Auth | Sign-in method, free email constraints, recovery |
| Database access | Runtime role, grants, pooler endpoint |
| Backup | Auth coverage, consistency, retention, restore procedure |
| Recovery | Measured RPO/RTO |
| Moderation | Staffing and response expectations |
| Privacy | Deletion and retention rules |
| Branding | Review before commercial launch |
| Budget | Ability to avoid new spending |

Resolve integrity and user-expectation decisions before implementation.

Research findings must include dated sources. Unverified local assumptions must never become presented facts.

Official technical references:

- Supabase API keys:
  https://supabase.com/docs/guides/getting-started/api-keys
- Supabase RLS:
  https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase JWT verification:
  https://supabase.com/docs/guides/auth/jwts
- Supabase migrations:
  https://supabase.com/docs/guides/local-development/database-migrations
- Supabase backups:
  https://supabase.com/docs/guides/platform/backups
- Supabase project migration:
  https://supabase.com/docs/guides/platform/migrating-within-supabase