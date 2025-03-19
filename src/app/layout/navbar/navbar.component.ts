import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MatButtonModule,
    MatIcon,
    RouterLink,
  ],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  drawerOpen: boolean = false;
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  ngOnInit() {}
}
