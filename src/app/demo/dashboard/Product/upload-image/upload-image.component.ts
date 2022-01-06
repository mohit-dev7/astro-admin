import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  public products;

  file:File;
  constructor(private authService:AuthService) {
   }

  ngOnInit(): void {
    this.authService.getRequest("/product/list").subscribe((res)=>{
      if(!res.status){
          console.log("error! something went wrong");
      }
      this.products = res.data;
    })
  }

  changeFile(file){
    console.log(file);
    this.file = file[0];
  }

  uploadImage(id){
    let form = new FormData();
    form.append("file",this.file)

    console.log(form.get("file"));

    this.authService.postRequest(`/product/uploadimage/${id}`,form).subscribe((res)=>{
      if(!res.status){
        console.log("error")
      }
      console.log(res)
    })
  }

}
