import { GeoPoint, Timestamp } from '@angular/fire/firestore';
import { Chat } from './chat.model';
import { User } from './user.model';

export interface Departure {
  id: string;
  userRefs: User[];
  location: GeoPoint;
  meetingTime: Timestamp;
  chat: Chat[];
}
