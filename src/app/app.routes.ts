import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/main/not-found/not-found.component';
import { HomeComponent } from './pages/main/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ToursComponent } from './pages/main/tours/tours.component';
import { AddTourComponent } from './pages/admin/add-tour/add-tour.component';
import { authGuard } from './core/services/auth/auth.guard';
import { CreateUnitComponent } from './pages/organization/create-unit/create-unit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  { path: 'main', pathMatch: 'full', redirectTo: '' },

  { path: 'tours', component: ToursComponent },
  { path: 'add-tour', component: AddTourComponent, canActivate: [authGuard] },

  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: LoginComponent },

  {
    path: 'organization',
    children: [
      {
        path: 'create',
        component: CreateUnitComponent,
      },
    ],
  },

  {
    path: 'admin/users',
    loadChildren: () =>
      import('./pages/admin/users/users.module').then((m) => m.UsersModule),
  },

  { path: '**', component: NotFoundComponent },
];
