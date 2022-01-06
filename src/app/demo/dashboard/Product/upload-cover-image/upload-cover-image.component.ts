import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-cover-image',
  templateUrl: './upload-cover-image.component.html',
  styleUrls: ['./upload-cover-image.component.scss']
})
export class UploadCoverImageComponent implements OnInit {

  public Categories;
  coverfile:File;
  file:File;
  constructor(private authService:AuthService) {
   }

  ngOnInit(): void {
    this.authService.getRequest("/GetCategories").subscribe((res)=>{
      if(!res.status){
          console.log("error! something went wrong");
      }
      this.Categories = res;
    })
  }

  changeFile(file){
    console.log(file);
    this.file = file[0];
  }

  changeCoverFile(file){
    console.log(file);
    this.coverfile = file[0];
  }

  uploadImage(id:any){
    let form = new FormData();
    form.append("file",this.file)

    console.log(form.get("file"));

    this.authService.uploadImageRequest(`/uploadImage/${id}`,form).subscribe((res:any)=>{
      if(!res.status){
        console.log("error")
      }
      console.log(res)
    })
  }

  uploadCoverImage(id:any){
    let form = new FormData();
    form.append("file",this.coverfile)

    console.log(form.get("file"));

    this.authService.uploadImageRequest(`/uploadCoverImage/${id}`,form).subscribe((res:any)=>{
      if(!res.status){
        console.log("error")
      }
      console.log(res)
    })
  }


}
