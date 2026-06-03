import { Component, input, output } from '@angular/core';
import { CarType } from '../../../core/models/car.model';

@Component({
  selector: 'app-filter-bar',
  imports: [],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.css',
})
export class FilterBar {
  readonly types = input.required<CarType[]>();
  readonly active = input<CarType | null>(null);
  readonly filterChange = output<CarType | null>();
}
