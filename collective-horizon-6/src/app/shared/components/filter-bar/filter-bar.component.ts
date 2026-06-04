import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CarType } from '../../../core/models/car.model';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="filters">
      <button
        type="button"
        class="chip"
        [class.is-active]="active === null"
        (click)="filterChange.emit(null)"
      >Tutte</button>

      @for (type of types; track type) {
        <button
          type="button"
          class="chip"
          [class.is-active]="active === type"
          (click)="filterChange.emit(type)"
        >{{ type }}</button>
      }
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .filters { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip {
      padding: 8px 16px;
      border: 0;
      cursor: pointer;
      color: var(--ch-muted);
      background: var(--ch-panel);
      font: 700 12.5px/1 'Saira Condensed', sans-serif;
      letter-spacing: .6px;
      text-transform: uppercase;
      clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
      transition: color .15s ease, transform .15s ease, background .15s ease;
    }
    .chip:hover { color: var(--ch-text); transform: translateY(-2px); }
    .chip.is-active { background: var(--ch-grad); color: #1a0d06; }
  `],
})
export class FilterBarComponent {
  @Input() types: CarType[] = [];
  @Input() active: CarType | null = null;
  @Output() filterChange = new EventEmitter<CarType | null>();
}