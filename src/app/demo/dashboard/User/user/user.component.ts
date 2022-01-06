import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './../../../../theme/layout/auth/auth.component';
import { Component,OnInit,AfterViewInit} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,AfterViewInit{
  constructor(private authService:AuthService) {
   }

  ngOnInit(): void {
    // this.authService.getRequest("/")
  }

  ngAfterViewInit(): void {

    $(document).ready( function () {
    
      $('#example').DataTable();
  } );
  }

}
