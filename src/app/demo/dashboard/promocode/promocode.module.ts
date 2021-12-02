import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromocodeRoutingModule } from './promocode-routing.module';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PromocodeRoutingModule,DataTablesModule
  ]
})
export class PromocodeModule { }
