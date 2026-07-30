import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Group, GroupDetail } from '../models/models';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private readonly api = '/api';

  readonly groups = signal<Group[]>([]);
  readonly currentGroup = signal<GroupDetail | null>(null);
  readonly loading = signal(false);

  constructor(private http: HttpClient) {}

  getGroups() {
    this.loading.set(true);
    this.http.get<Group[]>(`${this.api}/groups`).subscribe({
      next: (data) => this.groups.set(data),
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false)
    });
  }

  getGroup(id: string) {
    this.loading.set(true);
    this.http.get<GroupDetail>(`${this.api}/groups/${id}`).subscribe({
      next: (data) => this.currentGroup.set(data),
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false)
    });
  }

  createGroup(data: { name: string; description: string }) {
    return this.http.post<Group>(`${this.api}/groups`, data);
  }

  updateGroup(id: string, data: { name?: string; description?: string }) {
    return this.http.patch<Group>(`${this.api}/groups/${id}`, data);
  }

  deleteGroup(id: string) {
    return this.http.delete(`${this.api}/groups/${id}`);
  }

  clearCurrent() {
    this.currentGroup.set(null);
  }
}
