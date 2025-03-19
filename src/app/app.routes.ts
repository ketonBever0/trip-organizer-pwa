import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ToursComponent } from './pages/tours/tours.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  { path: 'main', pathMatch: 'full', redirectTo: '' },

  { path: 'tours', component: ToursComponent },

  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: LoginComponent },

  { path: '**', component: NotFoundComponent },
];
