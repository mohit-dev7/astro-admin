import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthSignupComponent } from './auth-signup.component';
import { AuthSignupRoutingModule } from './auth-signup-routing.module';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    AuthSignupRoutingModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
