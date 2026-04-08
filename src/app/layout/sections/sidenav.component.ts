import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, home, pin, star } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon, RouterLink, IonRouterLink],
  template: `
    <div
      class="hidden fixed md:flex flex-col w-20 shrink-0 top-0 left-0 bg-gray-900 text-white min-h-screen mt-14 *:py-2 **:py-2"
    >
      <ion-button fill="clear" [routerLink]="['/']">
        <ion-icon name="home"></ion-icon>
      </ion-button>
      <ion-button fill="clear" [routerLink]="['/upcoming-trips']">
        <ion-icon name="heart"></ion-icon>
      </ion-button>
      <ion-button fill="clear" [routerLink]="['/asd']">
        <ion-icon name="pin"></ion-icon>
      </ion-button>
    </div>
  `,
})
export class Sidenav implements OnInit {
  constructor() {
    addIcons({ home, heart, pin, star });
  }

  ngOnInit(): void {}
}
