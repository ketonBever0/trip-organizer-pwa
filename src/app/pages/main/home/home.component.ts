import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { TourType } from '@app/core/models/tour';
import { AllChatsType } from '@app/core/models/tour-chat';
import { TruncStrPipe } from '@app/core/pipes/trunc-str.pipe';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TourService } from '@app/core/services/tour/tour.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatProgressBarModule,
    MatIconButton,
    MatIconModule,
    MatTabsModule,
    DatePipe,
    TruncStrPipe,
    NgClass,
    MatRippleModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private closeChat$ = new Subject<void>();
  chats$: Observable<AllChatsType[]> = new Observable();
  selectedChat = signal<string | null>(null);
  chat$ = new Observable<TourType>();
  currentTour: TourType | null = null;

  private readonly formBuilder: FormBuilder = new FormBuilder();
  chatForm: FormGroup;

  constructor(
    protected readonly fAuth: AuthService,
    protected readonly tourService: TourService
  ) {
    this.chatForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
    // effect(() => {
    //   if (fAuth.userData()?.id) {
    //   }
    // });
    effect(() => {
      if (this.selectedChat()) {
        this.chat$ = tourService
          .getTourChat(this.selectedChat()!)
          .pipe(takeUntil(this.closeChat$));
      }
    });
  }

  selectChat(id: string | null) {
    if (!id) {
      this.closeChat$.next();
      this.closeChat$.complete();
    }
    this.selectedChat.set(id);
  }

  sendChat() {}

  async ngOnInit() {
    this.chats$ = this.tourService.getAllChats().pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.closeChat$.next();
    this.closeChat$.complete();
  }
}
