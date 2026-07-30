import { Component, input, output, signal, effect } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="toast toast-{{ type() }}">
        <span>{{ message() }}</span>
        <button class="toast-close" (click)="dismiss()">✕</button>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: var(--space-lg);
      right: var(--space-lg);
      z-index: 2000;
    }
    .toast {
      display: flex; align-items: center; gap: var(--space-sm);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-lg);
      min-width: 280px; max-width: 420px;
      animation: slideIn var(--motion-normal);
      font-size: 0.875rem;
    }
    .toast-success { border-left: 4px solid var(--color-success); }
    .toast-error { border-left: 4px solid var(--color-danger); }
    .toast-info { border-left: 4px solid var(--color-primary); }
    .toast-warning { border-left: 4px solid var(--color-warning); }
    .toast-close { margin-left: auto; color: var(--color-muted); flex-shrink: 0; cursor: pointer; background: none; border: none; font-size: 1rem; }
    @keyframes slideIn { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
  `]
})
export class Toast {
  readonly message = input('');
  readonly type = input<ToastType>('info');
  readonly autoDismiss = input(4000);
  readonly dismissToast = output<void>();

  protected readonly visible = signal(true);
  private timer: any;

  constructor() {
    effect(() => {
      const ms = this.autoDismiss();
      if (ms > 0) {
        this.timer = setTimeout(() => this.dismiss(), ms);
      }
    });
  }

  dismiss() {
    this.visible.set(false);
    if (this.timer) clearTimeout(this.timer);
    this.dismissToast.emit();
  }
}
