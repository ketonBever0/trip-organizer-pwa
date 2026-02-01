import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonAvatar, IonList, IonItem, IonRouterLink, IonIcon, IonButton, IonRouterLinkWithHref } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logInOutline } from 'ionicons/icons';
import { RouterLink } from "@angular/router";

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
    IonIcon,
    IonButton,
    IonRouterLinkWithHref,
    IonRouterLink,
    RouterLink
],
  template: `
    <ion-app ngSkipHydration class="min-h-screen">
      <!-- DRAWER -->
      <ion-menu contentId="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu Content</ion-title>
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
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>Menu</ion-title>
            <ion-buttons slot="end">
              <ion-button [routerLink]="['/signup']">
                Sign Up
              </ion-button>
              <ion-button [routerLink]="['/login']">
                Login
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-router-outlet />
        </ion-content>
      </div>
    </ion-app>
  `,
})
export class App implements OnInit {
  constructor() {
    addIcons({logInOutline});
  }

  ngOnInit(): void {}
}
