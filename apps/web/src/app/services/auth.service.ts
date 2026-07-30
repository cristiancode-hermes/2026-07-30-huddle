import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = '/api';
  private readonly tokenKey = 'huddle_token';

  readonly currentUser = signal<User | null>(null);
  readonly isLoggedIn = signal(false);
  readonly loading = signal(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUser();
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(data: LoginRequest) {
    this.loading.set(true);
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, data).subscribe({
      next: (res) => {
        this.setSession(res);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false)
    });
  }

  register(data: RegisterRequest) {
    this.loading.set(true);
    return this.http.post<AuthResponse>(`${this.api}/auth/register`, data).subscribe({
      next: (res) => {
        this.setSession(res);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false)
    });
  }

  getMe() {
    if (!this.hasToken()) return;
    this.http.get<User>(`${this.api}/auth/me`).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.isLoggedIn.set(true);
      }
    });
  }

  updateProfile(data: { displayName?: string; avatarUrl?: string }) {
    return this.http.patch<User>(`${this.api}/auth/me`, data);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  private setSession(res: AuthResponse) {
    localStorage.setItem(this.tokenKey, res.token);
    this.currentUser.set(res.user);
    this.isLoggedIn.set(true);
  }

  private loadUser() {
    if (this.hasToken()) {
      this.getMe();
    }
  }
}
