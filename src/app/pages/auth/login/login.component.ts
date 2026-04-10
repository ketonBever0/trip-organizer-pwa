import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  emailForm: FormGroup;
  emailChecking = false;
  emailExists: boolean | null = null;

  @Output() tabChangeEvent = new EventEmitter<string>();
  @Output() emailSetEvent = new EventEmitter<string>();

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthService,
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['testuser1@example.com', [Validators.required, Validators.email]],
    });
  }

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
