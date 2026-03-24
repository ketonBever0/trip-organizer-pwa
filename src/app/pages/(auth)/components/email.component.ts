import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  ChangeDetectorRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/core/services/auth-service';
import { addIcons } from 'ionicons';
import { logoGoogle } from 'ionicons/icons';
import { IonInput, IonButton, IonItem } from '@ionic/angular/standalone';
import { IonTabs } from '@ionic/angular/common';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [CommonModule, IonInput, IonButton, IonItem, ReactiveFormsModule],
  styles: `
    #opt-google {
      --background: rgba(0, 0, 0, 0.5);
      --border-color: white;
      --border-style: solid;
      --border-width: 1px;

      // background: linear-gradient(45deg, #4285f4, #db4437, #f4b400, #0f9d58);
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      // background-clip: text;
    }
  `,
  template: `
    <h1 class="text-center">Login or Sign Up</h1>
    <p class="text-center">with</p>
    <form
      class="py-6 flex flex-col gap-4 justify-center items-center *:w-xs"
      (ngSubmit)="emailSubmit()"
      [formGroup]="emailForm"
    >
      <ion-button id="opt-google" class="text-white py-2" size="small">
        <!-- <ion-icon slot="start" name="logo-google" /> -->
        <p style="color: #4285f4;">G</p>
        <p style="color: #db4437;">O</p>
        <p style="color: #f4b400;">O</p>
        <p style="color: #4285f4;">G</p>
        <p style="color: #0f9d58;">L</p>
        <p style="color: #db4437;">E</p>
      </ion-button>
      <p class="text-center">or</p>
      <div class="*:rounded-2xl">
        <ion-item>
          <ion-input
            label="Email"
            labelPlacement="floating"
            placeholder="some@domain.com"
            type="email"
            formControlName="email"
            [errorText]="['Enter a valid email']"
            required
          />
        </ion-item>
      </div>
      <div class="flex flex-col">
        <ion-button type="submit" [disabled]="emailChecking"
          >Proceed</ion-button
        >
      </div>
    </form>
  `,
})
export class EmailComponent implements OnInit {
  // private readonly service = inject(Service);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthService,
  ) {
    addIcons({ logoGoogle });
    this.emailForm = formBuilder.group({
      email: ['testuser1@example.com', [Validators.required, Validators.email]],
    });
  }

  emailForm: FormGroup;
  emailChecking = false;
  emailExists: boolean | null = null;

  @Output() tabChangeEvent = new EventEmitter<string>();
  @Output() emailSetEvent = new EventEmitter<string>();

  async emailSubmit() {
    if (!this.emailChecking && this.emailForm.valid) {
      this.emailChecking = true;
      const res: string | boolean = await this.auth.checkEmail(
        this.emailForm.value.email,
      );
      this.emailChecking = false;
      this.cdr.detectChanges();
      if (typeof res === 'string') {
        return;
      }
      sessionStorage.setItem('saved', res ? 'login' : 'signup');
      sessionStorage.setItem('email', this.emailForm.value['email']);
      this.emailSetEvent.emit(this.emailForm.value.email);
      this.tabChangeEvent.emit(res ? 'login' : 'signup');
    }
  }

  ngOnInit(): void {}
}
