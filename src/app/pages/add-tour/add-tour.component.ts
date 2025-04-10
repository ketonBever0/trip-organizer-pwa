import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButton,
    MatLabel,
    MatInputModule,
  ],
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss'],
})
export class AddTourComponent implements OnInit {
  public readonly addTourForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly idbService: NgxIndexedDBService
  ) {
    this.addTourForm = this.formBuilder.group({
      destination: [''],
      startDate: [''],
      endDate: [''],
      price: [1000],
      transportation: [''],
      limit: [60],
      description: [''],
    });
  }

  async onSubmit() {
    this.idbService
      .add('tours', {
        destination: this.addTourForm.value.destination,
        startDate: this.addTourForm.value.startDate,
        endDate: this.addTourForm.value.endDate,
        price: this.addTourForm.value.price,
        transportation: this.addTourForm.value.transportation,
        limit: this.addTourForm.value.limit,
        description: this.addTourForm.value.description,
      })
      .subscribe((key) => {
        console.log('key: ', key);
      });
  }

  onReset() {
    this.addTourForm.reset();
  }

  ngOnInit() {}
}
