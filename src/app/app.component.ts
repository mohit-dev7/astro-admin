import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { MasterService } from './services/master.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'datta-able';

  constructor(private router: Router,  private master:MasterService ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });


    // this.expireToken();
  }

  expireToken(){
    this.master.getMethod('/AllCountries').subscribe(error=>{

  if(error){

    localStorage.removeItem('userID');
    location.reload();

  }
     
     });
  }

}
