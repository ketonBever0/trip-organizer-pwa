import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './main/firebase-service';
import { User } from '@app/core/models/user';
import { BehaviorSubject } from 'rxjs';

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
}
