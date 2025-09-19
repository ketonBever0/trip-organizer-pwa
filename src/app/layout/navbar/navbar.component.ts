import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { NgIf } from '@angular/common';
import { ClickStopPropagationDirective } from '@app/core/directives/click-stop-propagation.directive';

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
    ClickStopPropagationDirective,
  ],
})
export class NavbarComponent implements OnInit {
  constructor(protected readonly authService: AuthService) {}

  drawerOpen: boolean = false;
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  profileMenuOpen: boolean = false;
  toggleProfileMenu(state = false) {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  logout() {
    this.authService.signOut();
    this.toggleProfileMenu();
  }

  ngOnInit() {}
}
