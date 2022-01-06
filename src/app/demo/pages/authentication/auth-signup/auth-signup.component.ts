import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
    let data ={}
    this.authService.postRequest("user/registration",data).subscribe((data)=>{
      console.log("data");
    })
  }


}
