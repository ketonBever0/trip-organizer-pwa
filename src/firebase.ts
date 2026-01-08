import env from '@src/env';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';

class FirebasePool {
  static #inst: FirebasePool;

  private constructor() {
    this.app = initializeApp(env.firebaseCfg);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }

  private app: FirebaseApp;
  db: Firestore;
  auth: Auth;
  

  public static get inst(): FirebasePool {
    if (!FirebasePool.#inst)
      FirebasePool.#inst = new FirebasePool();
    return FirebasePool.#inst;
  }
}
export default FirebasePool.inst;