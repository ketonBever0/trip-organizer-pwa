import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeTab } from './me.page';

const routes: Routes = [
  {
    path: '',
    component: MeTab,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
