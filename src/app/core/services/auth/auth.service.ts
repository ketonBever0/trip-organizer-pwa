import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { UserType } from '../../models/user';
import { StoreService } from '../store/store.service';
import { BehaviorSubject } from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  clearIndexedDbPersistence,
  doc,
  getDoc,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  setDoc,
  terminate,
} from '@angular/fire/firestore';
import { getApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = signal<UserType | null>(null);

  constructor(
    public readonly fAuth: Auth,
    private readonly fStore: StoreService
  ) {
    this.fAuth = getAuth();

    authState(fAuth).subscribe(async (user) => {
      if (user) {
        this.userData.set({
          ...(await getDoc(doc(fStore.db, 'users', user.uid))).data(),
          id: user.uid,
        } as UserType);
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  isAuthenticated = false;

  // userDataSuspect = new BehaviorSubject<UserType | null>(null);
  // userData = this.userDataSuspect.asObservable();

  async signUp(form: FormGroup): Promise<string | null> {
    let error: string | null = null;
    await createUserWithEmailAndPassword(
      this.fAuth,
      form.value.email,
      form.value.password
    )
      .then((creds) => {
        if (creds)
          setDoc(doc(this.fStore.db, 'users', creds.user!.uid), {
            // id: creds.user?.uid,
            email: creds.user?.email,
            fullname: form.value.fullname,
            mobile: form.value.mobile,
            role: 'user',
          });
      })
      .catch((e) => {
        error = e;
      });
    return error;
  }

  accessToken: string | null = null;

  async signIn(form: FormGroup): Promise<string | null> {
    let error: string | null = null;
    await signInWithEmailAndPassword(
      this.fAuth,
      form.value.email,
      form.value.password
    ).catch((e: FirebaseError) => {
      console.log(e.message);
      if (e.message.includes('auth/invalid-credential')) {
        error = 'Wrong credentials!';
      } else if (e.message.includes('auth/too-many-requests)')) {
        error = 'Too many requests. Please try again later.';
      }
    });

    if (error) return error;
    else return null;
  }

  async signOut() {
    // await terminate(this.fStore.db);
    // await clearIndexedDbPersistence(this.fStore.db);
    // initializeFirestore(getApp(), {
    //   localCache: persistentLocalCache({
    //     tabManager: persistentMultipleTabManager(),
    //   }),
    // });
    this.isAuthenticated = false;
    this.userData.set(null);
    await this.fAuth.signOut();
  }
}
