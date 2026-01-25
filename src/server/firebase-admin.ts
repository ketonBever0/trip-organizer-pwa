import env from '../env';
import admin from 'firebase-admin';

class FirebaseAdminPool {
  static #inst: FirebaseAdminPool;

  private constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.firebaseAdmin.project_id,
        clientEmail: env.firebaseAdmin.client_email,
        privateKey: env.firebaseAdmin.private_key.replace(/\\n/g, '\n'),
      }),
    });
    this.admin = {
      auth: admin.auth(),
      db: admin.firestore(),
      apiKey: env.firebaseCfg.apiKey
    };
  }

  admin: {
    db: admin.firestore.Firestore;
    auth: admin.auth.Auth;
    apiKey: string;
  };

  static get inst(): FirebaseAdminPool {
    return (FirebaseAdminPool.#inst ??= new FirebaseAdminPool());
  }
}
export const fbAdmin = FirebaseAdminPool.inst;
