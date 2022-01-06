import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
var $:any
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit,AfterViewInit{

  public orders:any;
  public orderId;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getRequest('/order/list').subscribe((data)=>{
      console.log(data);
      this.orders = data.data;
    })
  }

  setOrder(id){
    this.orderId = id
  }
  orderAction(status,id,comment){
    let data = {
      "id":id,
      "comment":comment,
      "status":status
    }
    console.log(data);
    this.authService.putRequest("/order/status",data).subscribe((res)=>{
      if(!res.status){
        console.log("error! something went wrong")
      }
      console.log("update successfully.")
      window.location.reload();
    })
  }

  ngAfterViewInit(): void {

    $(document).ready( function () {
    
      $('#example').DataTable();
  } );
  }

}
