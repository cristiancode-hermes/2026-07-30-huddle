import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Attendee, RsvpStatus } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AttendeeService {
  private readonly api = '/api';

  readonly attendees = signal<Attendee[]>([]);
  readonly loading = signal(false);

  constructor(private http: HttpClient) {}

  getAttendees(hangoutId: string) {
    this.loading.set(true);
    this.http.get<Attendee[]>(`${this.api}/hangouts/${hangoutId}/attendees`).subscribe({
      next: (data) => this.attendees.set(data),
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false)
    });
  }

  setRsvp(hangoutId: string, status: RsvpStatus) {
    return this.http.post<Attendee>(`${this.api}/hangouts/${hangoutId}/rsvp`, { status });
  }
}
