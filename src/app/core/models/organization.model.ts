import { Trip } from './trip.model';
import { User } from './user.model';

export interface Organization {
  id: string;
  name: string;
  type: string;
  description: string;
  admins: User[];
  members: User[];
}
