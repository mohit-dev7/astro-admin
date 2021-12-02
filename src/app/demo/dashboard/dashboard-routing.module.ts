import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
      ,
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule )
      },
      {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule )
      },
      {


        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'ratelist',
        loadChildren: () => import('./rate-list/rate-list.module').then(m => m.RateListModule)
      },
      {
        path: 'enquire',
        loadChildren: () => import('./enquire/enquire.module').then(m => m.EnquireModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,FormsModule,ReactiveFormsModule]
})
export class DashboardRoutingModule { }
