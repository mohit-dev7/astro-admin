import { Component, OnInit } from '@angular/core';

declare const AmCharts: any;
declare var $: any;

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/pie.min.js';
import '../../../../assets/charts/amchart/ammap.min.js';
import '../../../../assets/charts/amchart/usaLow.js';
import '../../../../assets/charts/amchart/radar.js';
import '../../../../assets/charts/amchart/worldLow.js';
import { PromocodeRoutingModule } from '../promocode/promocode-routing.module.js';
import { MasterService } from 'src/app/services/master.service.js';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  appointment:any="Today"
  allAppointment:any=[]
  title = 'datta-able';
  token=localStorage.getItem('userID');
  constructor(private master:MasterService) { 

    this.TokenExpired(this.token);
  }

  ngOnInit() {
    this.getAllAppointment();
  }

  ngAfterViewInit(): void {
   $(document).ready( function () {
      $('#example').DataTable();
    });
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

  OnClick(value:any){
    this.appointment=value;
  }
  getAllAppointment(){
     this.master.getMethod("/allAppointments").subscribe(data=>{
       this.allAppointment=data
       console.log(this.allAppointment)
     })
  }

}
