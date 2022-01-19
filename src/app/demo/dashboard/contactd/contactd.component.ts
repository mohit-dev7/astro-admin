import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactd',
  templateUrl: './contactd.component.html',
  styleUrls: ['./contactd.component.scss']
})
export class ContactdComponent implements OnInit {
  token=localStorage.getItem("userID")

  contactForm: FormGroup;
  constructor(private master:MasterService,private toaster:ToastrService) { 
    this.TokenExpired(this.token);
  }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      id: new FormControl(""),
      displayName: new FormControl(""),
      displayAddress: new FormControl(""),
      displayPhone: new FormControl(""),
      displayMobile: new FormControl(""),
      displayWatsapp: new FormControl(""),
      displaySkype: new FormControl(""),
      displayFaceBook: new FormControl(""),
      displayTwitter: new FormControl(""),
    });

    this.master.contactGet().subscribe(response => {
      this.contactForm.patchValue(response);
      
      },err=>{
        
      });

  }

  addContact() {
    
     
      this.master.contactPost(this.contactForm.value).subscribe(response => {
      this.contactForm.patchValue(response);
      this.toaster.success("contact saved");
      });
    }

    onClick(){
      this.contactForm = new FormGroup({
        id: new FormControl(""),
        displayName: new FormControl(""),
        displayAddress: new FormControl(""),
        displayPhone: new FormControl(""),
        displayMobile: new FormControl(""),
        displayWatsapp: new FormControl(""),
        displaySkype: new FormControl(""),
        displayFaceBook: new FormControl(""),
        displayTwitter: new FormControl(""),
      });
    }


  TokenExpired(token){
    this.master.getMethod("/AllCountries").subscribe(data=>{
      if (data!="" && token!=""){
        return false
      }else{
        localStorage.removeItem('userID');
        location.reload();
      }
    },(error=>{
     this.toaster.success('Session is expired please login again!');
      localStorage.removeItem('userID');
      location.reload();

    }))

  }

}
