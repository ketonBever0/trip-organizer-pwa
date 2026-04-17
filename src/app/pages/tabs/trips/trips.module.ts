import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsTabRoutingModule } from './trips-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, TripsTabRoutingModule],
})
export class TripsTabModule {}
