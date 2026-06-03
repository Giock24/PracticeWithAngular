import { Component, input, output } from '@angular/core';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-card',
  imports: [],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard {
  readonly car = input.required<Car>();
  readonly toggle = output<void>();
}
