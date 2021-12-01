import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    DataTablesModule
  ],
  exports:[
    DataTablesModule
    ]

})
export class UsersModule { }
