import { COMMA, ENTER } from '@angular/cdk/keycodes';
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
import { MatButtonModule } from '@angular/material/button';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { TourType } from '@app/core/models/tour';
import { TourService } from '@app/core/services/tour/tour.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit, OnDestroy {
  tourId: string | null = null;
  private readonly destroy$ = new Subject<void>();
  updateTourForm: FormGroup | undefined;

  private readonly tour = signal<TourType | null>(null);

  constructor(
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly ts: TourService,
    private readonly router: Router
  ) {
    effect(async () => {
      if (this.tourId && this.tour()) {
        this.setEditForm();
      }
    });
  }

  setEditForm() {
    this.updateTourForm = this.formBuilder.group({
      destination: [this.tour()?.destination, Validators.required],
      startDate: [this.tour()?.startDate.toDate(), Validators.required],
      endDate: [this.tour()?.endDate.toDate(), Validators.required],
      budget: [this.tour()?.budget, Validators.required],
      limit: [this.tour()?.limit, Validators.required],
      transportation: [this.tour()?.transportation, Validators.required],
    });
    this.activities.set(this.tour()!.activities);
  }

  async onSubmit() {
    await this.ts.updateTour(
      this.tour()!.id,
      this.updateTourForm!,
      this.activities()
    );
  }

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly activities = signal<string[]>([]);

  addActivity(e: MatChipInputEvent) {
    const value = (e.value || '').trim();

    if (value) {
      this.activities.update((prev) => [...prev, value]);
    }

    e.chipInput!.clear();
  }

  removeActivity(value: string) {
    this.activities.update((prev) => {
      const index = prev.indexOf(value);
      if (index < 0) {
        return prev;
      }

      prev.splice(index, 1);
      return [...prev];
    });
  }

  editActivity(value: string, e: MatChipEditedEvent) {
    const newValue = e.value.trim();

    if (!newValue) {
      this.removeActivity(value);
    }

    this.activities.update((prev) => {
      const index = prev.indexOf(value);
      if (index >= 0) {
        prev[index] = newValue;
      }
      return prev;
    });
  }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.tourId = params.get('id');
      if (this.tourId) {
        this.ts
          .getOneTour(this.tourId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((tour) => {
            this.tour.set(tour);
          });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
