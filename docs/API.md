# Huddle API Documentation

All endpoints are prefixed with `/api`. Protected endpoints require `Authorization: Bearer <token>` header.

## Authentication

### POST /api/auth/register
Register a new user.

**Body:**
```json
{
  "email": "user@example.com",
  "displayName": "User Name",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "displayName": "User Name",
    "avatarUrl": null,
    "createdAt": "2026-07-30T..."
  }
}
```

### POST /api/auth/login
Login with existing credentials.

**Body:** `{ "email": "...", "password": "..." }`

**Response (200):** Same as register — `{ token, user }`

**Response (401):** `{ "message": "Invalid email or password", "statusCode": 401 }`

### GET /api/auth/me
Get current authenticated user profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200):** `{ user }`

### PATCH /api/auth/me
Update current user profile.

**Body:** `{ "displayName"?, "avatarUrl"? }`

**Response (200):** `{ user }`

## Users

### GET /api/users/search?q={query}
Search users by display name or email. Returns max 10 results. User must be authenticated.

**Response (200):** `User[]`

### GET /api/users/:id
Get user's public profile.

**Response (200):** `User` (without passwordHash)

## Groups

### GET /api/groups
List all groups the current user belongs to (accepted memberships). Includes member count.

**Response (200):** `Group[]` with `memberCount`

### POST /api/groups
Create a new group. Creator becomes admin.

**Body:** `{ "name": "Group Name", "description"?, "coverUrl"? }`

**Response (201):** `Group`

### GET /api/groups/:id
Get group details including members.

**Response (200):** `Group` with `members: GroupMembership[]`

**Response (404):** Group not found or not a member

### PATCH /api/groups/:id
Update group details. Admin only.

**Body:** `{ "name"?, "description"?, "coverUrl"? }`

### DELETE /api/groups/:id
Delete group permanently. Admin only. Removes all related data.

## Group Memberships

### POST /api/groups/:groupId/members
Invite a user to the group. Admin only.

**Body:** `{ "userId": "uuid" }`

**Response (201):** `GroupMembership` (status: 'pending')

### GET /api/groups/:groupId/members
List all members of a group.

**Response (200):** `GroupMembership[]` with user info

### PATCH /api/groups/:groupId/members/:userId
Update member role. Admin only.

**Body:** `{ "role": "admin" | "member" }`

### DELETE /api/groups/:groupId/members/:userId
Remove member from group. Admin only.

### PATCH /api/groups/:groupId/invitations
Accept or decline a group invitation.

**Body:** `{ "status": "accepted" | "declined" }`

### POST /api/groups/:groupId/leave
Leave a group. If last admin, must transfer admin first.

## Activities

### GET /api/groups/:groupId/activities
List activities for a group, sorted by net votes descending, newest first for ties.

**Response (200):** `Activity[]` (with vote count and author info)

### POST /api/groups/:groupId/activities
Suggest a new activity.

**Body:** `{ "title": "...", "description"?, "category": "...", "location"? }`

**Categories:** Games, Food & Drink, Outdoors, Movies & TV, Music, Sports, Arts & Crafts, Travel, Other

**Response (201):** `Activity`

### PATCH /api/activities/:id
Edit own activity suggestion (within 24h of posting).

### DELETE /api/activities/:id
Delete own activity suggestion (cannot be confirmed as hangout).

## Voting

### POST /api/activities/:activityId/vote
Vote on an activity. Sends `null` to remove vote.

**Body:** `{ "direction": "up" | "down" | null }`

**Response (200):** Updated `Activity` with new vote counts

### GET /api/activities/:activityId/votes
Get all votes for an activity.

**Response (200):** `ActivityVote[]`

## Date Polls

### POST /api/activities/:activityId/date-polls
Create a date poll with proposed dates.

**Body:** `{ "dates": ["2026-08-01", "2026-08-02", ...] }` (1-7 dates)

**Response (201):** `DatePoll` with options

### GET /api/activities/:activityId/date-polls
Get active date poll for an activity.

**Response (200):** `DatePoll` with options and availability counts

### PATCH /api/date-polls/:id/close
Close poll and confirm a date. Admin only.

**Body:** `{ "confirmedDateId": "uuid" }`

**Response (201):** Created `Hangout`

### PATCH /api/date-polls/:pollId/options
Add or remove date options in a poll. Creator only.

**Body:** `{ "dates": ["2026-08-04"] }` (only unvoted options can be removed)

### DELETE /api/date-options/:optionId
Delete a date option (if no votes placed, creator only).

## Availability

### PUT /api/date-options/:optionId/availability
Set availability for a date option.

**Body:** `{ "response": "yes" | "maybe" | "no" }`

**Response (200):** `Availability`

### GET /api/date-options/:optionId/availability
Get all responses for a date option.

**Response (200):** `Availability[]` with user info

## Hangouts

### GET /api/groups/:groupId/hangouts?status=upcoming|past|cancelled
List hangouts for a group.

### GET /api/hangouts/upcoming
List upcoming hangouts across user's groups.

**Response (200):** `Hangout[]` with attendee counts

### GET /api/hangouts/:id
Get hangout details with attendees.

**Response (200):** `Hangout` with attendee list, photos count, comments count

### POST /api/hangouts
Confirm a hangout (admin only).

**Body:** `{ "groupId", "activityId", "dateOptionId", "time"?, "location"?, "notes"? }`

### PATCH /api/hangouts/:id
Update hangout details (admin only).

**Body:** `{ "time"?, "location"?, "notes"? }`

### DELETE /api/hangouts/:id
Cancel hangout (admin only).

**Body:** `{ "reason"? }`

## RSVPs

### PUT /api/hangouts/:hangoutId/rsvp
Set RSVP for a hangout.

**Body:** `{ "response": "going" | "maybe" | "pass" }`

**Response (200):** `HangoutAttendee`

### GET /api/hangouts/:hangoutId/attendees
List attendees with RSVP status.

**Response (200):** `HangoutAttendee[]` with user info

## Photos

### GET /api/hangouts/:hangoutId/photos
List photos for a hangout.

### POST /api/hangouts/:hangoutId/photos
Share a photo by URL (user must have attended).

**Body:** `{ "imageUrl": "https://..." }`

### DELETE /api/photos/:id
Delete photo (owner or group admin).

## Comments

### GET /api/hangouts/:hangoutId/comments
List comments for a hangout, sorted oldest first.

### POST /api/hangouts/:hangoutId/comments
Add a comment.

**Body:** `{ "text": "..." }` (max 500 chars)

### DELETE /api/comments/:id
Delete comment (author or group admin).

## Dashboard

### GET /api/dashboard
Aggregated dashboard data.

**Response (200):**
```json
{
  "groups": [...],
  "upcomingHangouts": [...],
  "pastHangouts": [...]
}
```

### GET /api/dashboard/pending
Pending decisions for the user (unvoted activities, unanswered date polls, pending invitations).

**Response (200):** `PendingDecisions`

## Search

### GET /api/search?q={query}
Global search across user's groups and activities.

**Response (200):**
```json
{
  "groups": [...],
  "activities": [...]
}
```

## Error Format

All errors follow this structure:

```json
{
  "message": "Human-readable error message",
  "statusCode": 400,
  "error": "Bad Request"
}
```

Validation errors include:

```json
{
  "message": ["email must be an email", "password is too short"],
  "statusCode": 400,
  "error": "Bad Request"
}
```
