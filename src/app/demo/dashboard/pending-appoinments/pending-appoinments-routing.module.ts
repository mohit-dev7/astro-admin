import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingAppoinmentsComponent } from './pending-appoinments.component';



const routes: Routes = [
  {
    path: '',
    component: PendingAppoinmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingAppoinmentsRoutingModule { }
