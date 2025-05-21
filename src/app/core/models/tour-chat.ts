import { Timestamp } from '@angular/fire/firestore';

export type TourChat = {
  senderId: string;
  senderName: string;
  when: Timestamp;
  text: string;
};
