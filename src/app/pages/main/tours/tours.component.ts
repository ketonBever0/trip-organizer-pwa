import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TourType } from '@app/core/models/tour';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ClickStopPropagationDirective } from '@app/core/directives/click-stop-propagation.directive';
import { TourService } from '@app/core/services/tour/tour.service';
import { DatePipe } from '@angular/common';
import { AppliedForPipe } from '@app/core/pipes/applied-for.pipe';

@Component({
  imports: [
    ClickStopPropagationDirective,
    MatCardModule,
    MatButtonModule,
    MatBottomSheetModule,
    DatePipe,
    AppliedForPipe
  ],
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
})
export class ToursComponent implements OnInit {
  tours: TourType[] = [];

  constructor(
    private readonly idbService: NgxIndexedDBService,
    protected readonly fAuth: AuthService,
    protected readonly ts: TourService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    // this.fetchTours();
    this.tours = await this.ts.getTours();
  }

  fetchTours() {
    this.idbService.getAll('tours').subscribe((tours) => {
      // console.log('tours: ', tours);
      this.tours = tours as TourType[];
    });
  }

  async applyTour(tour: TourType) {
    if (this.fAuth.userData()!.id) {
      await this.ts.applyTour(tour);
      this.router.navigate(['/tours/one', tour.id]);
    }
  }

  deleteTour(id: string) {
    this.idbService.delete('tours', id).subscribe(() => {
      this.tours = this.tours.filter((tour) => tour.id !== id);
    });
    this.fetchTours();
  }

  deleteAll() {
    this.idbService.clear('tours').subscribe(() => {
      this.tours = [];
    });
    this.fetchTours();
  }

  tourModalOpened = false;

  openModal() {
    this.tourModalOpened = true;
  }

  closeModal() {
    this.tourModalOpened = false;
  }
}
