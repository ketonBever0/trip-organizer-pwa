import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './main/firebase-service';
import { User } from '@app/core/models/user';
import { BehaviorSubject } from 'rxjs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly fb: FirebaseService) {
    this.listenAuthState();
  }

  authPending = true;
  private authStateSub = new BehaviorSubject<User | null>(null);
  authState = this.authStateSub.asObservable();

  listenAuthState() {
    this.fb.auth.onAuthStateChanged((cred) => {
      if (cred) {
        console.log(cred);
        // TODO: Get user data
      } else {
        this.authPending = false;
        this.authStateSub.next(null);
      }
    });
  }

  async emailLogin(email: string, password: string): Promise<string | null> {
    return await signInWithEmailAndPassword(this.fb.auth, email, password)
      .then(() => null)
      .catch((e: FirebaseError) => {
        if (e.message.includes('auth/invalid-credential')) {
          return 'Wrong password.';
        } else if (e.message.includes('auth/too-many-requests')) {
          return 'Too many requests. Try again later.';
        } else {
          return 'Unknown error.';
        }
      });
  }

  async checkEmail(email: string): Promise<boolean | string> {
    return await getDocs(
      query(
        collection(this.fb.db, this.fb.tables.users),
        where('email', '==', email),
      ),
    )
      .then((doc) => {
        return !doc.empty;
      })
      .catch(() => {
        return 'Error occoured. Try again later.';
      });
  }
}
