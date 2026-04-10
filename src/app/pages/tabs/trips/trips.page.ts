import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-trips-tab',
  templateUrl: 'trips.page.html',
  styleUrls: ['trips.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TripsTab {
  constructor() {}
}
