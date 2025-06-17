import { Timestamp } from '@angular/fire/firestore';

export type AllChatsType = {
  id: string;
  name: string;
  lastChat: TourChat;
};

export type TourChat = {
  senderId: string;
  senderName: string;
  when: Timestamp;
  text: string;
};
