import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTab } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTab,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
