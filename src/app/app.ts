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
  ],
  template: `
    <ion-app ngSkipHydration class="min-h-screen">
      <!-- DRAWER -->
      <ion-menu contentId="main-content">
        <ion-header>
          <ion-toolbar>
            <div class="flex justify-between p-2">
              <ion-icon name="close-outline" size="large" />
              <span class="text-2xl">Menu Content</span>
            </div>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div
            class="flex flex-col justify-center items-center gap-2 text-center"
          >
            <ion-avatar>
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </ion-avatar>
            <p>name</p>
          </div>
          <ion-list class="mt-4"> </ion-list>
        </ion-content>
      </ion-menu>

      <!-- PAGE -->
      <div class="ion-page" id="main-content">
        <app-header />
        <ion-content class="ion-padding">
          <ion-router-outlet />
        </ion-content>
      </div>
    </ion-app>
  `,
})
export class App implements OnInit {
  constructor() {
    addIcons({ logInOutline, closeOutline });
  }

  ngOnInit(): void {}
}
