import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import { RateListComponent } from './rate-list.component';
import { RateListRoutingModule } from './rate-list.routing.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    RateListRoutingModule,
  
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RateListComponent
  ],
  exports:[
    DataTablesModule
    ]

})
export class RateListModule { }
