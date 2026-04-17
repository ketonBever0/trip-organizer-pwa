import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsTab } from './organizations.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsTab,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsTabRoutingModule {}
