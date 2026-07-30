import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card" [class.card-hoverable]="hoverable()" [style.cursor]="hoverable() ? 'pointer' : 'default'">
      @if (title()) {
        <div class="card-header">
          <h3>{{ title() }}</h3>
        </div>
      }
      <div class="card-body"><ng-content /></div>
    </div>
  `,
  styles: [`
    .card {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      transition: box-shadow var(--motion-normal), border-color var(--motion-normal);
    }
    .card-hoverable:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--color-primary-light);
    }
    .card-header {
      margin-bottom: var(--space-md);
    }
    .card-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
    }
  `]
})
export class Card {
  readonly title = input<string>();
  readonly hoverable = input(false);
}
