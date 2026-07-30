import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { DatePoll } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DatePollService {
  private readonly api = '/api';

  readonly currentPoll = signal<DatePoll | null>(null);

  constructor(private http: HttpClient) {}

  getDatePoll(groupId: string) {
    this.http.get<DatePoll>(`${this.api}/groups/${groupId}/date-polls/active`).subscribe({
      next: (data) => this.currentPoll.set(data),
      error: () => this.currentPoll.set(null)
    });
  }

  createDatePoll(groupId: string, data: { title: string; options: { date: string; time?: string }[] }) {
    return this.http.post<DatePoll>(`${this.api}/groups/${groupId}/date-polls`, data);
  }

  closeDatePoll(groupId: string, pollId: string) {
    return this.http.post<DatePoll>(`${this.api}/groups/${groupId}/date-polls/${pollId}/close`, {});
  }
}
