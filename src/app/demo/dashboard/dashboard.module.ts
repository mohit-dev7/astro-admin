import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PendingAppoinmentsComponent } from './pending-appoinments/pending-appoinments.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ProductComponent } from './Product/product/product.component';

@NgModule({
  imports: [
    CommonModule,
    AngularEditorModule,
    HttpClientModule,
    DashboardRoutingModule,
    DataTablesModule.forRoot(),
  ],
  declarations: [ PendingAppoinmentsComponent],
 
})
export class DashboardModule { }
