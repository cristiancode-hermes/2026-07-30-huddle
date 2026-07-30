import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Availability } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  private readonly api = '/api';

  constructor(private http: HttpClient) {}

  setAvailability(groupId: string, optionId: string, status: 'available' | 'unavailable' | 'maybe') {
    return this.http.post<Availability>(
      `${this.api}/groups/${groupId}/date-options/${optionId}/availability`,
      { status }
    );
  }

  getAvailability(groupId: string, pollId: string) {
    return this.http.get<Availability[]>(`${this.api}/groups/${groupId}/date-polls/${pollId}/availability`);
  }
}
