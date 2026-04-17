import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-organizations-tab',
  templateUrl: './organizations.page.html',
  styleUrls: ['./organizations.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class OrganizationsTab implements OnInit {
  constructor() {}

  ngOnInit() {}
}
