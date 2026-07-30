import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Member } from '../models/models';

@Injectable({ providedIn: 'root' })
export class MembershipService {
  private readonly api = '/api';

  readonly members = signal<Member[]>([]);

  constructor(private http: HttpClient) {}

  getMembers(groupId: string) {
    this.http.get<Member[]>(`${this.api}/groups/${groupId}/members`).subscribe({
      next: (data) => this.members.set(data)
    });
  }

  inviteMember(groupId: string, email: string) {
    return this.http.post<Member>(`${this.api}/groups/${groupId}/members`, { email });
  }

  updateRole(groupId: string, memberId: string, role: 'admin' | 'member') {
    return this.http.patch(`${this.api}/groups/${groupId}/members/${memberId}`, { role });
  }

  removeMember(groupId: string, memberId: string) {
    return this.http.delete(`${this.api}/groups/${groupId}/members/${memberId}`);
  }

  acceptInvitation(groupId: string) {
    return this.http.post(`${this.api}/groups/${groupId}/members/accept`, {});
  }

  declineInvitation(groupId: string) {
    return this.http.post(`${this.api}/groups/${groupId}/members/decline`, {});
  }

  leaveGroup(groupId: string) {
    return this.http.post(`${this.api}/groups/${groupId}/members/leave`, {});
  }
}
