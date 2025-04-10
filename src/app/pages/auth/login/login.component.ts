import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public readonly loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private snackBar = inject(MatSnackBar);

  async onSubmit() {
    if (this.loginForm.valid) {
      const error = await this.authService.signIn(this.loginForm);
      if (error) this.snackBar.open(error, '', { duration: 3000 });
      else {
        this.router.navigateByUrl('/home');
      }
    }
  }
}
