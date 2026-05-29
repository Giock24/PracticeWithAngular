import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class CarService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl = 'assets/data/cars.json';

  // Catalogo completo di tutte le auto esistenti nel gioco
  private readonly _cars = signal<Car[]>([]);
  readonly cars = this._cars.asReadonly();

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  /**
   * Carica il catalogo dal JSON locale.
   * QUANDO passerai al backend, modifichi SOLO la riga `this.http.get(...)`
   * puntando alla tua REST API. Tutto il resto dell'app resta invariato.
   */
  loadCars(): Observable<Car[]> {
    this._loading.set(true);
    return this.http.get<Car[]>(this.dataUrl).pipe(
      tap({
        next: (cars) => {
          this._cars.set(cars);
          this._loading.set(false);
        },
        error: () => this._loading.set(false),
      })
    );
  }
}