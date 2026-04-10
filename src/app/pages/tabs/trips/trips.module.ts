import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripsTab } from './trips.page';

import { TripsTabRoutingModule } from './trips-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TripsTabRoutingModule,
    TripsTab,
  ],
})
export class TripsTabModule {}
