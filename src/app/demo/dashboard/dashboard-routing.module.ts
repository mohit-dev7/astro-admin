import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        loadChildren: () => import('./default/default.module').then(m => m.DefaultModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule)
      },
      {
        path: 'appointments',
        loadChildren: () => import('./appoinments/appoinments.module').then(m => m.AppoinmentsModule)
      },
      {
        path: 'pending-appointments',
        loadChildren: () => import('./pending-appoinments/pending-appoinments.module').then(m => m.PendingAppoinmentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
