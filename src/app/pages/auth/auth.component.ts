import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonicModule, IonTabs } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [IonicModule, LoginComponent, SignupComponent],
})
export class AuthComponent implements OnInit, AfterViewInit {
  constructor(private readonly cdr: ChangeDetectorRef) {}

  @ViewChild('authTabs') tabs!: IonTabs;

  email: string | null = null;

  onEmailSet(email: string) {
    this.email = email;
  }

  onTabChange(tab: string) {
    this.tabs.select(tab);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const saved = sessionStorage.getItem('saved');
    if (saved && ['login', 'signup'].includes(saved)) {
      this.email = sessionStorage.getItem('email');
      this.tabs.select(saved);
      this.cdr.detectChanges();
    }
    // sessionStorage.removeItem('saved');
  }
}
