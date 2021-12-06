import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactdRoutingModule } from './contactd-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContactdRoutingModule,
    
    DataTablesModule,
    FormsModule,ReactiveFormsModule
  ],
  exports:[
    DataTablesModule
    ]
})
export class ContactdModule { }
