import { Component } from '@angular/core';
import { IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'signup-page',
  standalone: true,
  template: `
    <div>
      <h1 class="text-center">Sign Up with</h1>
      <form class="py-6 flex flex-col gap-4 justify-center items-center *:rounded-3xl *:w-xs">
      <ion-button><ion-icon slot="start" name="logo-google"></ion-icon>with Google</ion-button>
        <ion-item>
          <ion-input
            label="Email"
            labelPlacement="floating"
            placeholder="some@domain.com"
            type="email"
            required
          />
        </ion-item>

        <ion-item>
          <ion-input
            label="Full Name"
            labelPlacement="floating"
            type="text"
            required
          />
        </ion-item>

          <ion-button>Submit</ion-button>
      </form>
    </div>
  `,
  imports: [IonItem, IonInput, IonButton, IonIcon],
})
export default class SignupPage {
  constructor() {}
}
