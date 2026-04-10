import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { passwordMatchValidator } from '@utilities/validators/passwordMatch.validator';

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastController: ToastController,
  ) {
    // addIcons({ arrowUndo });
    this.signupForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        nick: ['', [Validators.minLength(2)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''],
      },
      // {
      //   validators: passwordMatchValidator('password', 'confirmPassword'),
      // },
    );
  }

  @Input() email!: string | null;
  @Output() tabChangeEvent = new EventEmitter<string>();

  back() {
    sessionStorage.removeItem('saved');
    sessionStorage.removeItem('email');
    this.tabChangeEvent.emit('login');
  }

  signupForm: FormGroup;

  async onSubmit() {
    if (!this.signupForm.valid) {
      const toast = await this.toastController.create({
        message: 'Please review the form.',
        duration: 5000,
        position: 'bottom',
      });
      await toast.present();
      return;
    }

    const error = await this.authService.signUpWithEmail(
      this.email!,
      this.signupForm.value.password,
      this.signupForm.value.name,
      this.signupForm.value.nick || null,
    );

    if (!error) this.back();
    else {
      const toast = await this.toastController.create({
        message: error,
        duration: 5000,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  ngOnInit(): void {}
}
