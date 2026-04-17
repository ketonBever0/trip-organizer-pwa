import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsTab } from './organizations.page';
import { OrganizationsTabRoutingModule } from './organizations-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    OrganizationsTab,
    OrganizationsTabRoutingModule,
  ],
})
export class OrganizationsTabModule {}
