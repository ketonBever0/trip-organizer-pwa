import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public readonly db: AngularFirestore) {
    
  }

}
