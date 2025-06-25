import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/main/not-found/not-found.component';
import { HomeComponent } from './pages/main/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ToursComponent } from './pages/main/tours/tours.component';
import { AddTourComponent } from './pages/admin/add-tour/add-tour.component';
import { authGuard } from './core/services/auth/auth.guard';
import { CreateUnitComponent } from './pages/organization/create-unit/create-unit.component';
import { MeComponent } from './pages/auth/me/me.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'main', pathMatch: 'full', redirectTo: '' },

  {
    path: 'tours',
    loadChildren: () =>
      import('./pages/main/tours/tours.module').then((m) => m.ToursModule),
  },
  { path: 'add-tour', component: AddTourComponent, canActivate: [authGuard] },

  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'profile', component: MeComponent, canActivate: [authGuard] },

  {
    path: 'organizations',
    loadChildren: () =>
      import('./pages/organization/organizations.module').then(
        (m) => m.OrganizationsModule
      ),
  },

  {
    path: 'admin/users',
    loadChildren: () =>
      import('./pages/admin/users/users.module').then((m) => m.UsersModule),
  },

  { path: '**', component: NotFoundComponent },
];
