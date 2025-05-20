import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrganizationService } from '@app/core/services/organization/organization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-unit',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './create-unit.component.html',
  styleUrl: './create-unit.component.scss',
})
export class CreateUnitComponent {
  protected readonly createOrgForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly orgService: OrganizationService,
    private readonly router: Router
  ) {
    this.createOrgForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      isPrivate: [false],
    });
  }

  types = ['Travel Business', 'Business class', 'Other'];

  snackBar = inject(MatSnackBar);

  async onSubmit() {
    const error = await this.orgService.addOrganization(this.createOrgForm);
    if (error) {
      this.snackBar.open(error, '', { duration: 3000 });
    } else {
      this.router.navigateByUrl('/organizations');
    }
  }
}
