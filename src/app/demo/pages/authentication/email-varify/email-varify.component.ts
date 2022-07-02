import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-email-varify',
  templateUrl: './email-varify.component.html',
  styleUrls: ['./email-varify.component.scss']
})
export class EmailVarifyComponent implements OnInit {
  message: any = '';
  loading: boolean = false;
  error:boolean=false
  emailVarify: FormGroup;
  key:any
  newValue:boolean=false;
  paramsObject:any
  constructor(private master:MasterService,private route: ActivatedRoute,private routes:Router) { 
    this.emailVarify=new FormGroup({
      newPassword1:new FormControl(""),
      confirPassword1:new FormControl("")
    })


    this.route.queryParamMap
    .subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
    console.log(this.paramsObject);
    }
  );
  }

  ngOnInit(): void {
  }
  
  ChangePassword(){
    var newPassword=this.emailVarify.get("newPassword1").value;
    var confirmPassword=this.emailVarify.get("confirPassword1").value;
    console.log(newPassword,confirmPassword)
    if (newPassword===confirmPassword){
      const data={
        "newPassword":newPassword,
        "token":this.paramsObject.params.key
      }
      this.master.saveEmailPassword(data,"/user/changePassword").subscribe(data=>{
        if(data['name']!='')
        {  
        
     
          this.error = false;
       
          this.message = ' you have changed your password , Please login again'
          setTimeout(()=>{this.routes.navigate(['/auth/signin'])} , 2000);
         ;
          return false;
    
        }else{
          this.error = true;
          this.message = 'Failed to change our password, Check all details!';
          return false;
        }
      },(error=>{
        alert("something wrong please check you details carefully ")
      }))
    }else{
      alert("you password didnt match, Please try again")
    }
  }
}
