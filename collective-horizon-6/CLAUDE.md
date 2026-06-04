# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandi

Tutti i comandi vanno eseguiti da `collective-horizon-6/`.

```bash
npm start                                          # Dev server → http://localhost:4200
ng build                                           # Build di produzione
ng test                                            # Esegue tutti i test (Vitest)
node dist/collective-horizon-6/server/server.mjs   # Serve il build SSR
```

## Architettura

**Collective Horizon 6** è un'app Angular 21 con standalone components (nessun NgModule) per tracciare la collezione auto di Forza Horizon 6. SSR abilitato via Express.

### Flusso dei dati

```
assets/data/cars.json
       ↓
  CarService          — carica il catalogo via HttpClient, espone il signal `cars`
       ↓
  CollectionService   — gestisce `_ownedIds: Signal<Set<string>>`, persiste in localStorage;
                         inizializza dalla flag `owned: true` del catalogo al primo avvio
       ↓
  GarageComponent     — calcola `displayedCars` (filtrate + ownership unita) tramite computed();
                         delega i toggle a CollectionService
       ↓
  CarCardComponent / FilterBarComponent
```

`CarService` e `CollectionService` sono indipendenti: il primo gestisce il catalogo immutabile, il secondo lo stato di proprietà mutabile. `GarageComponent` li unisce in un unico `computed()`.

### File principali

| Percorso | Scopo |
|---|---|
| `src/app/core/models/car.model.ts` | Interfaccia `Car` + union `CarType` (13 tipi) |
| `src/app/core/services/car.service.ts` | Loader del catalogo; basta cambiare l'URL JSON per passare a un REST |
| `src/app/core/services/collection.service.ts` | Stato di proprietà + sync con localStorage |
| `src/app/features/garage/garage.component.*` | Feature principale: hero, filter bar, CDK virtual scroll |
| `src/app/shared/components/car-card/` | UI della card; stili inline; larghezza `300px` + padding laterale `8px` |
| `src/app/shared/components/filter-bar/` | Barra chip per filtrare per tipo |
| `src/styles.css` | Import Tailwind v4 + tutte le CSS custom properties (design token) |

### CDK virtual scroll

Il viewport orizzontale in `garage.component.html` usa `[itemSize]="316"`.  
Questo valore **deve corrispondere** alla larghezza reale di `CarCardComponent`: `width: 300px` + `padding: 0 8px` (8 × 2 = 16 px) = **316 px**. Aggiornare entrambi insieme se la dimensione della card cambia.

### Design token

Colori, gradienti e tier di rarità sono tutti CSS custom properties in `src/styles.css` (`--ch-bg`, `--ch-text`, `--rar-rare`, ecc.). I componenti li referenziano direttamente — non usare valori hex fissi negli stili dei componenti.

### Pattern

- **Change detection**: tutti i componenti usano `OnPush`; lo stato scorre tramite signal e `computed()`.
- **Stili inline**: `CarCardComponent` e `FilterBarComponent` tengono gli stili inline (nessun file `.css` separato).
- **Guard SSR**: `CollectionService` verifica `typeof localStorage !== 'undefined'` prima di accedere allo storage del browser.
- **Routing**: singola route lazy — root `''` → `GarageComponent`.

## Testing

Il test runner è **Vitest** (configurato in `angular.json` via `@angular/build:unit-test`, ambiente jsdom).  
I file spec vivono accanto al loro soggetto (`*.spec.ts`).
