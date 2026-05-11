// Importa la funzione che avvia l'app
// Angular senza usare NgModule
// è equivalente a questo: platformBrowserDynamic().bootstrapModule(AppModule)
import { bootstrapApplication } from '@angular/platform-browser';
// importa la configurazione dell'app e il componente principale
import { appConfig } from './app/app.config';
// importa il root component
import { App } from './app/app';

// Avvia Angular con il componente App e la configurazione appConfig
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
