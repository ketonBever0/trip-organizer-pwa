import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { collection, query } from '@angular/fire/firestore';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { TourType } from '@app/core/models/tour';
import { AuthService } from '@app/core/services/auth/auth.service';
import { StoreService } from '@app/core/services/store/store.service';
import { TourService } from '@app/core/services/tour/tour.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  catchError,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-tour-page',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    AsyncPipe,
    MatTooltipModule,
  ],
  templateUrl: './tour-page.component.html',
  styleUrl: './tour-page.component.scss',
})
export class TourPageComponent implements OnInit, OnDestroy {
  chatForm: FormGroup;

  id: string | null = null;

  private readonly destroy$ = new Subject<void>();
  // private paramMapSub?: Subscription;

  tour$: Observable<TourType | null> | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    protected readonly fAuth: AuthService,
    protected readonly ts: TourService,
    private readonly fStore: StoreService
  ) {
    this.chatForm = formBuilder.group({
      text: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this.route.paramMap.pipe(switchMap((params) => {
    //   this.id = params.get('id') || '';
    //   if(this.id) {
    //     return this.ts.getOneTour(this.id).pipe(
    //       switchMap((tour) => {
    //         this.tour = tour;
    //         const chatQuery = query(
    //           collection(this.fStore.db, )
    //         )
    //       })
    //     );
    //   }
    // }));

    this.tour$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.id = params.get('id') || '';
        if (this.id) {
          return this.ts.getOneTour(this.id).pipe(
            catchError((error) => {
              console.error(error);
              return of(null);
            })
          );
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    );
  }

  async sendMessage() {
    if (this.chatForm.valid && this.id && this.tour$ != null) {
      try {
        await this.tour$
          .pipe(take(1))
          .toPromise()
          .then(async (tour) => {
            if (tour) {
              await this.ts.sendMessage(tour, this.chatForm.get('text')!.value);
              this.chatForm.reset();
            } else {
              console.error('Tour not found!');
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
