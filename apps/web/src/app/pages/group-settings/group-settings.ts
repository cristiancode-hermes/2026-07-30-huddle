import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-groupsettings',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-container">
      <div class="page-placeholder">
        <h1>GroupSettings</h1>
        <p>This page is under development.</p>
        <a routerLink="/dashboard">Back to Dashboard</a>
      </div>
    </div>
  `,
  styles: [`
    .page-container { display: flex; justify-content: center; align-items: center; min-height: 60vh; }
    .page-placeholder { text-align: center; padding: var(--space-2xl); }
    .page-placeholder h1 { font-size: 1.5rem; margin-bottom: var(--space-md); }
    .page-placeholder p { color: var(--color-muted); margin-bottom: var(--space-lg); }
  `]
})
export class GroupSettingsPage { }
