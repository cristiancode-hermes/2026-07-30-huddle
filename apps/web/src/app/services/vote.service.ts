import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Activity } from '../models/models';

@Injectable({ providedIn: 'root' })
export class VoteService {
  private readonly api = '/api';

  constructor(private http: HttpClient) {}

  vote(groupId: string, activityId: string, vote: 'up' | 'down') {
    return this.http.post<Activity>(`${this.api}/groups/${groupId}/activities/${activityId}/vote`, { vote });
  }

  getVotes(groupId: string, activityId: string) {
    return this.http.get<{ upvotes: number; downvotes: number; userVote: string | null }>(
      `${this.api}/groups/${groupId}/activities/${activityId}/votes`
    );
  }
}
