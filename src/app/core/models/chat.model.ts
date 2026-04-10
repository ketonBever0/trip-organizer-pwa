import { Timestamp } from '@angular/fire/firestore';
import { User } from './user.model';

export interface Chat {
  id: string;
  by: User;
  text: string;
  when: Timestamp;
}
