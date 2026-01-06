import env from '@src/env';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

export class FirebasePool {
  static #inst: FirebasePool;

  private constructor() {
    this.app = initializeApp(env.firebaseCfg);
    this.db = getFirestore(this.app);
  }

  app: FirebaseApp;
  db: Firestore;

  public static get inst(): FirebasePool {
    if (!FirebasePool.#inst)
      FirebasePool.#inst = new FirebasePool();
    return FirebasePool.#inst;
  }
}
