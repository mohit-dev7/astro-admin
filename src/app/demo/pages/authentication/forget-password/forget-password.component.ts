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
    const data={
      "email":email
    }
    this.master.methodPost1("/user/resetPassword?email="+email).subscribe(data=>{
    if(data['name']!='')
    {  
    
 
      this.error = false;
      this.message = ' email send to your mail-id please check ';
      setTimeout(()=>{location.reload()},2000);
      location.reload();
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
