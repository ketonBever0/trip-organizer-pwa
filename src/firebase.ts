import env from './env';
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

  private readonly app: FirebaseApp;
  readonly db: Firestore;
  readonly auth: Auth;

  tables = { users: 'users' };

  static get inst(): FirebasePool {
    return (FirebasePool.#inst ??= new FirebasePool());
  }
}
export const fb = FirebasePool.inst;
