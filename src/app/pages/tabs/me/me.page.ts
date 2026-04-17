import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { UsernamePipe } from '@utilities/pipes/username.pipe';

@Component({
  selector: 'app-me-tab',
  templateUrl: 'me.page.html',
  styleUrls: ['me.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, AsyncPipe, UsernamePipe],
})
export class MeTab {
  constructor() {}

  protected readonly authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
