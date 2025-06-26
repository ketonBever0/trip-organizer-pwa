import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((c) => c.HomeComponent),
  },
];
@NgModule({
  imports: [CommonModule, HomeComponent, RouterModule.forChild(routes)],
})
export class HomeModule {}
