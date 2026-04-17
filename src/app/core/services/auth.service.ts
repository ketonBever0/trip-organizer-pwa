import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { getAuth } from '@firebase/auth';
import { User } from '@models/user.model';
import { Observable, of, Subscription, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore,
  ) {}

  private authUser$ = user(this.auth);
  userData$ = this.authUser$.pipe(
    switchMap((aUser) =>
      aUser
        ? (docData(
            doc(this.firestore, 'users', aUser.uid),
          ) as Observable<User | null>)
        : of(null),
    ),
  );

  async logout() {
    await this.auth.signOut();
  }

  async checkEmail(email: string): Promise<boolean | string> {
    return await getDocs(
      query(collection(this.firestore, 'users'), where('email', '==', email)),
    )
      .then((doc) => {
        return !doc.empty;
      })
      .catch(() => {
        return 'Error occoured. Try again later.';
      });
  }

  async loginWithEmail(
    email: string,
    password: string,
  ): Promise<string | null> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return null;
    } catch (e) {
      return 'Error';
    }
  }

  async signUpWithEmail(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    nick?: string,
  ): Promise<string | null> {
    try {
      const res = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      const userDoc = {
        email: res.user.email!,
        firstname,
        lastname,
        nick: nick == '' || null ? null : nick,
      };

      await setDoc(doc(this.firestore, 'users', res.user.uid), userDoc);

      return null;
    } catch (e) {
      return 'Error';
    }
  }
}
