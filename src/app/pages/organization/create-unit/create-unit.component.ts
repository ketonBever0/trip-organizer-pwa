import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StoreService } from '@app/core/services/store/store.service';

@Component({
  selector: 'app-create-unit',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './create-unit.component.html',
  styleUrl: './create-unit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUnitComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly fStore: StoreService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  protected readonly form: FormGroup;


  onSubmit() {
    
  }
}
