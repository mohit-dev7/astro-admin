import { UploadImageComponent } from './upload-image/upload-image.component';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { UploadCoverImageComponent } from './upload-cover-image/upload-cover-image.component';


const routes: Routes = [{path:"",component:ProductComponent},
{path:"image-upload",component:UploadImageComponent},
{path:"list",component:ProductListComponent},
{path:"categoryimage",component:UploadCoverImageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
