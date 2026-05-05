import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsTab } from './organizations.page';
import { OrgPageComponent } from './org-page/org-page.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsTab,
  },
  // {
  //   path: 'info/:id',
  //   loadChildren: () =>
  //     import('./org-page/org-page.component').then((m) => m.OrgPageComponent),
  // },
  { path: 'info/:id', component: OrgPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsTabRoutingModule {}
