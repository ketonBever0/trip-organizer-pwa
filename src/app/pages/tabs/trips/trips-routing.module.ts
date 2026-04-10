import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsTab } from './trips.page';

const routes: Routes = [
  {
    path: '',
    component: TripsTab,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsTabRoutingModule {}
