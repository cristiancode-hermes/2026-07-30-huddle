import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  template: `
    <div class="skeleton-wrapper" [style.display]="'flex'" [style.flex-direction]="'column'" [style.gap]="'var(--space-sm)'">
      @if (type() === 'card') {
        @for (_ of [].constructor(count()); track $index) {
          <div class="skeleton skeleton-card" style="height: 120px"></div>
        }
      } @else if (type() === 'text') {
        @for (_ of [].constructor(count()); track $index) {
          <div class="skeleton skeleton-text" [style.width]="$index === 0 ? '60%' : '100%'"></div>
        }
      } @else if (type() === 'profile') {
        <div style="display: flex; align-items: center; gap: var(--space-md)">
          <div class="skeleton skeleton-avatar"></div>
          <div style="flex: 1">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text" style="width: 40%"></div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .skeleton {
      background: linear-gradient(90deg, var(--color-border) 25%, var(--color-surface) 50%, var(--color-border) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
      border-radius: var(--radius-sm);
    }
    .skeleton-text { height: 14px; width: 100%; }
    .skeleton-title { height: 20px; width: 60%; }
    .skeleton-avatar { width: 40px; height: 40px; border-radius: var(--radius-full); }
    .skeleton-card { height: 120px; border-radius: var(--radius-lg); }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `]
})
export class LoadingSkeleton {
  readonly type = input<'card' | 'text' | 'profile'>('text');
  readonly count = input(3);
}
