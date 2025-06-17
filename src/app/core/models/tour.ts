import { Timestamp } from '@angular/fire/firestore';
import { TourChat } from './tour-chat';

export type TourType = {
  id: string;
  name: string;
  destination: string;
  startDate: Timestamp;
  endDate: Timestamp;
  budget: number;
  activities: string[];
  transportation: string;
  applied: string[];
  limit: number;
  orgId: string;
  chat: TourChat[];
};
