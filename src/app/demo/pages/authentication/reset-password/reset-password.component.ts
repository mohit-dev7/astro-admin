import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { format } from 'path';

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


  constructor() { }

  ngOnInit(): void {
    this.changeForm=new FormGroup({
      newPassword:new FormControl(""),
      confirmPassword:new FormControl("")
    })
  }
  onSubmit(){
    var newPassword=this.changeForm.get("newPassword").value;
    var confirmPassword=this.changeForm.get("confirmPassword").value;
    

  }

}
