import { Route, RouterModule } from '@angular/router';
import { ToursComponent } from './tours.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPageComponent } from './tour-page/tour-page.component';
import { MeComponent } from './me/me.component';
import { authGuard } from '@app/core/services/auth/auth.guard';

const routes: Route[] = [
  { path: '', component: ToursComponent },
  { path: 'one/:id', component: TourPageComponent },
  { path: 'me', component: MeComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [CommonModule, ToursComponent, RouterModule.forChild(routes)],
})
export class ToursModule {}
