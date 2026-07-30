import { Component, input, output, signal, effect } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (isOpen()) {
      <div class="modal-overlay" (click)="onOverlayClick($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ title() }}</h2>
            <button class="modal-close" (click)="close()">✕</button>
          </div>
          <div class="modal-body">
            <ng-content />
          </div>
          @if (showFooter()) {
            <div class="modal-footer">
              <ng-content select="[footer]" />
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed; inset: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: var(--space-md);
      animation: fadeIn var(--motion-slow);
    }
    .modal-content {
      background-color: var(--color-surface);
      border-radius: var(--radius-xl);
      max-width: 520px; width: 100%; max-height: 85vh;
      overflow-y: auto; box-shadow: var(--shadow-xl);
      animation: slideUp var(--motion-slow);
    }
    .modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--space-lg) var(--space-lg) 0;
    }
    .modal-body { padding: var(--space-lg); }
    .modal-footer {
      display: flex; align-items: center; justify-content: flex-end;
      gap: var(--space-sm); padding: 0 var(--space-lg) var(--space-lg);
    }
    .modal-close {
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      border-radius: var(--radius-sm);
      color: var(--color-muted);
      transition: background-color var(--motion-fast), color var(--motion-fast);
    }
    .modal-close:hover {
      background-color: var(--color-border);
      color: var(--color-ink);
    }
    h2 { font-size: 1.25rem; font-weight: 600; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class Modal {
  readonly title = input('Modal');
  readonly showFooter = input(false);
  readonly open = input(false);
  readonly closeModal = output<void>();

  protected readonly isOpen = signal(false);

  constructor() {
    effect(() => this.isOpen.set(this.open()));
  }

  close() {
    this.closeModal.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}
