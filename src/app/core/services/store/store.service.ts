import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public readonly db: Firestore) {
    
  }

}
