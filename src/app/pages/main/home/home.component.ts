import { DatePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnInit,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AllChatsType } from '@app/core/models/tour-chat';
import { TruncStrPipe } from '@app/core/pipes/trunc-str.pipe';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TourService } from '@app/core/services/tour/tour.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [MatProgressBarModule, MatIconButton, MatIconModule, MatTabsModule, DatePipe, TruncStrPipe, NgClass],
})
export class HomeComponent implements OnInit {
  chats: AllChatsType[] = [];
  selectedChat: string | null = null;

  constructor(
    protected readonly fAuth: AuthService,
    protected readonly tourService: TourService
  ) {
    effect(async () => {
      if (fAuth.userData()?.id) {
        // console.log(fAuth.userData()?.id);
        this.chats = await this.tourService.getAllChats();
      }
    });
  }

  async ngOnInit() {}
}
