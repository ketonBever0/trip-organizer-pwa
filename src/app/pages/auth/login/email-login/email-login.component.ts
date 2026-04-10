import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'email-login-component',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class EmailLoginComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastController: ToastController,
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  passwordForm: FormGroup;

  @Input() email!: string | null;
  @Output() tabChangeEvent = new EventEmitter<string>();

  back() {
    sessionStorage.removeItem('saved');
    sessionStorage.removeItem('email');
    this.tabChangeEvent.emit('login');
  }

  loggingIn = false;

  async onSubmit() {
    if (!this.passwordForm.valid) return;

    const error = await this.authService.loginWithEmail(
      this.email!,
      this.passwordForm.value.password,
    );
    if (!error) {
      this.router.navigate(['/home']).then(async () => {
        const toast = await this.toastController.create({
          message: 'Welcome back!',
          duration: 5000,
          position: 'bottom',
        });
        await toast.present();
      });
    } else {
      const toast = await this.toastController.create({
        message: error,
        duration: 5000,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  ngOnInit() {}
}
