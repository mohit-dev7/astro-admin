import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [ProductComponent, UploadImageComponent, ProductListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ProductModule { }
