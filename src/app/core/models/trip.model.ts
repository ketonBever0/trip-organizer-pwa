import { Timestamp } from '@angular/fire/firestore';
import { Departure } from './departure.model';
import { User } from './user.model';
import { Chat } from './chat.model';
import { Program } from './program.model';
import { Organization } from './organization.model';

export interface Trip {
  id: string;
  organizer: Organization;
  destination: string;
  startDate: Timestamp;
  endDate: Timestamp;
  departures: Departure[];
  limit: number;
  leaders: User[];
  members: User[];
  cost: number;
  programs: Program[];
  chat: Chat[];
}
