import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { UserType } from '../../models/user';
import { StoreService } from '../store/store.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public readonly fAuth: AngularFireAuth,
    private readonly fStore: StoreService
  ) {
    this.fAuth.authState.subscribe(async (user) => {
      if (user) {
        this.fStore.db
          .collection('users')
          .doc(user.uid)
          .get()
          .subscribe((data) => data);
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  isAuthenticated = false;
  userData: UserType | null = null;

  async signUp(form: FormGroup): Promise<string | null> {
    let error: string | null = null;
    await this.fAuth
      .createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then((creds) => {
        console.log(creds);
        if (creds)
          this.fStore.db.collection('users').doc(creds.user!.uid).set({
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
    await this.fAuth
      .signInWithEmailAndPassword(form.value.email, form.value.password)
      .catch((e: FirebaseError) => {
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
}
