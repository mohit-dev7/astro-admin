import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-contactd',
  templateUrl: './contactd.component.html',
  styleUrls: ['./contactd.component.scss']
})
export class ContactdComponent implements OnInit {
  token=localStorage.getItem("userID")
  constructor(private master:MasterService) { 
    this.TokenExpired(this.token);
  }

  ngOnInit(): void {
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
     alert('Session is expired please login again!');
      localStorage.removeItem('userID');
      location.reload();

    }))

  }

}
