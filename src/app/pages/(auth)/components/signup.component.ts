import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonIcon,
  IonButton,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowUndo } from 'ionicons/icons';
import {
  FormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'signup-component',
  standalone: true,
  imports: [
    CommonModule,
    IonIcon,
    IonButton,
    IonItem,
    IonInput,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="px-40 py-32">
      <div class="flex justify-between gap-4">
        <ion-button shape="round" fill="outline" (click)="back()"
          ><ion-icon slot="icon-only" name="arrow-undo"
        /></ion-button>
        <div>
          <h1>Sign Up</h1>
          <p class="text-center">Email {{ email }} was not found.</p>
        </div>
        <div></div>
      </div>
      <form [formGroup]="signupForm" class="flex justify-center">
        <div
          class="*:rounded-2xl flex gap-2 justify-items-center flex-col mt-4"
        >
          <div class="flex justify-center flex-row gap-3 *:rounded-2xl">
            <ion-item>
              <ion-input
                label="First Name"
                labelPlacement="floating"
                type="text"
                formControlName="firstname"
                [errorText]="['Minimum length 2']"
                required
              />
            </ion-item>
            <ion-item>
              <ion-input
                label="Last Name"
                labelPlacement="floating"
                type="text"
                formControlName="lastname"
                [errorText]="['Minimum length 2']"
                required
              />
            </ion-item>
          </div>
          <ion-item>
            <ion-input
              label="Password"
              labelPlacement="floating"
              type="password"
              formControlName="password"
              [errorText]="['Minimum length 2']"
              required
            />
          </ion-item>
          <ion-item>
            <ion-input
              label="Password Again"
              labelPlacement="floating"
              type="password"
              formControlName="passwordAgain"
              [errorText]="['Minimum length 2']"
              required
            />
          </ion-item>
          <ion-button>Confirm</ion-button>
        </div>
      </form>
    </div>
  `,
})
export class Signup implements OnInit {
  constructor(private readonly formBuilder: FormBuilder) {
    addIcons({ arrowUndo });
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required, Validators.minLength(2)],
      lastname: ['', Validators.required, Validators.minLength(2)],
      password: ['', Validators.required, Validators.minLength(8)],
      passwordAgain: ['', Validators.required, Validators.minLength(8)],
    });
  }

  @Input() email!: string | null;
  @Output() tabChangeEvent = new EventEmitter<string>();

  back() {
    sessionStorage.removeItem('saved');
    sessionStorage.removeItem('email');
    this.tabChangeEvent.emit('email');
  }

  signupForm;

  ngOnInit(): void {}
}
