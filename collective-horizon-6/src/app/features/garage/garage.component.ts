import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CarService } from '../../core/services/car.service';
import { CollectionService } from '../../core/services/collection.service';
import { Car, CarType } from '../../core/models/car.model';
import { CarCardComponent } from '../../shared/components/car-card/car-card.component';
import { FilterBarComponent } from '../../shared/components/filter-bar/filter-bar.component';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [ScrollingModule, CarCardComponent, FilterBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css',
})
export class GarageComponent implements OnInit {
  private readonly carService = inject(CarService);
  private readonly collection = inject(CollectionService);

  // Filtro attivo: null = "Tutte"
  readonly activeFilter = signal<CarType | null>(null);

  readonly loading = this.carService.loading;
  readonly ownedCount = this.collection.ownedCount;

  // Tipi unici presenti nel catalogo, per popolare la filter bar
  readonly availableTypes = computed<CarType[]>(() => {
    const types = new Set(this.carService.cars().map((c) => c.type));
    return [...types].sort();
  });

  // VIEW MODEL: catalogo + possessione "live" dal CollectionService,
  // filtrato per tipo e ordinato alfabeticamente A→Z.
  readonly displayedCars = computed<Car[]>(() => {
    const filter = this.activeFilter();
    const ownedIds = this.collection.ownedIds();

    return this.carService.cars()
      .filter((c) => !filter || c.type === filter)
      .map((c) => ({ ...c, owned: ownedIds.has(c.id) })) // possessione live
      .sort((a, b) =>
        `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)
      );
  });

  // Totale auto possedute sul totale catalogo (per l'header)
  readonly totalCars = computed(() => this.carService.cars().length);

  ngOnInit(): void {
    this.carService.loadCars().subscribe((cars) => {
      this.collection.seedFromCatalog(cars); // seed solo alla prima apertura
    });
  }

  onFilterChange(type: CarType | null): void {
    this.activeFilter.set(type);
  }

  onToggleOwned(id: string): void {
    this.collection.toggleOwned(id);
  }

  trackById(_: number, car: Car): string {
    return car.id;
  }
}