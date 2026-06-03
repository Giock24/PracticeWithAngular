import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card" [class.card--locked]="!car.owned" (click)="toggle.emit()">
      <span class="card__badge" [class.card__badge--hidden]="!car.owned">★ Posseduta</span>
      <p class="card__model">{{ car.make }} {{ car.model }}</p>
      <img
        class="card__img"
        [src]="car.imagePath"
        [alt]="car.make + ' ' + car.model"
        loading="lazy"
        width="260"
        height="150"
      />
      <span class="card__type">{{ car.type }}</span>
    </article>
  `,
  styles: [`
    .card {
      width: 280px;
      margin: 0 0.5rem;
      padding: 0.75rem;
      border-radius: 0.75rem;
      background: #1f2937;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.15s ease;
    }
    .card:hover { transform: translateY(-4px); }
    .card__model { font-weight: 700; margin: 0 0 0.5rem; color: #fff; }
    .card__img { display: block; width: 100%; height: 150px; object-fit: cover; border-radius: 0.5rem; }
    .card__type { display: block; font-size: 0.75rem; color: #9ca3af; margin-top: 0.5rem; }
    .card__badge { font-size: 0.7rem; color: #fbbf24; font-weight: 700; }
    .card__badge--hidden { visibility: hidden; }

    /* Auto NON posseduta → bianco e nero, come da analisi */
    .card--locked .card__img { filter: grayscale(100%) brightness(0.7); }
    .card--locked .card__model { color: #9ca3af; }
  `],
})
export class CarCardComponent {
  @Input({ required: true }) car!: Car;
  @Output() toggle = new EventEmitter<void>();
}