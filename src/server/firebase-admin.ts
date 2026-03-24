import { env } from '../env';
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
    ((this.auth = admin.auth()),
      (this.db = admin.firestore()),
      (this.apiKey = env.firebaseConfig.apiKey));
  }

  readonly db: admin.firestore.Firestore;
  readonly auth: admin.auth.Auth;
  private readonly apiKey: string;

  static get inst(): FirebaseAdminPool {
    return (FirebaseAdminPool.#inst ??= new FirebaseAdminPool());
  }
}
export const fbAdmin = FirebaseAdminPool.inst;
