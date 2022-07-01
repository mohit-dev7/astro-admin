import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailVerifyRoutingModule } from './email-verify-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailVarifyComponent } from './email-varify.component';




@NgModule({
  declarations: [EmailVarifyComponent],

  imports: [
    
    CommonModule,
    EmailVerifyRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class EmailVerifyModule { }
