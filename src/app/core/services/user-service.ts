import { Injectable } from '@angular/core';
import { FirebaseService } from './main/firebase-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly fb: FirebaseService) {}

  getUserById(id: string) {
    // TODO
  }

}
