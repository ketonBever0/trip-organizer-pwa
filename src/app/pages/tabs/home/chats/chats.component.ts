import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';

@Component({
  selector: 'home-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonNote,
  ],
})
export class ChatsComponent implements OnInit {
  chats = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'See you tomorrow!',
      time: '9:15 AM',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      name: 'Trip Group',
      lastMessage: 'New itinerary uploaded',
      time: 'Yesterday',
      avatar: 'https://via.placeholder.com/40',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
