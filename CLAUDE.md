# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Panoramica del Progetto

Questo workspace contiene tre progetti distinti:

- **`hotelinventoryapp/`** — App Angular 21 principale per la gestione di un inventario hotel, con SSR abilitato.
- **`collective-horizon-6/`** — App Angular 21 per tracciare la collezione auto di Forza Horizon 6, con SSR e CDK virtual scroll. Vedi `collective-horizon-6/CLAUDE.md` per i dettagli.
- **`TypescriptDemo/`** — Progetto autonomo di esercitazione TypeScript (non collegato all'app Angular).

---

## Comandi principali

### `hotelinventoryapp/`

```bash
npm start                                        # Dev server → http://localhost:4200
ng build                                         # Build di produzione
ng test                                          # Esegue i test con Vitest
npx vitest run src/app/rooms/rooms.spec.ts       # Singolo file di test
node dist/hotelinventoryapp/server/server.mjs    # Serve il build SSR
```

### `collective-horizon-6/`

```bash
npm start                                               # Dev server → http://localhost:4200
ng build                                                # Build di produzione
ng test                                                 # Esegue i test con Vitest
node dist/collective-horizon-6/server/server.mjs        # Serve il build SSR
```

---

## Architettura — `hotelinventoryapp`

### Pattern: Standalone Components (senza NgModule)

L'app usa esclusivamente **standalone components** (Angular 14+). Il bootstrap avviene tramite `bootstrapApplication()` in `main.ts`, con la configurazione centralizzata in `app.config.ts` (providers per router, hydration, error handling).

### Server-Side Rendering (SSR)

Configurata con Express 5:
- `main.server.ts` — bootstrap lato server
- `src/server.ts` — server Express (porta 4000 in produzione)
- `app.config.server.ts` — provider aggiuntivi lato server
- `app.routes.server.ts` — route server-side

Il client usa `withEventReplay()` per la reidratazione dopo l'SSR.

### Struttura dell'app

```
src/app/
├── app.ts / app.html / app.scss    ← Componente radice
├── app.config.ts                   ← Providers e router
├── app.routes.ts                   ← Definizione route client
└── rooms/
    ├── rooms.ts / rooms.html       ← Feature principale
    ├── irooms.ts                   ← Interfacce IRooms, IRoomList
    └── rooms.spec.ts               ← Test del componente
```

### Convenzioni

- **Selector prefix**: `hinv-` (es. `hinv-root`, `hinv-rooms`)
- **Stili**: SCSS per ogni componente + `styles.scss` globale
- **Control flow**: sintassi moderna `@if`, `@else`, `@for` (Angular 17+)
- **Reattività**: Signals (`signal()`) per lo stato dei componenti
- **Tipizzazione**: strict mode abilitato, template strict attivo

---

## TypescriptDemo

Progetto standalone (non Angular) per esercitarsi con TypeScript. Ha il proprio `tsconfig.json` e `package.json`. I file `.ts` si compilano ed eseguono individualmente con `ts-node` o `tsc`.
