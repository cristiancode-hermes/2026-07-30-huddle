import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { DateOption } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DateOptionService {
  private readonly api = '/api';

  constructor(private http: HttpClient) {}

  addDateOption(groupId: string, pollId: string, data: { date: string; time?: string }) {
    return this.http.post<DateOption>(`${this.api}/groups/${groupId}/date-polls/${pollId}/options`, data);
  }

  deleteDateOption(groupId: string, pollId: string, optionId: string) {
    return this.http.delete(`${this.api}/groups/${groupId}/date-polls/${pollId}/options/${optionId}`);
  }
}
