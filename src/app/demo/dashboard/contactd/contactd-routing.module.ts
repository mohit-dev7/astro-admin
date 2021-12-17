import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactdComponent } from './contactd.component';




const routes: Routes = [
  {
    path: '',
    component: ContactdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactdRoutingModule { }
