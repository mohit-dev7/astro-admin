import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVarifyComponent } from './email-varify.component';






const routes: Routes = [
  {
    path: '',
    component: EmailVarifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailVerifyRoutingModule{ }
