import { Injectable, signal, computed, effect } from '@angular/core';
import { Car } from '../models/car.model';

const STORAGE_KEY = 'ch6-owned-cars';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  // Sorgente di verità della possessione: un Set di ID auto
  private readonly _ownedIds = signal<Set<string>>(this.loadFromStorage());
  readonly ownedIds = this._ownedIds.asReadonly();

  // Quante auto possiedi (si ricalcola da solo quando cambia il Set)
  readonly ownedCount = computed(() => this._ownedIds().size);

  constructor() {
    // Ogni volta che _ownedIds cambia, salvo automaticamente su localStorage.
    // In futuro qui (o meglio in un metodo dedicato) farai la chiamata al backend.
    effect(() => this.saveToStorage(this._ownedIds()));
  }

  isOwned(id: string): boolean {
    return this._ownedIds().has(id);
  }

  toggleOwned(id: string): void {
    this._ownedIds.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  setOwned(id: string, owned: boolean): void {
    this._ownedIds.update((set) => {
      const next = new Set(set);
      owned ? next.add(id) : next.delete(id);
      return next;
    });
  }

  /**
   * Seed iniziale: alla prima apertura (localStorage vuoto) prende le auto
   * con `owned: true` dal JSON come stato di partenza.
   * Se l'utente ha già una collezione salvata, non tocca nulla.
   */
  seedFromCatalog(cars: Car[]): void {
    if (this._ownedIds().size > 0) return;
    const owned = cars.filter((c) => c.owned).map((c) => c.id);
    this._ownedIds.set(new Set(owned));
  }

  private loadFromStorage(): Set<string> {
    if (typeof localStorage === 'undefined') return new Set();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
    } catch {
      return new Set();
    }
  }

  private saveToStorage(ids: Set<string>): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  }
}