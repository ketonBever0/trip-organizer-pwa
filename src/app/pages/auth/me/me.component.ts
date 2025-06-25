import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-me',
  imports: [MatButtonModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeComponent {
  constructor(private readonly authService: AuthService) {}

  logout() {
    this.authService.signOut();
  }
}
