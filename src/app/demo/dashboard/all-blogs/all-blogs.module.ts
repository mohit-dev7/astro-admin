import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AllBlogsRoutingModule } from './all-blogs-routing.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
AllBlogsRoutingModule,
    SharedModule,
    DataTablesModule
  ],
  exports:[
    DataTablesModule
    ]

})
export class AllBlogsModule { }
