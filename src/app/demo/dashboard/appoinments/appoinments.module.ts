import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import { AppoinmentsComponent } from './appoinments.component';
import { AppoinmentsRoutingModule } from './appoinments-routing.module';

import { DataTablesModule } from 'angular-datatables';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  providers: [DatePipe],
  imports: [
    CommonModule,
    AppoinmentsRoutingModule,
    SharedModule,
    DataTablesModule,
    AngularEditorModule
  ],
  exports:[
    DataTablesModule
    ]

})
export class AppoinmentsModule { }
