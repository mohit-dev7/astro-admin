import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FeedbackRoutingModule } from './feedback-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports:[
    DataTablesModule
    ]
})
export class FeedbackModule { }
