import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UploadCoverImageComponent } from './upload-cover-image/upload-cover-image.component';



@NgModule({
  declarations: [
    ProductComponent, 
    UploadImageComponent,
    ProductListComponent, 
    UploadCoverImageComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ProductModule { }
