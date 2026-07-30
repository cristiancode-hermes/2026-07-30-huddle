import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <div class="modal-overlay" (click)="onCancel.emit()">
      <div class="confirm-box" (click)="$event.stopPropagation()">
        <h3>{{ title() }}</h3>
        <p class="text-body-sm text-muted mt-sm">{{ message() }}</p>
        <div class="confirm-actions">
          <button class="btn btn-ghost" (click)="onCancel.emit()">Cancel</button>
          <button class="btn btn-danger" (click)="onConfirm.emit()">{{ confirmLabel() }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed; inset: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: var(--space-md);
    }
    .confirm-box {
      background-color: var(--color-surface);
      border-radius: var(--radius-xl);
      padding: var(--space-xl);
      max-width: 400px; width: 100%;
      box-shadow: var(--shadow-xl);
    }
    h3 { font-size: 1.125rem; font-weight: 600; }
    .confirm-actions {
      display: flex; justify-content: flex-end;
      gap: var(--space-sm); margin-top: var(--space-lg);
    }
  `]
})
export class ConfirmDialog {
  readonly title = input('Confirm');
  readonly message = input('Are you sure?');
  readonly confirmLabel = input('Delete');
  readonly onConfirm = output<void>();
  readonly onCancel = output<void>();
}
