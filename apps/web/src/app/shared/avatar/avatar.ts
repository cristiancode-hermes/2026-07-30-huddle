import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `
    <div class="avatar {{sizeClass()}}" [style.background-color]="bgColor()">
      @if (avatarUrl()) {
        <img [src]="avatarUrl()" [alt]="name()" />
      } @else {
        <span>{{ initials() }}</span>
      }
    </div>
  `,
  styles: [`
    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      background-color: var(--color-primary);
      color: white;
      font-weight: 600;
      flex-shrink: 0;
      overflow: hidden;
      text-transform: uppercase;
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .sm { width: 32px; height: 32px; font-size: 0.75rem; }
    .md { width: 40px; height: 40px; font-size: 0.875rem; }
    .lg { width: 56px; height: 56px; font-size: 1.25rem; }
    .xl { width: 80px; height: 80px; font-size: 1.75rem; }
  `]
})
export class Avatar {
  readonly name = input('?');
  readonly avatarUrl = input<string | undefined>();
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  protected readonly sizeClass = computed(() => this.size());
  protected readonly initials = computed(() => {
    const n = this.name();
    return n ? n.slice(0, 2) : '?';
  });
  protected readonly bgColor = computed(() => {
    const n = this.name();
    if (!n) return 'var(--color-primary)';
    const colors = ['#D4644A', '#2D8C7C', '#F4A261', '#D95C5C', '#4CAF7D', '#E8A840', '#6C5CE7', '#A29BFE'];
    let hash = 0;
    for (let i = 0; i < n.length; i++) {
      hash = n.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  });
}
