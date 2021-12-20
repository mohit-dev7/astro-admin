import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ResetPasswordComponent } from './reset-password.component';



@NgModule({
  declarations: [ResetPasswordComponent],

  imports: [
    
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class ResetPasswordModule { }
