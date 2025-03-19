import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  readonly dummyTours = [
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
      limit: 60
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
      limit: 60
    },
    {
      destination: 'Barcelona, Spanyolország',
      startDate: '2025-05-05',
      endDate: '2025-05-12',
      budget: 1500,
      activities: ['Sagrada Família', 'Tengerparti pihenés', 'Tapas túra'],
      transportation: 'Vonat',
      numberOfMembers: 40,
      limit: 40
    },
    {
      destination: 'Bali, Indonézia',
      startDate: '2025-12-01',
      endDate: '2025-12-10',
      budget: 2000,
      activities: ['Szörfözés', 'Trekking a vulkánnál', 'Templomok látogatása'],
      transportation: 'Repülő',
      numberOfMembers: 51,
      limit: 60
    },
  ];

}
