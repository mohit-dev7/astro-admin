import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  message: any = '';
  loading: boolean = false;
  error:boolean=false
  changeForm:FormGroup;


  constructor(private master:MasterService) { }

  ngOnInit(): void {
    this.changeForm=new FormGroup({
      newPassword:new FormControl(""),
      confirmPassword:new FormControl("")
    })
  }
  onSubmit(){
  
    var newPassword=this.changeForm.get("newPassword").value;
    var confirmPassword=this.changeForm.get("confirmPassword").value;
    if (newPassword==confirmPassword){
      const data={
        "newPassword":newPassword
      }
      this.master.methodPost(data,"savePassword").subscribe(data=>{
        if(data['name']!='')
        {  
          this.error = false;
          this.message = ' you have changed your password please login again';
          return false;
    
        }else{
          this.error = true;
          this.message = 'Failed to change our password  check all details!';
          return false;
        }
      },(error=>{
        alert("something wrong please check you detail carefully ")
      }))
    }else{
      alert("you password didnt match Please try again")
    }
    
    

  }

}
