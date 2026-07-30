import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { SearchResult } from '../models/models';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly api = '/api';

  readonly results = signal<SearchResult | null>(null);
  readonly searching = signal(false);

  constructor(private http: HttpClient) {}

  globalSearch(query: string) {
    if (!query.trim()) {
      this.results.set(null);
      return;
    }
    this.searching.set(true);
    this.http.get<SearchResult>(`${this.api}/search?q=${encodeURIComponent(query)}`).subscribe({
      next: (data) => this.results.set(data),
      error: () => {
        this.results.set(null);
        this.searching.set(false);
      },
      complete: () => this.searching.set(false)
    });
  }

  clear() {
    this.results.set(null);
  }
}
