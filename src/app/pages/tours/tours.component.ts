import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TourType } from '../../core/models/tour';

@Component({
  imports: [MatCardModule, MatButtonModule, RouterLink],
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
})
export class ToursComponent implements OnInit {
  constructor(
    protected readonly authService: AuthService,
    private readonly idbService: NgxIndexedDBService
  ) {}

  tours: TourType[] = [];

  ngOnInit() {

    this.fetchTours();

  }

  fetchTours() {
    this.idbService
      .getAll('tours')
      .subscribe((tours) => {
        // console.log('tours: ', tours);
        this.tours = tours as TourType[];
      });
  }

  deleteTour(id: string) {
    this.idbService.delete('tours', id).subscribe(() => {
      this.tours = this.tours.filter((tour) => tour.id !== id);
    });
    this.fetchTours();
  }

  fillWithTemplateData() {
    this.idbService.bulkAdd('tours', [
      {
        destination: 'Párizs, Franciaország',
        startDate: '2025-06-15',
        endDate: '2025-06-20',
        budget: 1200,
        activities: [
          'Eiffel-torony látogatás',
          'Múzeumok',
          'Hajókázás a Szajnán',
        ],
        transportation: 'Repülő',
        numberOfMembers: 51,
        limit: 60,
      },
      {
        destination: 'Tokió, Japán',
        startDate: '2025-09-10',
        endDate: '2025-09-20',
        budget: 3000,
        activities: [
          'Halpiac felfedezése',
          'Sintoista szentélyek',
          'Robot étterem',
        ],
        transportation: 'Repülő',
        numberOfMembers: 51,
        limit: 60,
      },
      {
        destination: 'Barcelona, Spanyolország',
        startDate: '2025-05-05',
        endDate: '2025-05-12',
        budget: 1500,
        activities: ['Sagrada Família', 'Tengerparti pihenés', 'Tapas túra'],
        transportation: 'Vonat',
        numberOfMembers: 40,
        limit: 40,
      },
      {
        destination: 'Bali, Indonézia',
        startDate: '2025-12-01',
        endDate: '2025-12-10',
        budget: 2000,
        activities: [
          'Szörfözés',
          'Trekking a vulkánnál',
          'Templomok látogatása',
        ],
        transportation: 'Repülő',
        numberOfMembers: 51,
        limit: 60,
      },
    ]);
    this.fetchTours();
  }

  deleteAll() {
    this.idbService.clear('tours').subscribe(() => {
      this.tours = [];
    });
    this.fetchTours();
  }

}
