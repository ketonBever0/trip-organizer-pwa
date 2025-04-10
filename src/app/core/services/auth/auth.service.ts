import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { UserType } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.checkIsAuthenticated();
  }

  isAuthenticated = false;
  userData: UserType | null = null;

  fAuth: Auth = inject(Auth);
  fStore: Firestore = inject(Firestore);

  async signUp(form: FormGroup): Promise<string | null> {
    let error: string | null = null;
    await createUserWithEmailAndPassword(
      this.fAuth,
      form.value.email,
      form.value.password
    )
      .then((creds) => {
        if (creds)
          setDoc(doc(this.fStore, 'users', creds.user.uid), {
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
    await this.fAuth.signOut();
  }

  async checkIsAuthenticated() {
    onAuthStateChanged(this.fAuth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(this.fStore, 'users', user.uid));
        this.userData = userDoc.data() as UserType;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }
}
