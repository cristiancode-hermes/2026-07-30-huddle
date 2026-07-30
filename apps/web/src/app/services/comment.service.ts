import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Comment } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly api = '/api';

  readonly comments = signal<Comment[]>([]);

  constructor(private http: HttpClient) {}

  getComments(hangoutId: string) {
    this.http.get<Comment[]>(`${this.api}/hangouts/${hangoutId}/comments`).subscribe({
      next: (data) => this.comments.set(data)
    });
  }

  addComment(hangoutId: string, text: string) {
    return this.http.post<Comment>(`${this.api}/hangouts/${hangoutId}/comments`, { text });
  }

  deleteComment(hangoutId: string, commentId: string) {
    return this.http.delete(`${this.api}/hangouts/${hangoutId}/comments/${commentId}`);
  }
}
