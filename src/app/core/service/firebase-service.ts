import { Injectable } from '@angular/core';
import { fb } from '../../../firebase';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  readonly auth = fb.auth;
  readonly db = fb.db;
  readonly tables = fb.tables;

  constructor() {}

  

}
