import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButton,
    MatLabel,
    MatInputModule,
    MatButtonModule,
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public readonly registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      mobile: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  private _snackBar = inject(MatSnackBar);

  async onSubmit() {
    if (!this.registerForm.valid) {
      this._snackBar.open('You did not provide all required data.', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.registerForm.value.password !=
      this.registerForm.value.confirmPassword
    ) {
      this._snackBar.open('Password and Confirm Password must match.', '', {
        duration: 3000,
      });
      return;
    }

    const error = await this.authService.signUp(this.registerForm);
    if (error) this._snackBar.open(error, '', { duration: 3000 });
    else this.router.navigateByUrl('/signin');
  }
}
