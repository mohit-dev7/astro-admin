import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {


  loginForm:FormGroup;
  error:boolean = false;

message:any = '';

  email = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);
  constructor(private authservice:AuthService, private router:Router) {     
    
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });}

  ngOnInit() {
  }


  loginSubmit(){

    var userEmail = this.loginForm.get('email').value;
    var userPassword = this.loginForm.get('password').value;

    if(userEmail=='' || !this.validateEmail(userEmail)){
      this.error = true; 
this.message = 'Please enter your valid email address';
return false;

    }

    else if(userPassword==''){
      this.error = true; 
      this.message = 'Please enter your password';
    return false;

    }
    else{
   

      const data ={
        "userEmail":userEmail,
        "password":userPassword
      }

   this.authservice.loginToDashboard(data).subscribe(response=>{

 if(response['message']=='login'){

  localStorage.setItem('userID',response['userID']);

  this.error = false; 
    this.message = 'Authenticated!';

    this.router.navigate(['/dashboard/default']);

 }
 else{
  this.error = true; 
  this.message = 'Invalid email and password!';
  return false;
 }

  

   });
   

    }

   



  }




  


  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

}
