import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <div class="empty-state-icon">{{ icon() }}</div>
      <div class="empty-state-title">{{ title() }}</div>
      <p class="empty-state-text">{{ text() }}</p>
      @if (actionLabel()) {
        <button class="btn btn-primary mt-lg" (click)="action.emit()">
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: var(--space-3xl) var(--space-lg);
      text-align: center;
    }
    .empty-state-icon { font-size: 3rem; margin-bottom: var(--space-md); opacity: 0.5; }
    .empty-state-title { font-size: 1.125rem; font-weight: 600; color: var(--color-ink); margin-bottom: var(--space-xs); }
    .empty-state-text { font-size: 0.875rem; color: var(--color-muted); max-width: 300px; }
  `]
})
export class EmptyState {
  readonly icon = input('📋');
  readonly title = input('Nothing here yet');
  readonly text = input('');
  readonly actionLabel = input('');
  readonly action = output<void>();
}
