import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { AsyncPipe } from '@angular/common';
import { ChatsComponent } from './chats/chats.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, AsyncPipe, ChatsComponent, WelcomeComponent],
})
export class HomeTab {
  constructor(protected readonly authService: AuthService) {}
}
