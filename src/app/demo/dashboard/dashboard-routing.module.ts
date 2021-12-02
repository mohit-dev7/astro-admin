import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HolidayComponent } from './holiday/holiday.component';
import { TimeslotComponent } from './timeslot/timeslot.component';


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
      }
      ,
      {
        path: 'timeslot',
        component: TimeslotComponent
      },
      {
        path: 'holiday',
        component: HolidayComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,FormsModule,ReactiveFormsModule]
})
export class DashboardRoutingModule { }
