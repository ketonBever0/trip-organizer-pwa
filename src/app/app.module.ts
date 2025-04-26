import { AuthService } from './core/services/auth/auth.service';
import { NgModule } from '@angular/core';
import { StoreService } from './core/services/store/store.service';

@NgModule({
  providers: [AuthService, StoreService],
})
export class AppModule {}
