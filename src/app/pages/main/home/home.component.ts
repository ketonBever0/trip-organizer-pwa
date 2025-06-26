import { DatePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { TourType } from '@app/core/models/tour';
import { AllChatsType } from '@app/core/models/tour-chat';
import { TruncStrPipe } from '@app/core/pipes/trunc-str.pipe';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TourService } from '@app/core/services/tour/tour.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    MatProgressBarModule,
    MatIconButton,
    MatIconModule,
    MatTabsModule,
    DatePipe,
    TruncStrPipe,
    NgClass,
    MatRippleModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private closeChat$ = new Subject<void>();
  chats: AllChatsType[] = [];
  selectedChat = signal<string | null>(null);
  currentTour: TourType | null = null;

  constructor(
    protected readonly fAuth: AuthService,
    protected readonly tourService: TourService
  ) {
    effect(() => {
      if (fAuth.userData()?.id) {
        this.tourService
          .getAllChats()
          .pipe(takeUntil(this.destroy$))
          .subscribe((value) => {
            this.chats = value;
          });
      }
    });
    effect(() => {
      if (this.selectedChat()) {
        tourService
          .getTourChat(this.selectedChat()!)
          .pipe(takeUntil(this.closeChat$))
          .subscribe((value) => {
            this.currentTour = value;
          });
      }
    });
  }

  selectChat(id: string | null) {
    this.selectedChat.set(id);
  }

  async ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
