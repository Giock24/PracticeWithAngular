import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="card"
      [class.is-locked]="!car.owned"
      [class.is-unlocking]="justUnlocked()"
      [attr.data-rarity]="car.rarity ?? 'Common'"
      (click)="onClick()"
    >
      <span class="card__inner">
        <div class="card__media">
          <img
            class="card__img"
            [src]="car.imagePath"
            [alt]="car.make + ' ' + car.model"
            loading="lazy"
            width="300" height="180"
          />
          <span class="card__scrim"></span>

          @if (car.owned) {
            <span class="tag tag--owned">
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor"
                  stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              In garage
            </span>
          } @else {
            <span class="tag tag--locked">
              <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                <path d="M6 10V8a6 6 0 0112 0v2" fill="none" stroke="currentColor" stroke-width="2"/>
                <rect x="4" y="10" width="16" height="10" rx="2" fill="currentColor"/>
              </svg>
              Da sbloccare
            </span>
          }

          @if (car.rarity) {
            <span class="tag tag--rarity">{{ car.rarity }}</span>
          }

          <!-- overlay del flash di sblocco -->
          <span class="card__flash" (animationend)="justUnlocked.set(false)"></span>
        </div>

        <div class="card__body">
          <span class="card__make">{{ car.make }}</span>
          <span class="card__model">{{ car.model }}</span>
          <span class="card__type"><i class="dot"></i>{{ car.type }}</span>
        </div>
      </span>
    </button>
  `,
  styles: [`
    :host { display: block; flex: 0 0 auto; width: 300px; height: 100%; padding: 10px 8px; }

    .card {
      position: relative;
      width: 100%; height: 100%;
      padding: 2px;
      border: 0; cursor: pointer;
      background: var(--ch-line);
      clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
      filter: drop-shadow(0 6px 14px rgba(0,0,0,.45));
      transition: transform .18s ease, filter .18s ease;
    }
    .card:not(.is-locked)                      { background: var(--ch-grad); }
    .card:not(.is-locked)[data-rarity="Rare"]      { background: linear-gradient(115deg,#5db4ff,#2563eb); }
    .card:not(.is-locked)[data-rarity="Epic"]      { background: linear-gradient(115deg,#c084fc,#7c3aed); }
    .card:not(.is-locked)[data-rarity="Legendary"] { background: linear-gradient(115deg,#ffd35e,#ff8a1e); }
    .card:not(.is-locked)[data-rarity="Forza Edition"] { background: linear-gradient(115deg,#2dd47e,#1e9e8a); }

    .card:hover { transform: translateY(-6px); filter: drop-shadow(0 14px 26px rgba(255,90,60,.35)); }
    .card.is-locked:hover { filter: drop-shadow(0 12px 22px rgba(0,0,0,.55)); }

    .card__inner {
      display: flex; flex-direction: column;
      width: 100%; height: 100%;
      overflow: hidden;
      background: var(--ch-panel);
      clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
    }

    .card__media { position: relative; flex: 1 1 60%; overflow: hidden; }
    /* la transition sul filter fa il fade grigio → colore allo sblocco */
    .card__img { display: block; width: 100%; height: 100%; object-fit: cover;
      transition: transform .35s ease, filter .5s ease; }
    .card:hover .card__img { transform: scale(1.06); }
    .card__scrim { position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(10,12,18,.95) 2%, rgba(10,12,18,0) 46%); }

    .card.is-locked .card__img { filter: grayscale(100%) brightness(.55) contrast(.9); }
    .card.is-locked .card__model { color: var(--ch-muted); }

    /* --- flash di sblocco --- */
    .card__flash {
      position: absolute; inset: 0; pointer-events: none; opacity: 0;
      mix-blend-mode: screen;
      background: radial-gradient(circle at 50% 42%,
        rgba(255,255,255,.95) 0%, rgba(255,138,30,.55) 38%, rgba(255,46,126,0) 70%);
    }
    .card.is-unlocking .card__flash { animation: ch-flash .6s ease-out; }
    .card.is-unlocking .card__inner { animation: ch-pop .55s ease; }

    @keyframes ch-flash {
      0%   { opacity: 0; }
      18%  { opacity: .9; }
      100% { opacity: 0; }
    }
    @keyframes ch-pop {
      0%   { transform: scale(1); }
      30%  { transform: scale(1.045); }
      100% { transform: scale(1); }
    }

    .tag {
      position: absolute; top: 10px;
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 9px;
      font: 700 11px/1 'Saira Condensed', sans-serif;
      letter-spacing: .5px; text-transform: uppercase;
      clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
    }
    .tag--owned  { left: 10px; background: var(--ch-grad); color: #1a0d06; }
    .tag--locked { left: 10px; background: rgba(10,12,18,.78); color: var(--ch-muted); }
    .tag--rarity { right: 10px; background: rgba(10,12,18,.82); color: #fff; }
    .card[data-rarity="Common"]    .tag--rarity { color: var(--rar-common); }
    .card[data-rarity="Rare"]      .tag--rarity { color: var(--rar-rare); }
    .card[data-rarity="Epic"]      .tag--rarity { color: var(--rar-epic); }
    .card[data-rarity="Legendary"] .tag--rarity { color: var(--rar-legendary); }
    .card[data-rarity="Forza Edition"] .tag--rarity { color: var(--rar-forza); }

    .card__body { flex: 0 0 auto; padding: 12px 14px 14px; display: flex; flex-direction: column; gap: 2px; text-align: left; }
    .card__make  { font: 600 11px/1 'Saira', sans-serif; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ch-muted); }
    .card__model { font: 800 21px/1.05 'Saira Condensed', sans-serif; text-transform: uppercase; letter-spacing: .3px; color: var(--ch-text); }
    .card__type  { margin-top: 6px; display: inline-flex; align-items: center; gap: 6px;
      font: 500 12px/1 'Saira', sans-serif; color: var(--ch-muted); }
    .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ch-grad); flex: 0 0 auto; }

    @media (prefers-reduced-motion: reduce) {
      .card, .card__img, .card__inner, .card__flash { transition: none; animation: none; }
    }
  `],
})
export class CarCardComponent {
  @Input({ required: true }) car!: Car;
  @Output() toggle = new EventEmitter<void>();

  readonly justUnlocked = signal(false);

  onClick(): void {
    if (!this.car.owned) {
      this.justUnlocked.set(true); // sto per sbloccarla → flash
    }
    this.toggle.emit();
  }
}