import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Hangout } from '../models/models';

@Injectable({ providedIn: 'root' })
export class HangoutService {
  private readonly api = '/api';

  readonly upcomingHangouts = signal<Hangout[]>([]);
  readonly groupHangouts = signal<Hangout[]>([]);
  readonly currentHangout = signal<Hangout | null>(null);
  readonly loading = signal(false);

  constructor(private http: HttpClient) {}

  getUpcoming() {
    this.http.get<Hangout[]>(`${this.api}/hangouts/upcoming`).subscribe({
      next: (data) => this.upcomingHangouts.set(data)
    });
  }

  getGroupHangouts(groupId: string) {
    this.http.get<Hangout[]>(`${this.api}/groups/${groupId}/hangouts`).subscribe({
      next: (data) => this.groupHangouts.set(data)
    });
  }

  getHangout(id: string) {
    this.loading.set(true);
    this.http.get<Hangout>(`${this.api}/hangouts/${id}`).subscribe({
      next: (data) => this.currentHangout.set(data),
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false)
    });
  }

  confirmHangout(groupId: string, data: { activityId: string; dateOptionId?: string; date: string; time?: string; location?: string }) {
    return this.http.post<Hangout>(`${this.api}/groups/${groupId}/hangouts`, data);
  }

  updateHangout(hangoutId: string, data: { description?: string; location?: string }) {
    return this.http.patch<Hangout>(`${this.api}/hangouts/${hangoutId}`, data);
  }

  cancelHangout(hangoutId: string) {
    return this.http.post(`${this.api}/hangouts/${hangoutId}/cancel`, {});
  }
}
