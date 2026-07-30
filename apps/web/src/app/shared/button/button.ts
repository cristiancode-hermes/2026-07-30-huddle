import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  template: `
    <button
      class="btn btn-{{ variant() }} btn-{{ size() }}"
      [class.btn-full]="full()"
      [class.btn-loading]="loading()"
      [disabled]="disabled() || loading()"
      [type]="type()"
      (click)="onClick.emit($event)"
    >
      @if (!loading()) {
        <ng-content />
      }
    </button>
  `,
  styles: [`
    :host { display: inline-flex; }
  `]
})
export class Button {
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'danger' | 'icon'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly full = input(false);
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit'>('button');
  readonly onClick = output<Event>();
}
