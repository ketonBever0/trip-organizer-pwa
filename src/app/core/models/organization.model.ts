import { Trip } from './trip.model';

export interface Organization {
  id: string;
  name: string;
  trips: Trip[];
  description: string;
}
