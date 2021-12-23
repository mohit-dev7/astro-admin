import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentRoutingModule } from './comment-routing.module';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommentRoutingModule
  ],
  exports: [
    DataTablesModule
  ]
})
export class CommentModule { }
