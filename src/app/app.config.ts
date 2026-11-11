import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // MessageService na raiz: um único <p-toast> (no AppComponent) atende todas as telas
  providers: [provideRouter(routes), provideAnimations(), MessageService]
};
