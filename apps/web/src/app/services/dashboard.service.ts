import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { DashboardData, PendingDecision } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly api = '/api';

  readonly dashboard = signal<DashboardData | null>(null);
  readonly pendingDecisions = signal<PendingDecision[]>([]);
  readonly loading = signal(false);

  constructor(private http: HttpClient) {}

  getDashboard() {
    this.loading.set(true);
    this.http.get<DashboardData>(`${this.api}/dashboard`).subscribe({
      next: (data) => this.dashboard.set(data),
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false)
    });
  }

  getPending() {
    this.http.get<PendingDecision[]>(`${this.api}/dashboard/pending`).subscribe({
      next: (data) => this.pendingDecisions.set(data)
    });
  }
}
