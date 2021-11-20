import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import { PendingAppoinmentsRoutingModule } from './pending-appoinments-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  imports: [
    CommonModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
PendingAppoinmentsRoutingModule,
    SharedModule
  ]

})
export class PendingAppoinmentsModule { }
