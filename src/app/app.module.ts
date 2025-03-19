import { AuthService } from './core/auth/auth.service';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { enviroment } from '../enviroment/enviroment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  imports: [],
  providers: [AuthService],
})
export class AppModule {}
