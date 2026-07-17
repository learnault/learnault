# Learnault Web App Roadmap

This roadmap covers the complete learner, employer, partner, and administrator web application described by the TRD. It deliberately separates building missing product surfaces from connecting them to the API.

## Tracking rules

- `[x]` — implemented and verified against the stated acceptance criteria.
- `[~]` — present as a prototype or incomplete implementation; not production-ready.
- `[ ]` — pending.
- A phase closes only when every checklist item in that phase is `[x]`.
- A page backed only by hard-coded data is a prototype and remains `[~]`.
- “Integrated” means loading, empty, success, validation, authorization, offline, and failure states are handled—not merely that a request is sent.

Status baseline: 17 July 2026.

## Current implementation inventory

- [x] Public landing page sections and shared styling exist.
- [~] `/signup` and `/login` visual prototypes exist; authentication is not active.
- [~] `/dashboard`, `/catalog`, `/learn`, `/quiz`, and `/wallet` prototypes exist with static data and non-functional actions.
- [x] Basic button, input, textarea, badge, achievement, leaderboard, skeleton, toast, and empty-state components exist.
- [~] Component/accessibility tests exist, but the suite currently has 2 failures out of 142 tests.
- [ ] No authenticated app shell, profile/settings area, course detail, learning-path detail, routed course player, lesson model, enrollment flow, or complete assessment flow exists.

## Phase 0 — Frontend architecture and design foundation

**Goal:** establish the reusable structure required before feature pages are built.

### Application architecture

- [ ] Create route groups for public, authentication, learner, employer, partner, and admin experiences.
- [ ] Create the authenticated app shell with desktop sidebar, top navigation, mobile header, bottom/mobile navigation, content container, and skip link.
- [ ] Create navigation configuration with role-aware items, active states, breadcrumbs, back behavior, and page titles.
- [ ] Add route guards for signed-out, learner, employer, partner-admin, and platform-admin access.
- [ ] Add application providers for authentication, server-state/query cache, local preferences, notifications/toasts, and modal management.
- [ ] Add root and route-level error boundaries, `not-found`, maintenance, unauthorized, and generic error pages.
- [ ] Add page-level loading templates and reusable skeletons for lists, cards, tables, profiles, course details, lessons, and dashboards.

### Design system and shared components

- [ ] Define typography, color, spacing, breakpoints, elevation, motion, focus, and semantic status tokens in one documented theme.
- [ ] Complete accessible primitives: avatar, checkbox, radio group, select, switch, dialog, drawer, dropdown, tabs, accordion, progress, tooltip, pagination, table, and confirmation dialog.
- [ ] Build shared form infrastructure for labels, descriptions, required states, field errors, password visibility, OTP/PIN entry, async submission, and server errors.
- [ ] Build shared content components: page header, section header, stat card, filter bar, search input, sort control, chip/tag, metadata row, content card, and responsive data list.
- [ ] Build feedback components: inline alert, status banner, retry panel, success state, destructive confirmation, network indicator, sync indicator, and transaction-status badge.
- [ ] Document component usage and add focused interaction/accessibility tests for every shared primitive.

### Engineering baseline

- [ ] Add a typed environment/config layer and a typed HTTP client without connecting unfinished pages.
- [ ] Add lint, formatting, type-check, unit-test, accessibility-test, and production-build CI gates.
- [ ] Fix the viewport and wallet-dashboard test failures and run tests once in CI mode rather than watch mode.
- [ ] Define browser support, mobile viewport matrix, performance budgets, and accessibility target (WCAG 2.2 AA).

**Closure evidence:** all shells and primitives render responsively, keyboard navigation works, and CI is green before feature integration starts.

## Phase 1 — Account, onboarding, profile, and settings surfaces

**Goal:** build the complete account experience as functional UI shells using typed fixtures and documented states.

### Authentication pages

- [~] Finish `/signup` with email, PIN/password, confirmation, terms consent, referral code, validation, and success states.
- [~] Finish `/login` with validation, remember-device behavior, rate-limit messaging, and session-expired messaging.
- [ ] Build `/verify-email` and resend-verification states.
- [ ] Build `/forgot-password`, `/reset-password`, and reset success/expired-link states.
- [ ] Build `/auth/otp` if phone/OTP remains part of the launch authentication scope.

### Learner onboarding

- [ ] Build the multi-step `/onboarding` shell with progress, back/continue, save-and-resume, and exit confirmation.
- [ ] Add display name, country/region, preferred language, timezone, and optional demographic fields.
- [ ] Add learning interests, current skill level, learning goals, and career goal selection.
- [ ] Add wallet-explainer, custodial-account consent, recovery expectations, and wallet-provisioning states.
- [ ] Add notification preference and privacy/data-sharing consent steps.
- [ ] Add onboarding completion summary and first-course recommendation.

### Profile and settings

- [ ] Build `/profile` with avatar, name, bio, location, languages, interests, public skill summary, and profile completion.
- [ ] Build `/profile/edit` with image upload/crop, validation, unsaved-change handling, and save confirmation.
- [ ] Build `/settings/account` for email, username, password/PIN, connected devices, sessions, and account deletion.
- [ ] Build `/settings/preferences` for language, timezone, accessibility, low-data mode, and content preferences.
- [ ] Build `/settings/notifications` for reward, quiz, streak, course, community, and employer-contact preferences.
- [ ] Build `/settings/privacy` for profile discoverability, credential visibility, employer contact, analytics consent, and data export.
- [ ] Build `/referrals` with personal code/link, share controls, qualification rules, invite status, and earned bonuses.

**Closure evidence:** every account route supports mobile/desktop, validation, empty/loading/error/success variants, keyboard use, and component tests with typed fixtures.

## Phase 2 — LMS discovery and curriculum surfaces

**Goal:** build the pages and components through which learners discover, evaluate, and enroll in structured learning.

### Catalog and discovery

- [~] Refactor `/catalog` into the course catalog rather than a flat static module grid.
- [ ] Build `/courses` with keyword search, category, skill, difficulty, language, duration, reward, and completion-status filters.
- [ ] Add sort, pagination/infinite loading, applied-filter chips, clear-all, empty results, and preserved URL query state.
- [ ] Build reusable `CourseCard`, `CourseListItem`, `CourseCardSkeleton`, `CourseBadge`, `RewardLabel`, and `ProgressRing` components.
- [ ] Build `/categories/[slug]` and category cards for Financial Literacy, Digital Skills, and future curricula.
- [ ] Build search suggestions, recent searches, popular searches, and no-result recommendations.

### Course information

- [ ] Build `/courses/[courseSlug]` with title, summary, outcomes, prerequisites, difficulty, language, duration, reward, instructor/issuer, and enrollment CTA.
- [ ] Add course syllabus grouped into modules and lessons with locked, available, current, and completed states.
- [ ] Add course progress, learner count, ratings/testimonials placeholder, credential preview, and reward explanation.
- [ ] Add enrollment confirmation, prerequisite warning, already-enrolled, completed, inactive, and unavailable-region variants.
- [ ] Add share, bookmark/save-course, report-content, and resume-course actions.

### Learning paths

- [ ] Build `/paths` with career/skill-path cards, filters, expected duration, total rewards, and completion progress.
- [ ] Build `/paths/[pathSlug]` with outcomes, ordered courses, prerequisites, milestones, cumulative reward, and path credential.
- [ ] Build path enrollment, next-course recommendation, locked-step explanation, and completed-path states.
- [ ] Build `/my-learning` with in-progress, saved, completed, and recommended tabs.
- [ ] Build reusable `LearningPathCard`, `PathTimeline`, `CurriculumSection`, `SyllabusItem`, and `EnrollmentButton` components.

**Closure evidence:** a usability test can navigate catalog → course detail → enrollment → My Learning and paths → path detail using complete fixture-backed states.

## Phase 3 — Course player, lessons, progress, and assessments

**Goal:** build the instructional experience that makes the product a functioning LMS.

### Course player and lesson navigation

- [ ] Build `/learn/courses/[courseId]` as the course-player layout with collapsible syllabus, main content, progress header, and mobile lesson drawer.
- [ ] Build `/learn/courses/[courseId]/lessons/[lessonId]` with previous/next navigation, completion action, estimated time, and position in course.
- [~] Refactor the existing static `/learn` lesson prototype into routed, data-driven lesson components.
- [ ] Support lesson blocks for headings, rich text, callouts, images, diagrams, audio, video, downloads, examples, and external resources.
- [ ] Add transcript/captions, image alternatives, playback controls, text scaling, and low-data media alternatives.
- [ ] Add lesson table of contents, reading progress, auto-save indicator, last-position restore, and explicit completion.
- [ ] Add bookmarks, private notes, glossary terms, copy/share excerpt controls, and report-content feedback.
- [ ] Add locked lesson, missing prerequisite, unpublished lesson, failed load, and offline lesson states.

### Progress and course completion

- [ ] Build module-level and course-level progress summaries with completed/current/locked lessons.
- [ ] Build “continue learning” resolution from the learner's latest incomplete lesson.
- [ ] Add completion requirements, progress reconciliation, and “course complete” celebration/summary.
- [ ] Add completed-course review page with score summary, reward, badge, credential, and recommended next course.

### Quizzes and assessments

- [ ] Build quiz introduction with question count, pass score, time/attempt rules, reward, and start confirmation.
- [~] Refactor `/quiz` from hard-coded questions into a reusable assessment player.
- [ ] Support single-choice, multiple-choice, true/false, ordering, and short-answer presentation as allowed by API scope.
- [ ] Add question navigation, unanswered flags, progress, autosave, submit confirmation, and time-expiry handling.
- [ ] Build immediate-feedback and deferred-feedback modes without exposing server answers before submission.
- [ ] Build result states for pass, fail, retry available, attempts exhausted, submission pending, and submission error.
- [ ] Build answer review with explanations, correct/incorrect states, remediation links, and retry CTA.
- [ ] Add assessment accessibility tests, interrupted-session recovery tests, and anti-answer-leak tests.

**Closure evidence:** fixture-backed learners can enroll, traverse an ordered curriculum, resume progress, complete lessons, take a quiz, fail/retry/pass, and reach course completion.

## Phase 4 — Learner MVP integration

**Goal:** replace fixtures across Phases 1–3 with real authenticated API behavior before wallet and growth features expand.

- [ ] Integrate signup, verification, login, refresh, logout, recovery, and protected-route session restoration.
- [ ] Integrate onboarding persistence and wallet-provisioning status.
- [ ] Integrate profile, avatar, settings, preferences, privacy, device sessions, and account deletion.
- [ ] Integrate catalog, search, filters, categories, course details, learning paths, saved courses, and recommendations.
- [ ] Integrate enrollment, My Learning, prerequisites, curriculum locks, lesson retrieval, bookmarks, and notes.
- [ ] Integrate lesson progress, resume position, explicit completion, course progress, and offline conflict messages.
- [ ] Integrate quiz start, randomized attempt payload, answer autosave, submission, scoring, review, and retry rules.
- [ ] Replace every hard-coded learner/dashboard value and remove production imports of fixture data.
- [ ] Add loading, empty, 401/403/404/409/422/429/500, timeout, retry, and partial-data behavior to every integrated route.
- [ ] Add browser E2E tests for account creation → onboarding → catalog → enrollment → lessons → quiz → course completion.

**Closure evidence:** the core LMS journey operates against the deployed API with no mock data and passes automated E2E and accessibility tests.

## Phase 5 — Learn-to-earn, credentials, gamification, and offline PWA

**Goal:** complete the Stellar incentive and retention experience on top of the working LMS.

### Wallet and rewards

- [~] Refactor `/wallet` from a visual mock into balance, transaction, payout, and status components.
- [ ] Build wallet overview for XLM/USDC balances, pending rewards, total earned, account status, and Explorer link.
- [ ] Build paginated transaction history with reward, referral, withdrawal, adjustment, filter, and detail views.
- [ ] Build reward confirmation with pending/finalized/failed/retrying states and transaction hash.
- [ ] Build mobile-money withdrawal quote, limits/fees, destination, confirmation, processing, receipt, failure, and retry screens.

### Credentials and achievements

- [ ] Build `/credentials` with badge/certificate grid, filters, status, issuer, and course/path association.
- [ ] Build `/credentials/[id]` with metadata, on-chain proof, Explorer link, verification status, and share controls.
- [ ] Build public `/verify/[credentialId]` for valid, revoked, expired, pending, and not-found results.
- [ ] Build premium-certificate purchase, payment, issuance, receipt, download, and share flow.

### Engagement

- [~] Replace static dashboard widgets with live current-course, progress, earnings, streak, achievements, and recommendations.
- [ ] Build streak calendar, streak rules, multiplier explanation, freeze/recovery behavior, and milestone celebrations.
- [ ] Build leaderboard tabs, ranking, period filters, privacy controls, and “your position” state.
- [ ] Complete referral qualification and bonus status integration.
- [ ] Build notification center, unread count, filters, deep links, read state, and notification preferences integration.

### PWA and offline learning

- [ ] Add manifest, icons, install UX, service worker, cache versioning, update prompt, and standalone navigation behavior.
- [ ] Add explicit lesson download/remove controls, storage usage, download progress, and content-version updates.
- [ ] Cache the app shell, curriculum metadata, downloaded lessons, and safe learner state.
- [ ] Queue progress and assessment submissions with idempotency keys and show sync state/conflicts.
- [ ] Test airplane mode, poor connectivity, interrupted updates, duplicate sync, stale content, and storage exhaustion.

**Closure evidence:** a learner can learn offline, sync once, receive one reward and credential, inspect the transaction, maintain a streak, and share verifiable proof.

## Phase 6 — Employer, partner, admin, and community applications

**Goal:** build the B2B, white-label, content operations, and social-learning surfaces required by the TRD.

### Employer product

- [ ] Build employer organization signup, verification, member invitations, roles, subscription, billing, and access-denied states.
- [ ] Build `/employer/dashboard` with plan usage, saved talent, recent searches, contact activity, and billing summary.
- [ ] Build `/employer/talent` with skill, credential, path, location, language, availability, and consent-aware filters.
- [ ] Build candidate profile, credential verification, shortlist, notes, contact request, and access audit views.
- [ ] Build saved searches, shortlists, CSV report requests/downloads, team settings, and billing pages.

### Partner and white-label product

- [ ] Build partner dashboard, programs list/detail, cohort management, learner invitations/import, and progress/impact reports.
- [ ] Build program content/path selection, custom reward budget, eligibility, schedule, branding, and publication workflow.
- [ ] Build white-label theme/domain preview and tenant-specific learner entry experience.

### Content and platform administration

- [ ] Build admin dashboard for users, active learners, content, completions, rewards, treasury, and operational alerts.
- [ ] Build course/path/module/lesson authoring with rich blocks, asset library, quiz builder, ordering, preview, draft, review, publish, archive, and version history.
- [ ] Build user, employer, partner, role, content-report, payout-review, and credential-revocation administration.
- [ ] Add audit-log views and guarded destructive-action confirmations.

### Community

- [ ] Build study-group discovery, group detail, membership, discussion, resources, events, and moderation/reporting.
- [ ] Build mentor discovery, request, session status, feedback, block, and safety flows.

**Closure evidence:** each role can complete its primary workflow with correct authorization, responsive UI, audit visibility, and E2E coverage.

## Phase 7 — Advanced protocol features and public launch

**Goal:** expose advanced contract capabilities safely and operate the complete product at launch quality.

- [ ] Build quest/scholarship discovery, detail, eligibility, proof submission, review status, dispute, reward, and refund views.
- [ ] Build staking position, amount, lock period, multiplier, unstake, risk disclosure, and transaction-state views.
- [ ] Build governance proposal list/detail, badge-gated voting, results, cancellation, execution, and transaction-state views.
- [ ] Build selective-disclosure/ZK credential proof creation, consent, verifier request, success, expiry, and revocation states.
- [ ] Complete localization framework, translated UI/content, locale-aware formatting, right-to-left readiness, and voiceover delivery.
- [ ] Complete security, privacy, accessibility, low-end-device, low-bandwidth, localization, and cross-browser release audits.
- [ ] Meet defined Core Web Vitals, bundle, image, cache, error-rate, and uptime budgets.
- [ ] Add production analytics for acquisition, onboarding, enrollment, lesson progress, completion, retention, rewards, credentials, payouts, and B2B conversion.
- [ ] Complete closed beta, remediation, staged public rollout, support documentation, incident UX, and post-launch review.
- [ ] Validate progress toward 50,000 users, 10,000 MAU, 40% 30-day retention, 200,000 completions, and 30,000 credentials.

**Closure evidence:** all prior phases and launch gates are closed, production metrics are observable, and every item in this roadmap is `[x]`.
