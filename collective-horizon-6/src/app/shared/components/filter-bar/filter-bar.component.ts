import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CarType } from '../../../core/models/car.model';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="filters">
      <button
        class="filters__btn"
        [class.filters__btn--active]="active === null"
        (click)="filterChange.emit(null)"
      >Tutte</button>

      @for (type of types; track type) {
        <button
          class="filters__btn"
          [class.filters__btn--active]="active === type"
          (click)="filterChange.emit(type)"
        >{{ type }}</button>
      }
    </nav>
  `,
  styles: [`
    .filters { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .filters__btn {
      padding: 0.4rem 0.9rem;
      border: 1px solid #374151;
      border-radius: 999px;
      background: transparent;
      color: #d1d5db;
      cursor: pointer;
      font-size: 0.85rem;
    }
    .filters__btn--active { background: #fbbf24; color: #111; border-color: #fbbf24; }
  `],
})
export class FilterBarComponent {
  @Input() types: CarType[] = [];
  @Input() active: CarType | null = null;
  @Output() filterChange = new EventEmitter<CarType | null>();
}