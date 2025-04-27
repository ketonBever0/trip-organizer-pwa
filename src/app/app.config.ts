import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { env } from '../environment';
import { provideServiceWorker } from '@angular/service-worker';
import { DBConfig, provideIndexedDb } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'tours',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'destination',
          keypath: 'destination',
          options: { unique: false },
        },
      ],
    },
  ],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(env.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideIndexedDb(dbConfig),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'tourism-d7f90',
        appId: '1:1083320592689:web:df461fd4b02bba9ab96810',
        storageBucket: 'tourism-d7f90.firebasestorage.app',
        apiKey: 'AIzaSyCxaPfiywfMojF8gBf5_mTUIxdRyrQwZSs',
        authDomain: 'tourism-d7f90.firebaseapp.com',
        messagingSenderId: '1083320592689',
      })
    ),
  ],
};
