import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonList,
  IonAvatar,
  IonContent,
  IonIcon,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonButtons,
  IonButton,
  IonRouterLink,
  IonSegmentButton,
  IonSegment,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, heart, home, pin, star } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    IonList,
    IonAvatar,
    IonContent,
    IonIcon,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonMenuButton,
    IonTitle,
    IonButtons,
    IonButton,
    RouterLink,
    IonRouterLink,
    IonSegmentButton,
    IonSegment,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    ion-segment {
      flex-direction: column;
      height: auto;
    }

    ion-segment-button {
      width: 100%;
      justify-content: flex-start;
    }
  `,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <div class="md:hidden">
            <ion-menu-button></ion-menu-button>
          </div>
          <ion-title class="cursor-pointer" [routerLink]="['/']"
            >Trip4live</ion-title
          >
        </ion-buttons>
        <ion-buttons class="flex justify-center">
          <ion-button [routerLink]="['/']">Home</ion-button>
          <ion-button [routerLink]="['/trips']">Trips</ion-button>
          <ion-button [routerLink]="['/']">About</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button [routerLink]="['/auth']">Login now</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <div class="sticky top-0 left-0 w-20">
      <ion-segment value="heart" class="flex clex-col">
        <ion-segment-button value="home">
          <ion-icon name="home"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="heart">
          <ion-icon name="heart"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="pin">
          <ion-icon name="pin"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="star">
          <ion-icon name="star"></ion-icon>
        </ion-segment-button>
      </ion-segment>
    </div>
  `,
})
export class HeaderComponent implements OnInit {
  // private readonly service = inject(Service);

  constructor() {
    addIcons({ closeOutline, home, heart, pin, star });
  }

  ngOnInit(): void {
    // Initialization logic here
  }
}
