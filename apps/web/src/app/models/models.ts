// ── User & Auth ──
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  displayName: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ── Group ──
export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdBy: string;
  createdAt: string;
  imageUrl?: string;
}

export interface GroupDetail extends Group {
  members: Member[];
  activities: Activity[];
  datePolls: DatePoll[];
  hangouts: Hangout[];
}

// ── Member ──
export type MemberRole = 'admin' | 'member';

export interface Member {
  id: string;
  userId: string;
  groupId: string;
  role: MemberRole;
  displayName: string;
  avatarUrl?: string;
  email: string;
}

// ── Activity ──
export interface Activity {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  category?: string;
  suggestedBy: string;
  suggestedByName: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  userVote?: 'up' | 'down' | null;
}

// ── Date Poll ──
export interface DatePoll {
  id: string;
  groupId: string;
  title: string;
  status: 'open' | 'closed';
  createdBy: string;
  createdAt: string;
  options: DateOption[];
}

export interface DateOption {
  id: string;
  datePollId: string;
  date: string;
  time?: string;
  availability: Availability[];
}

export interface Availability {
  id: string;
  dateOptionId: string;
  userId: string;
  displayName: string;
  status: 'available' | 'unavailable' | 'maybe';
}

// ── Hangout ──
export type RsvpStatus = 'going' | 'maybe' | 'pass';

export interface Hangout {
  id: string;
  groupId: string;
  groupName?: string;
  activityName: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  createdBy: string;
  createdAt: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  rsvpCounts: {
    going: number;
    maybe: number;
    pass: number;
  };
  userRsvp?: RsvpStatus | null;
}

export interface Attendee {
  id: string;
  hangoutId: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  status: RsvpStatus;
}

// ── Photo ──
export interface Photo {
  id: string;
  hangoutId: string;
  url: string;
  uploadedBy: string;
  uploadedByName: string;
  createdAt: string;
}

// ── Comment ──
export interface Comment {
  id: string;
  hangoutId: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  text: string;
  createdAt: string;
}

// ── Dashboard ──
export interface DashboardData {
  groups: Group[];
  upcomingHangouts: Hangout[];
  pendingDecisions: PendingDecision[];
  pastHangouts: Hangout[];
}

export interface PendingDecision {
  type: 'vote' | 'date-poll';
  groupId: string;
  groupName: string;
  activityId?: string;
  activityTitle?: string;
  datePollId?: string;
  datePollTitle?: string;
}

// ── Search ──
export interface SearchResult {
  groups: Group[];
  hangouts: Hangout[];
}
