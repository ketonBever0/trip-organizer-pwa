import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-botnav',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './botnav.component.html',
  styleUrl: './botnav.component.scss',
})
export class BotnavComponent {
  constructor(protected readonly fAuth: AuthService) {}
}
