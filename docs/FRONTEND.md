# Huddle — Frontend Documentation

## App Configuration

The app uses Angular 22 with:
- **Standalone components** — no NgModules needed
- **Signals** — reactive state management via `signal()`, `computed()`, `effect()`
- **Zoneless change detection** — `provideZonelessChangeDetection()` in app.config.ts
- **Lazy-loaded routes** — each page loads on demand
- **CSS Custom Properties** — design system tokens in `styles.css`

## Routing

| Route | Component | Guard | Description |
|-------|-----------|-------|-------------|
| `/login` | LoginPage | — | Login form |
| `/register` | RegisterPage | — | Registration form |
| `/dashboard` | DashboardPage | AuthGuard | Activity feed |
| `/groups` | GroupListPage | AuthGuard | All user's groups |
| `/groups/new` | GroupCreatePage | AuthGuard | Create group form |
| `/groups/:groupId` | GroupDetailPage | AuthGuard | Group activities + voting |
| `/groups/:groupId/settings` | GroupSettingsPage | AuthGuard | Admin settings |
| `/hangouts/:hangoutId` | HangoutDetailPage | AuthGuard | Hangout detail + RSVP |
| `/profile` | ProfilePage | AuthGuard | User profile + settings |
| `**` | redirect → /dashboard | — | Fallback |

## Service Layer

All services are injectable, standalone, and use Angular's `HttpClient`. They expose signals for reactive state.

### AuthService
- `currentUser: Signal<User | null>` — currently authenticated user
- `isAuthenticated: Signal<boolean>` — derived from currentUser
- `register(email, displayName, password)` → stores JWT, sets currentUser
- `login(email, password)` → stores JWT, sets currentUser
- `logout()` → removes JWT, clears currentUser
- `getMe()` → refreshes currentUser from API
- `updateProfile(data)` → updates display name, avatar

### GroupService
- `userGroups: Signal<Group[]>` — cached group list
- `currentGroup: Signal<Group | null>` — currently viewed group
- `getGroups()` — fetch all user's groups
- `getGroup(id)` — fetch single group with members
- `createGroup(data)` — create and add to list
- `updateGroup(id, data)` — update group details
- `deleteGroup(id)` — delete and remove from list

### ActivityService
- `groupActivities: Signal<Activity[]>` — activities for current group
- `getActivities(groupId)` — fetch activities sorted by votes
- `suggestActivity(groupId, data)` — create new suggestion
- `updateActivity(id, data)` — edit own suggestion
- `deleteActivity(id)` — remove own suggestion

### VoteService
- `vote(activityId, direction)` — upvote/downvote/remove
- Optimistic update with rollback on error

### DashboardService
- `getDashboard()` — aggregated groups + upcoming + past hangouts
- `getPending()` — pending votes, date polls, invitations

### ThemeService
- `isDark: Signal<boolean>` — current theme state
- `toggle()` — switch between light/dark
- Persists to localStorage
- Respects `prefers-color-scheme` on initial load

## Shared Components

### Button
**Selector:** `app-button`
**Inputs:** `variant: 'primary'|'secondary'|'ghost'|'danger'|'icon'`, `loading: boolean`, `disabled: boolean`, `size: 'sm'|'md'|'lg'`

### Card
**Selector:** `app-card`
**Inputs:** `elevated: boolean`, `clickable: boolean`, `padding: 'sm'|'md'|'lg'`

### Modal
**Selector:** `app-modal`
**Inputs:** `open: boolean`, `title: string`, `closable: boolean`
**Outputs:** `close`

### ConfirmDialog
**Selector:** `app-confirm-dialog`
**Inputs:** `title: string`, `message: string`, `confirmText: string`, `cancelText: string`, `danger: boolean`
**Outputs:** `confirm`, `cancel`

### EmptyState
**Selector:** `app-empty-state`
**Inputs:** `icon: string`, `title: string`, `description: string`, `actionText: string`, `actionLink: string`

### Avatar
**Selector:** `app-avatar`
**Inputs:** `src: string`, `name: string`, `size: 'sm'|'md'|'lg'|'xl'`
Generates fallback initials with background color derived from name hash.

### Badge
**Selector:** `app-badge`
**Inputs:** `variant: 'primary'|'secondary'|'accent'|'success'|'warning'|'danger'`, `size: 'sm'|'md'`

### LoadingSkeleton
**Selector:** `app-loading-skeleton`
**Inputs:** `type: 'card'|'list'|'text'`, `count: number`

### Toast
**Selector:** `app-toast`
**Inputs:** `message: string`, `type: 'success'|'error'|'info'`, `duration: number`
Auto-dismisses after duration.

## Dark Mode

Implemented via CSS class on `<html>` element:

```css
/* Default (light) */
:root {
  --color-bg: #FAF3EF;
  --color-surface: #FFF9F5;
  --color-ink: #2D2A28;
  /* ... */
}

/* Dark mode */
[data-theme="dark"] {
  --color-bg: #1A1614;
  --color-surface: #25211E;
  --color-ink: #F0EAE5;
  /* ... */
}
```

The ThemeService manages the `data-theme` attribute on `<html>` and persists the preference to localStorage. On initial load, it checks:
1. localStorage for saved preference
2. `prefers-color-scheme: dark` media query
3. Defaults to light if neither

## Design System Summary

- **Primary:** #D4644A (terracotta) — actions, buttons, links
- **Secondary:** #2D8C7C (teal) — secondary actions, success
- **Accent:** #F4A261 (amber) — highlights, badges
- **Surface:** #FFF9F5 (warm off-white)
- **Background:** #FAF3EF (warm beige)
- **Text:** #2D2A28 (warm near-black)
- **Muted text:** #8A7E76
- **Font:** Inter (Google Fonts)
- **Border radius:** sm=6px, md=10px, lg=16px, xl=24px, full=9999px
- **Shadows:** sm/md/lg/xl with warm undertones

## Validation Rules

- **Password:** min 8 chars, at least one letter and one number
- **Display name:** 2-50 chars, required
- **Email:** must contain @ and domain
- **Activity title:** 3-100 chars, required
- **Activity description:** max 500 chars
- **Comment:** max 500 chars
- **Group name:** 2-50 chars, required
- **Max activities per user per group:** 5 pending
- **Max photos per hangout:** 20
