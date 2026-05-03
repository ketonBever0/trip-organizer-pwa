import { DocumentReference } from '@angular/fire/firestore';
import { Trip } from './trip.model';
import { User } from './user.model';

export interface Organization {
  id: string;
  name: string;
  type: string;
  description: string;
  ownerRef: DocumentReference;
  owner: User;
  adminRefs: DocumentReference[];
  admins: User[];
  memberRefs: DocumentReference[];
  members: User[];
  guestRefs: DocumentReference[];
  guests: User[];
}
