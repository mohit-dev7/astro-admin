import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MasterService } from 'src/app/services/master.service';


@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.scss']
})
export class AppoinmentsComponent implements OnInit, AfterViewInit {
  public allAppointment:any=[];
  loader:boolean=false;

  DiffAppointment:any
  appointmentlike:string="All";
  token=localStorage.getItem('userID');
  constructor(private http: HttpClient,private master:MasterService) {
    this.TokenExpired(this.token);

   }




  ngOnInit(): void {

  

  this.getAllAppointment();
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


  



  ngAfterViewInit(): void {

  //   $(document).ready( function () {
    
  //     $('#example').DataTable();
  // } );
  }
  

  getAllAppointment(){
    this.master.getMethod("/allAppointments").subscribe(data=>{
      this.allAppointment=JSON.parse(JSON.stringify(data));
      setTimeout(function(){
        $('#example').DataTable();
       }, 1000);
    })
  }


  getAppointment(value){
    if (value!=""){
      this.DiffAppointment=value;
    }
  }

  
getDiffAppointment(){
 
  if(this.DiffAppointment=="All"){
    this.appointmentlike=this.DiffAppointment;
    this.loader=true;
    this.master.getMethod("/allAppointments").subscribe(data=>{
    this.allAppointment=JSON.parse(JSON.stringify(data));
     this.loader=false;
    })
  }else if (this.DiffAppointment!="All"){
    this.appointmentlike=this.DiffAppointment;
    this.loader=true;
    this.master.getMethod("/getAppointment/"+this.DiffAppointment).subscribe(data=>{
    this.allAppointment=JSON.parse(JSON.stringify(data));

      this.loader=false;
    });
  }
}



}
