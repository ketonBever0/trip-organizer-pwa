import { Component, OnInit } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonAvatar,
  IonList,
  IonItem,
  IonRouterLink,
  IonIcon,
  IonButton,
  IonRouterLinkWithHref,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, logInOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './layout/sections/header.component';
import { Sidenav } from './layout/sections/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonAvatar,
    IonList,
    IonButton,
    IonRouterLink,
    RouterLink,
    IonIcon,
    HeaderComponent,
    Sidenav,
  ],
  template: `
    <ion-app ngSkipHydration class="min-h-screen flex flex-row">
      <!-- PAGE -->
      <div class="ion-page" id="main-content">
        <app-header />
        <ion-content class="ion-padding pt-6">
          <ion-router-outlet />
        </ion-content>
      </div>
      <app-sidenav />
    </ion-app>
  `,
})
export class App implements OnInit {
  constructor() {
    addIcons({ logInOutline, closeOutline });
  }

  ngOnInit(): void {}
}
