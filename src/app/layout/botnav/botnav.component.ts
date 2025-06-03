import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-botnav',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: "./botnav.component.html",
  styleUrl: './botnav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotnavComponent {}
