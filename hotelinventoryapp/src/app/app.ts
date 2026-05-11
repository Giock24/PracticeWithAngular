import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rooms } from './rooms/rooms';

// Il componente principale dell'app, che funge da root component
@Component({
  selector: 'hinv-root',
  imports: [RouterOutlet, Rooms],
  templateUrl: './app.html',
  // Se vuoi usare un template inline invece di un file esterno, puoi decommentare questa riga e commentare la precedente
  // template: `Hello World from inline template! {{ title() }}
  // <p>Congratulations! Your app is running. 🎉 SIEEE</p>`,
  styleUrl: './app.scss',
  // Se vuoi usare stili inline invece di un file esterno, puoi decommentare questa riga e commentare la precedente
  // styles : [` h1 { color: #ff4081; } `]
})
export class App {
  protected readonly title = signal('hotelinventoryapp');
}
