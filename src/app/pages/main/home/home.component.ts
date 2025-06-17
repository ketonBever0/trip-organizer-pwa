import { ChangeDetectionStrategy, Component, effect, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AllChatsType } from '@app/core/models/tour-chat';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TourService } from '@app/core/services/tour/tour.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [MatProgressBarModule],
})
export class HomeComponent implements OnInit {
  chats: AllChatsType[] = [];

  constructor(
    protected readonly fAuth: AuthService,
    protected readonly tourService: TourService
  ) {
    effect(async () => {
      if(fAuth.userData()?.id) {
        console.log(await this.tourService.getAllChats());
      }
    })
  }

  async ngOnInit() {
    
  }
}
