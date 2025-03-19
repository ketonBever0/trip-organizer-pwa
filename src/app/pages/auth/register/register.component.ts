import { Component } from '@angular/core';
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
import { AuthService } from '../../../core/auth/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButton,
    MatLabel,
    MatInputModule,
    MatButtonModule
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public readonly registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      fullname: ['', Validators.required],
      password: [
        '',
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ],
      passwordAgain: ['', Validators.required],
    });
  }

  onSubmit() {
    if (
      this.registerForm.controls['password'].value ==
        this.registerForm.controls['passwordAgain'] &&
      this.registerForm.valid
    ) {
      this.authService.signUp(this.registerForm);
    }
  }
}
