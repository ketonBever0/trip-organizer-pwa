import env from './env';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { collection, Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';
import fbAdmin from 'firebase-admin';

class FirebasePool {
  static #inst: FirebasePool;

  private constructor() {
    this.app = initializeApp(env.firebaseCfg);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);

    // ADMIN
    fbAdmin.initializeApp({
      credential: fbAdmin.credential.cert({
        projectId: env.firebaseAdmin.project_id,
        clientEmail: env.firebaseAdmin.client_email,
        privateKey: env.firebaseAdmin.private_key.replace(/\\n/g, '\n'),
      }),
    });
    this.admin = {
      auth: fbAdmin.auth(),
      db: fbAdmin.firestore(),
      apiKey: env.firebaseCfg.apiKey
    };
  }

  private app: FirebaseApp;
  db: Firestore;
  auth: Auth;

  admin: {
    db: fbAdmin.firestore.Firestore;
    auth: fbAdmin.auth.Auth;
    apiKey: string;
  };

  tables = { users: 'users' };

  static get inst(): FirebasePool {
    return (FirebasePool.#inst ??= new FirebasePool());
  }
}
export const fb = FirebasePool.inst;
