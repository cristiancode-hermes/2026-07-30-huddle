import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Activity } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private readonly api = '/api';

  readonly activities = signal<Activity[]>([]);
  readonly loading = signal(false);

  constructor(private http: HttpClient) {}

  getActivities(groupId: string) {
    this.loading.set(true);
    this.http.get<Activity[]>(`${this.api}/groups/${groupId}/activities`).subscribe({
      next: (data) => this.activities.set(data),
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false)
    });
  }

  suggestActivity(groupId: string, data: { title: string; description?: string; category?: string }) {
    return this.http.post<Activity>(`${this.api}/groups/${groupId}/activities`, data);
  }

  updateActivity(groupId: string, activityId: string, data: { title?: string; description?: string }) {
    return this.http.patch<Activity>(`${this.api}/groups/${groupId}/activities/${activityId}`, data);
  }

  deleteActivity(groupId: string, activityId: string) {
    return this.http.delete(`${this.api}/groups/${groupId}/activities/${activityId}`);
  }
}
