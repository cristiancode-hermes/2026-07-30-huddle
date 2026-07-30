import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="nav-bar">
      <a routerLink="/dashboard" class="nav-logo">Huddle</a>
      <div class="nav-links">
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/groups" routerLinkActive="active">Groups</a>
        <a routerLink="/profile" routerLinkActive="active">Profile</a>
      </div>
    </nav>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .nav-bar { display: flex; align-items: center; justify-content: space-between; padding: var(--space-md) var(--space-lg); background: var(--color-surface); border-bottom: 1px solid var(--color-border); }
    .nav-logo { font-weight: 700; font-size: 1.25rem; color: var(--color-primary); text-decoration: none; }
    .nav-links { display: flex; gap: var(--space-md); }
    .nav-links a { text-decoration: none; color: var(--color-muted); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); }
    .nav-links a.active { color: var(--color-primary); background: var(--color-primary-bg); }
    .main-content { padding: var(--space-lg); max-width: 1200px; margin: 0 auto; }
  `]
})
export class LayoutShell {}
