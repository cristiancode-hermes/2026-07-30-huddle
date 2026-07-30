import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Photo } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private readonly api = '/api';

  readonly photos = signal<Photo[]>([]);

  constructor(private http: HttpClient) {}

  getPhotos(hangoutId: string) {
    this.http.get<Photo[]>(`${this.api}/hangouts/${hangoutId}/photos`).subscribe({
      next: (data) => this.photos.set(data)
    });
  }

  addPhoto(hangoutId: string, url: string) {
    return this.http.post<Photo>(`${this.api}/hangouts/${hangoutId}/photos`, { url });
  }

  deletePhoto(hangoutId: string, photoId: string) {
    return this.http.delete(`${this.api}/hangouts/${hangoutId}/photos/${photoId}`);
  }
}
