import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import { Route, RouterModule } from '@angular/router';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { MyUnitComponent } from './my-unit/my-unit.component';

const routes: Route[] = [
  { path: '', component: OrganizationsComponent },
  { path: 'create', component: CreateUnitComponent },
  { path: 'unit/:id', component: MyUnitComponent },
];

@NgModule({
  imports: [
    CommonModule,
    OrganizationsComponent,
    RouterModule.forChild(routes),
  ],
})
export class OrganizationsModule {}
