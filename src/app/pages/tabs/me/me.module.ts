import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeTab } from './me.page';

import { MeTabRoutingModule } from './me-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, MeTabRoutingModule, MeTab],
})
export class MeTabModule {}
