import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import { EnquireComponent } from './enquire.component';
import { EnquireRoutingModule } from './enquire.routing.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    EnquireRoutingModule,
  
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    // EnquireComponent
  ],
  exports:[
    DataTablesModule
    ]

})
export class EnquireModule { }
