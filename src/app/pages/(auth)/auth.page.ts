import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonTabs, IonTab } from '@ionic/angular/standalone';
import { EmailComponent } from './components/email.component';
import { Signup } from './components/signup.component';

@Component({
  selector: 'auth-page',
  standalone: true,
  styles: ``,
  template: `
    <div>
      <ion-tabs #authTabs>
        <ion-tab tab="email">
          <login-component
            (tabChangeEvent)="onTabChange($event)"
            (emailSetEvent)="onEmailSet($event)"
          />
        </ion-tab>
        <ion-tab tab="login"> Login </ion-tab>
        <ion-tab tab="signup">
          <signup-component (tabChangeEvent)="onTabChange($event)" />
        </ion-tab>
      </ion-tabs>
    </div>
  `,
  imports: [ReactiveFormsModule, IonTabs, IonTab, EmailComponent, Signup],
})
export default class AuthPage implements AfterViewInit {
  constructor() {}

  @ViewChild('authTabs') tabs!: IonTabs;

  email: string | null = null;

  onEmailSet(email: string) {
    this.email = email;
  }

  onTabChange(tab: string) {
    this.tabs.select(tab);
  }

  ngAfterViewInit(): void {
    const saved = sessionStorage.getItem('saved');
    if (saved && ['login', 'signup'].includes(saved)) {
      this.email = sessionStorage.getItem('email');
      this.tabs.select(saved);
    }
    // sessionStorage.removeItem('saved');
  }
}
