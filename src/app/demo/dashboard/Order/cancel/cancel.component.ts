import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit,AfterViewInit {

  public cancelOrders;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getRequest("/order/cancel").subscribe((res)=>{
      // console.log(res);
      if(!res.status){
          console.log("error")
      }
      this.cancelOrders = res.data;
      console.log(this.cancelOrders);
    })
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      $(document).ready( function () {
        $('#example').DataTable();
    } );
      
    }, 3000);
  }
}
