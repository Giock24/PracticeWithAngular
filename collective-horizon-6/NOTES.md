# Note di progetto — Collective Horizon 6

## CDK Virtual Scroll — itemSize orizzontale

Il `<cdk-virtual-scroll-viewport>` in `garage.component.html` usa `orientation="horizontal"` con `[itemSize]="316"`.

Questo valore **deve coincidere** con la larghezza effettiva di ogni `<app-car-card>`:

| Componente | Valore |
|---|---|
| Larghezza card (`car-card`) | 300 px |
| Padding orizzontale (`8px × 2`) | 16 px |
| **`itemSize` nel viewport** | **316** |

> Se cambi la larghezza della card in `car-card.css`, aggiorna anche `[itemSize]` in `garage.component.html`, altrimenti il CDK calcola male le posizioni degli elementi durante lo scroll.
