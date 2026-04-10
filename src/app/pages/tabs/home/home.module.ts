import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeTab } from './home.page';

import { Tab1PageRoutingModule } from './home-routing.module';
import { TripsTab } from '../trips/trips.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    TripsTab,
  ],
})
export class HomeTabModule {}
