# Huddle — Architecture

## Overview

Huddle is a social activity organizer for friend groups. It follows a classic client-server architecture with an Angular SPA frontend and a NestJS REST API backend, using SQLite for local development and PostgreSQL/Neon for production.

## System Architecture

```
┌─────────────────────┐      HTTP/JSON       ┌──────────────────────┐
│   Angular 22 SPA    │ ◄──────────────────► │   NestJS 11 API      │
│   (apps/web)        │   JWT Auth (Bearer)  │   (apps/api)         │
│                     │                       │                      │
│  ┌───────────────┐  │                       │  ┌────────────────┐  │
│  │ Auth Service   │  │   POST /api/auth/*   │  │ Auth Module     │  │
│  │ Group Service  │  │   GET /api/groups/*  │  │ Groups Module   │  │
│  │ Activity Svc   │  │   POST /api/activ..  │  │ Activities Mod  │  │
│  │ Vote Service   │  │   POST /api/vote     │  │ Votes Module    │  │
│  │ DatePoll Svc   │  │   POST /api/date..   │  │ DatePolls Mod   │  │
│  │ Hangout Svc    │  │   POST /api/hangout  │  │ Hangouts Mod    │  │
│  │ ...more        │  │   ...                │  │ ...more         │  │
│  └───────────────┘  │                       │  └────────────────┘  │
│                     │                       │         │            │
│  ┌───────────────┐  │                       │  ┌────▼─────────┐   │
│  │ Signals State  │  │                       │  │ TypeORM      │   │
│  │ (reactive)     │  │                       │  │ (SQLite/Neon)│   │
│  └───────────────┘  │                       │  └──────────────┘   │
└─────────────────────┘                       └──────────────────────┘
```

## Key Design Decisions

### 1. Signal-First State Management (Angular 22)
All component state uses Angular signals (`signal()`, `computed()`, `effect()`). No NgRx, no services as observable stores. Each service exposes signals that components read reactively.

### 2. Zoneless Change Detection
The app uses `provideZonelessChangeDetection()` from Angular 22. Components rely entirely on signal changes to trigger updates — no zone.js monkey-patching needed.

### 3. Modular NestJS Backend
Each domain (auth, groups, activities, votes, date-polls, hangouts, photos, comments) is a self-contained NestJS module with its own entity, controller, service, and DTOs. Cross-module dependencies use imported services.

### 4. Denormalized Vote Counts
The Activity entity carries `netVotes`, `upvotes`, and `downvotes` as denormalized columns. Every vote upsert triggers a recalculation query — avoiding expensive COUNT queries on every page load.

### 5. Group-Scoped Multi-Tenancy
All data is scoped to groups. A user can only see groups they're a member of (status = 'accepted'). Admin operations check the membership role. This is enforced in every service method.

## Directory Structure

```
/opt/data/repositorios/2026-07-30-huddle/
├── apps/
│   ├── api/                      # NestJS backend
│   │   ├── src/
│   │   │   ├── auth/             # Auth module (JWT, Passport)
│   │   │   ├── users/            # User profiles, search
│   │   │   ├── groups/           # Group CRUD
│   │   │   ├── memberships/      # Group membership, invitations
│   │   │   ├── activities/       # Activity suggestions
│   │   │   ├── votes/            # Activity voting
│   │   │   ├── date-polls/       # Date polling
│   │   │   ├── date-options/     # Individual date options
│   │   │   ├── availability/     # Availability marking
│   │   │   ├── hangouts/         # Hangout CRUD
│   │   │   ├── attendees/        # RSVP management
│   │   │   ├── photos/           # Photo sharing
│   │   │   ├── comments/         # Hangout comments
│   │   │   ├── dashboard/        # Aggregated dashboard
│   │   │   ├── search/           # Global search
│   │   │   ├── seed/             # Sample data seeder
│   │   │   ├── app.module.ts     # Root module
│   │   │   └── main.ts           # Entry point
│   │   ├── test/
│   │   ├── nest-cli.json
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── web/                      # Angular frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── auth/         # Login, Register pages
│       │   │   ├── dashboard/    # Dashboard page
│       │   │   ├── groups/       # Group list, create, detail, settings
│       │   │   ├── hangouts/     # Hangout detail
│       │   │   ├── profile/      # User profile
│       │   │   ├── shared/       # Shared components
│       │   │   ├── services/     # API service layer
│       │   │   ├── guards/       # Auth guard
│       │   │   ├── interceptors/ # HTTP interceptor
│       │   │   ├── app.ts        # Root component
│       │   │   ├── app.config.ts # App configuration
│       │   │   └── app.routes.ts # Route definitions
│       │   ├── styles.css        # Global styles + design tokens
│       │   ├── index.html
│       │   └── main.ts
│       ├── angular.json
│       └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md           # This file
│   ├── API.md                    # API documentation
│   └── FRONTEND.md               # Frontend documentation
├── package.json                  # Workspace root
└── README.md
```

## Data Flow

### Authentication Flow
1. User submits login/register form
2. Angular AuthService calls POST /api/auth/login or /api/auth/register
3. API validates credentials, returns JWT + user object
4. AuthService stores JWT in localStorage, updates currentUser signal
5. HttpInterceptor adds Authorization: Bearer header to all subsequent requests
6. AuthGuard checks for token before allowing protected route access

### Activity Suggestion & Voting Flow
1. User opens group detail page
2. GroupService loads group data, ActivityService loads activities
3. User clicks "Suggest Activity" → SuggestActivityModal opens
4. On submit, ActivityService calls POST /api/groups/:groupId/activities
5. New activity appears optimistically in the list (with loading state)
6. User clicks upvote/downvote → VoteService calls POST /api/activities/:id/vote
7. Vote count updates optimistically, rolls back on error

### Date Poll & Hangout Confirmation Flow
1. Admin creates date poll for an activity via DatePollService
2. Members mark availability (Yes/Maybe/No) per date option
3. Admin sees "best date" (most Yes responses) and confirms hangout
4. HangoutService calls POST /api/hangouts with selected date
5. API creates hangout in a transaction, updates activity status to 'planned', closes poll
6. All members receive notification (via dashboard pending section)

## State Machines

### Hangout Status
```
Confirmed → [Date passes] → Completed
Confirmed → [Admin cancels] → Cancelled
```

### Activity Status
```
Suggested → [Hangout confirmed] → Planned
Suggested → [Author/admin cancels] → Cancelled
```

### Date Poll Status
```
Open → [Admin closes poll] → Closed
```

## Security

- **Authentication:** JWT tokens with bcryptjs password hashing
- **Authorization:** Group admin checks for sensitive operations (delete group, invite members, confirm hangout)
- **Group Isolation:** Every group-scoped query checks membership status = 'accepted'
- **Self-Scoping:** Users can only edit/delete their own activities, votes, comments, photos
- **Rate Limiting:** Not implemented for MVP (would use @nestjs/throttler)
