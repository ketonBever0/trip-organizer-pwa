import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([
    { path: '', component: UsersComponent },
  ])],
})
export class UsersModule {}
