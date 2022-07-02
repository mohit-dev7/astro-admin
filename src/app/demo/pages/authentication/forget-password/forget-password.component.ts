import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { constants } from 'buffer';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  error: boolean = false;

  message: any = '';
  loading: boolean = false;
  resetForm:FormGroup

  constructor(private master:MasterService ) { }

  ngOnInit(): void {
    this.resetForm=new FormGroup({
      email:new FormControl("")
    })
  }
  onClick(){
    var email=this.resetForm.get("email").value;
  
    this.master.getMethod("/user/ForgotPassword?email="+email).subscribe(data=>{
    if(data['name']!='')
    {  
    
 
      this.error = false;
      this.message = 'Email send to your Email Id, Please check';
      return false;

    }else{
      this.error = true;
      this.message = 'Failed to send mail check all details!';
      return false;
    }
  },(error=>{
    alert("failed to send email something  wrong");
  }))
    
  }

}
