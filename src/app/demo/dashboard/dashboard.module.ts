import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersComponent } from './users/users.component';
import { AppoinmentsComponent } from './appoinments/appoinments.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CountryComponent } from './country/country.component';
import { BrowserModule } from '@angular/platform-browser';
import { FeedbackComponent } from './feedback/feedback.component';
import { EnquireComponent } from './enquire/enquire.component';
import { PromocodeComponent } from './promocode/promocode.component';

import { TimeslotComponent } from './timeslot/timeslot.component';
import { HolidayComponent } from './holiday/holiday.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { ContactdComponent } from './contactd/contactd.component';
import { BlogComponent } from './blog/blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  imports: [
    CommonModule,
    AngularEditorModule,

    HttpClientModule,
    DashboardRoutingModule,
    DataTablesModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
 

 
  declarations: [UsersComponent, AppoinmentsComponent, AllBlogsComponent,  PromocodeComponent, EnquireComponent, FeedbackComponent, CountryComponent, TimeslotComponent, HolidayComponent, ContactdComponent, BlogComponent, EditBlogComponent, CommentComponent],
 schemas:[NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
