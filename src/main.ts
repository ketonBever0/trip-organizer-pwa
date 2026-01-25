import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';
import { defineCustomElements } from 'ionicons/loader';

if (typeof window !== 'undefined') {
  defineCustomElements(window);
}

bootstrapApplication(App, appConfig);
