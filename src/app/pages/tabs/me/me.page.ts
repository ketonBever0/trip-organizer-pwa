import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-me-tab',
  templateUrl: 'me.page.html',
  styleUrls: ['me.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class MeTab {
  constructor() {}
}
