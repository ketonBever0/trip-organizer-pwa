import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeTabModule),
      },
      {
        path: 'trip',
        loadChildren: () =>
          import('./trips/trips.module').then((m) => m.TripsTabModule),
      },
      {
        path: 'me',
        loadChildren: () => import('./me/me.module').then((m) => m.MeTabModule),
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
