import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { CreateOrganizationComponent } from './pages/create-organization/create-organization.component';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-org',
    component: CreateOrganizationComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
