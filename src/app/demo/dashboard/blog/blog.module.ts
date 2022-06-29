import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTextEditorModule } from 'ngx-text-editor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlogRoutingModule,
    AngularEditorModule,
    FormsModule,
    NgxTextEditorModule
 
  ]
})
export class BlogModule { }
