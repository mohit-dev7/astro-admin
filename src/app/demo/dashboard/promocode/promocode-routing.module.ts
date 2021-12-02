import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromocodeComponent } from './promocode.component';



const routes: Routes = [
  {
    path: '',
    component: PromocodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocodeRoutingModule { }
