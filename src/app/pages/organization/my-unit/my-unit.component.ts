import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { OrgUnitType } from '@app/core/models/organization';
import { OrganizationService } from '@app/core/services/organization/organization.service';
import { TourType } from '@app/core/models/tour';
import { TourService } from '@app/core/services/tour/tour.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-org-unit',
  templateUrl: './my-unit.component.html',
  styleUrls: ['./my-unit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MyUnitComponent implements OnInit, OnDestroy {
  form: FormGroup;
  orgUnit: OrgUnitType | null = null;
  tours: TourType[] = [];

  id: string | null = null;

  private paramMapSub?: Subscription;
  private valueChangesSub?: Subscription;

  constructor(
    protected readonly fAuth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    protected readonly os: OrganizationService,
    protected readonly ts: TourService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      isPrivate: [false],
    });
  }

  async ngOnInit() {
    this.paramMapSub = this.route.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      if (this.id) {
        this.orgUnit = await this.os.getOneOrganization(this.id);
        this.form.setValue({ isPrivate: this.orgUnit.isPrivate });
        this.tours = await this.ts.getToursFromOrg(this.id);
      }
    });

    const isPrivateControl = this.form.get('isPrivate');
    if (isPrivateControl) {
      this.valueChangesSub = isPrivateControl.valueChanges.subscribe(
        async (value) => {
          if (this.orgUnit && this.id) {
            await this.os.updateVisibility(this.id, value);
            this.orgUnit = await this.os.getOneOrganization(this.id);
          }
        }
      );
    }
  }

  async deleteOrgUnit() {
    await this.os.deleteOrgUnit(this.orgUnit!.id);
    this.router.navigateByUrl('/organizations');
  }

  ngOnDestroy() {
    this.paramMapSub?.unsubscribe();
    this.valueChangesSub?.unsubscribe();
  }
}
