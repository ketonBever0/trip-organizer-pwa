import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsTabRoutingModule } from './organizations-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule, CommonModule, OrganizationsTabRoutingModule],
})
export class OrganizationsTabModule {}
