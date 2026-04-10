import { GeoPoint, Timestamp } from '@angular/fire/firestore';
import { Chat } from './chat.model';

export interface Program {
  id: string;
  type: 'MEETING' | 'TRAVEL';
  name: string;
  startDate: Timestamp;
  endDate: Timestamp | null;
  meetingTime: Timestamp;
  meetingPoint: string | GeoPoint;
  destination: string | GeoPoint | null;
  cost: number | null;
  limit: number | null;
  chat: Chat[] | null;
}
