import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
    MatExpansionModule,
    MatTreeModule,
    NgIf,
  ],
})
export class NavbarComponent implements OnInit {
  constructor(protected readonly authService: AuthService) {}

  drawerOpen: boolean = false;
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  profileMenuOpen: boolean = false;
  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  logout() {
    this.profileMenuOpen = false;
    this.authService.signOut();
  }


  ngOnInit() {}
}
