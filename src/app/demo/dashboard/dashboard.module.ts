import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { TimeslotComponent } from './timeslot/timeslot.component';
import { HolidayComponent } from './holiday/holiday.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
@NgModule({
  imports: [
    CommonModule,
    AngularEditorModule,
    HttpClientModule,
    DashboardRoutingModule,
    DataTablesModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [UsersComponent, AppoinmentsComponent, PendingAppoinmentsComponent, CountryComponent, TimeslotComponent, HolidayComponent],
 schemas:[NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
