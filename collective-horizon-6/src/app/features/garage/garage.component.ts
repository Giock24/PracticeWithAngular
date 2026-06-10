import { Component, OnInit, OnDestroy, inject, signal, computed, ChangeDetectionStrategy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CarService } from '../../core/services/car.service';
import { CollectionService } from '../../core/services/collection.service';
import { Car, CarType } from '../../core/models/car.model';
import { CarCardComponent } from '../../shared/components/car-card/car-card.component';
import { FilterBarComponent } from '../../shared/components/filter-bar/filter-bar.component';

const CARD_HEIGHT = 280;

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CarCardComponent, FilterBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css',
})
export class GarageComponent implements OnInit, OnDestroy {
  private readonly carService = inject(CarService);
  private readonly collection = inject(CollectionService);
  private readonly ngZone = inject(NgZone);

  private _resizeObserver?: ResizeObserver;
  private readonly _gridHeight = signal(0);

  @ViewChild('gridContainer') set gridContainerRef(el: ElementRef<HTMLElement> | undefined) {
    this._resizeObserver?.disconnect();
    if (!el || typeof ResizeObserver === 'undefined') return;
    this._resizeObserver = new ResizeObserver(entries => {
      const h = entries[0]?.contentRect.height ?? 0;
      this.ngZone.run(() => this._gridHeight.set(h));
    });
    this._resizeObserver.observe(el.nativeElement);
  }

  readonly activeFilter = signal<CarType | null>(null);
  readonly loading = this.carService.loading;
  readonly ownedCount = this.collection.ownedCount;

  readonly rowCount = computed(() =>
    Math.min(3, Math.max(1, Math.floor(this._gridHeight() / CARD_HEIGHT)))
  );

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
      .map((c) => ({ ...c, owned: ownedIds.has(c.id) }))
      .sort((a, b) =>
        `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)
      );
  });

  readonly totalCars = computed(() => this.carService.cars().length);
  readonly completion = computed(() =>
    this.totalCars() ? Math.round((this.ownedCount() / this.totalCars()) * 100) : 0
  );

  ngOnInit(): void {
    this.carService.loadCars().subscribe((cars) => {
      this.collection.seedFromCatalog(cars);
    });
  }

  ngOnDestroy(): void {
    this._resizeObserver?.disconnect();
  }

  onFilterChange(type: CarType | null): void {
    this.activeFilter.set(type);
  }

  onToggleOwned(id: string): void {
    this.collection.toggleOwned(id);
  }
}
