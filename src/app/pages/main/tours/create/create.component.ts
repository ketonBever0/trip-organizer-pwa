import {
  ChangeDetectionStrategy,
  Component,
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
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TourService } from '@app/core/services/tour/tour.service';

@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit, OnDestroy {
  orgId: string | null = null;
  private readonly destroy$ = new Subject<void>();
  createTourForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly ts: TourService,
    private readonly router: Router
  ) {
    this.createTourForm = formBuilder.group({
      destination: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      budget: [1000, Validators.required],
      limit: [60, Validators.required],
      transportation: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.orgId && this.createTourForm.valid) {
      await this.ts.createTour(
        this.orgId,
        this.createTourForm,
        this.activities()
      );
      this.router.navigate(['/organizations/unit/', this.orgId]);
    }
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
      this.orgId = params.get('id');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
