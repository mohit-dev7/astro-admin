import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersComponent } from './users/users.component';
import { AppoinmentsComponent } from './appoinments/appoinments.component';
import { PendingAppoinmentsComponent } from './pending-appoinments/pending-appoinments.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CountryComponent } from './country/country.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    AngularEditorModule,
    HttpClientModule,
    DashboardRoutingModule,
    DataTablesModule.forRoot()
  ],
  declarations: [UsersComponent, AppoinmentsComponent, PendingAppoinmentsComponent, CountryComponent],
 
})
export class DashboardModule { }
