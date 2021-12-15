import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthSignupComponent } from './auth-signup.component';
import { AuthSignupRoutingModule } from './auth-signup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    AuthSignupRoutingModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
