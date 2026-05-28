# 🚗 Collective Horizon 6

Un'applicazione web per tenere traccia della tua collezione di auto in **Forza Horizon 6** — senza dover aprire il gioco.
L'interfaccia è ispirata all'autosalone in-game, replicandone look and feel direttamente nel browser.

---

## 📖 Il Progetto

Collective Horizon 6 nasce da un'esigenza semplice: poter controllare quali auto possiedi in Forza Horizon senza dover avviare il gioco ogni volta.

Al di là dell'utilità pratica, questo progetto è anche una **sfida personale di apprendimento** — costruito per esplorare Angular, sperimentare un'architettura frontend moderna e capire fino a dove può arrivare lo sviluppo assistito dall'IA.

> Pensato inizialmente per uso personale, ma con un'architettura predisposta per una futura apertura al pubblico.

---

## ✨ Funzionalità

- 🔲 **Griglia visiva delle auto** — ordinate alfabeticamente da sinistra (A) a destra (Z) con scorrimento orizzontale
- 🏷️ **Nome del modello** visualizzato sopra ogni immagine
- 🔍 **Filtro per tipo di auto**
- ✅ **Badge "già posseduta"** — indicatore visivo chiaro sulle auto che hai già
- ⬛ **Bianco e nero** per le auto non ancora in collezione
- ⚡ **Scorrimento a 60fps** tramite virtual scrolling (vengono renderizzate solo le card visibili)

### 🔮 In Arrivo (Futuro)
- 🔐 Autenticazione utente — ogni utente gestisce la propria collezione
- 📱 Supporto PWA / mobile con layout responsive

---

## 🛠️ Stack Tecnologico

| Livello | Tecnologia |
|---|---|
| Framework | Angular 18+ (Standalone Components) |
| Linguaggio | TypeScript (strict mode) |
| Stile | TailwindCSS |
| State Management | Angular Signals |
| Dati | JSON locale (MVP) → REST API (futuro) |
| Performance | CDK Virtual Scrolling, OnPush change detection |

---

## 🗂️ Struttura del Progetto

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # Interfacce TypeScript (Car, CarType, ecc.)
│   │   └── services/        # CarService, CollectionService
│   ├── shared/
│   │   └── components/      # CarCard, Badge, FilterBar
│   ├── features/
│   │   └── garage/          # Pagina principale con la griglia auto
│   └── app.routes.ts
├── assets/
│   ├── images/cars/         # Immagini delle auto
│   └── data/cars.json       # Datasource locale
```

---

## 🚀 Come Iniziare

### Prerequisiti

- Node.js 18+
- Angular CLI 18+

```bash
npm install -g @angular/cli
```

### Installazione

```bash
# Clona il repository
git clone https://github.com/tuo-username/collective-horizon-6.git
cd collective-horizon-6

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
ng serve
```

Apri il browser su `http://localhost:4200`.

### Build

```bash
ng build
```

---

## 🗺️ Roadmap

| Fase | Stato | Descrizione |
|---|---|---|
| MVP | 🚧 In Corso | JSON locale, griglia auto, UI posseduta/non posseduta |
| V1 | 📋 Pianificato | Filtri, UI fedele a FH6, ottimizzazione performance |
| V2 | 💡 Futuro | Autenticazione, backend API, supporto PWA/mobile |

---

## 🎯 KPI

- Scorrimento fluido a **60fps** senza jank
- Tempo di caricamento iniziale **< da definire**
- UI approvata visivamente rispetto al riferimento FH6
- Compatibile su **Windows, Linux e macOS**

---

## 📄 Licenza

Progetto a uso personale ed educativo. Non affiliato né approvato da Xbox Game Studios o Playground Games.