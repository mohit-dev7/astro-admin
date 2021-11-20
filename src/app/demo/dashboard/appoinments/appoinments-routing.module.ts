import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppoinmentsComponent } from './appoinments.component';


const routes: Routes = [
  {
    path: '',
    component: AppoinmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppoinmentsRoutingModule { }
