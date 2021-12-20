import { Component, OnInit } from '@angular/core';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
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
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});
signupForm: FormGroup;
  error: boolean = false;

  message: any = '';
  loading: boolean = false;

  email = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);
  confirmPass = new FormControl("", [Validators.required]);
  mobile = new FormControl("", [Validators.required]);
  firstname = new FormControl("", [Validators.required]);
  lastname = new FormControl("", [Validators.required]);
  constructor(private authservice: AuthService, private router: Router) {

    this.signupForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPass: new FormControl(''),
      mobile: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
    });
  }


  ngOnInit() {
    console.log(this.SearchCountryField,this.preferredCountries,this.CountryISO)
  }

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  createAccount(){
debugger;
    var userEmail = this.signupForm.get('email').value;
    var tel = this.phoneForm.get('phone').value;
  var mobile = tel['number'];
  var telcode =tel['dialCode'];
<<<<<<< HEAD
=======

>>>>>>> 720e57538f4b33ba34a2b94fe1673bb5b4a1c1a5
    var password = this.signupForm.get('password').value;
    var fname = this.signupForm.get('firstname').value;
    var lname = this.signupForm.get('lastname').value;
    var cpass = this.signupForm.get('confirmPass').value;
    console.log(mobile.nationalNumber,password,fname,lname,cpass)


    if(fname=='' ){
      this.error = true;
      this.message = 'Please enter your first name.';
      return false;
    }

    else if(lname=='' ){
      this.error = true;
      this.message = 'Please enter your last name.';
      return false;
    }

    else if(userEmail=='' || !this.validateEmail(userEmail)){
      this.error = true;
      this.message = 'Please enter your valid email address';
      return false;
    }
    else if(mobile='' || !this.validateMobile(mobile) || mobile.length < 10 || mobile.length > 10){
      this.error = true;
      this.message = 'Please enter your valid mobile number';
      return false;
    }


    else if(password=='' ){
      this.error = true;
      this.message = 'Please enter your password.';
      return false;
    }

    else if(cpass=='' ){
      this.error = true;
      this.message = 'Please confirm your password.';
      return false;
    }

    else if(password.length < 6 ){
      this.error = true;
      this.message = 'Minimum password length is 6 characters.';
      return false;
    }

    else if(cpass!=password ){
      this.error = true;
      this.message = 'Confirm password didn\'t matched please confirm again. ';
      return false;
    }

    else{

      const data = {
        "firstName":fname,
        "lastName":lname,
        "password":password,
        "matchingPassword":cpass,
        "email":userEmail,
        "phoneNo":mobile,
        "using2FA":false,
        "countryCode":telcode
      }
      this.loading = false;

      this.authservice.authPostMethod(data, '/user/registration').subscribe(response=>{

        if(response['message']=='success'){
          this.loading = false;
          this.error = false;
          this.message = 'Your account is created now! ';
          setTimeout(()=>{
            this.router.navigate(['/auth/signin']);
          },1000);
      
          return false;


        }
        else{
          this.loading = false;
          this.error = true;
          this.message = 'Failed to create account. ';
          return false;
        }

      },
      (error=>{
        this.loading = false;
        this.error = true;
        this.message = 'Failed to create account something went wrong! ';
        return false;
      }))

    }

  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateMobile(mobile) {
    const re = /^([0-9\(\)\/\+ \-]*)$/;
    return re.test(String(mobile).toLowerCase());
  }

}
