import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare const AmCharts: any;
declare var $: any;
declare var require: any

// import '../..//assets/charts/amchart/amcharts.js';
// import '../..//assets/charts/amchart/gauge.js';
// import '../..//assets/charts/amchart/serial.js';
// import '../..//assets/charts/amchart/light.js';
// import '../..//assets/charts/amchart/pie.min.js';
// import '../..//assets/charts/amchart/ammap.min.js';
// import '../..//assets/charts/amchart/usaLow.js';
// import '../..//assets/charts/amchart/radar.js';
// import '../..//assets/charts/amchart/worldLow.js';
import { PromocodeRoutingModule } from '../promocode/promocode-routing.module.js';
import { MasterService } from 'src/app/services/master.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  appointment: any = "Todays"
  allAppointment: any = []
  title = 'datta-able';
  token = localStorage.getItem('userID');
  userCount: any;
  enqueryData: any;
  appCount: any;
  getAllBlogs: any;
  loader:boolean=false;
  typeCunsultation = ["Kundali/Birth Chart Consultation", "Gemstone Consultation", "Match Making Consultation", "Vastu"];
  
  constructor(private master: MasterService,
    private router:Router,
    private toaster:ToastrService
    ) {
    this.getUserCount();
    // this.TokenExpired(this.token);
  
    setInterval(()=>{
      this.getUserCount();
    },2000);
  }

  ngOnInit() {
    this.getAllTodaysAppointment();

    var Filter = require('bad-words'),
    filter = new Filter();
    console.log(filter.clean("Don't be an xxx")); 
  }


getUserCount(){

this.master.getMethod('/getUsers').subscribe((response:any)=>{
 this.userCount = response.length;


});


this.master.getMethod('/getAllEnquiries').subscribe((response:any)=>{
  this.enqueryData = response.length;
 
 
 });

 this.master.getMethod('/allAppointments').subscribe((response:any)=>{
  this.appCount = response.length;
 
 
 });

 this.master.getMethod('/getAllBlogs').subscribe((response:any)=>{
  this.getAllBlogs = response.length;
 
 
 });
}

  TokenExpired(token) {
    this.master.getMethod("/AllCountries").subscribe(data => {
      if (data != "" && token != "") {
        return false
      } else {
        // localStorage.removeItem('userID');
        // location.reload();
      }
    }, (error => {
      this.toaster.success('Session is expired please login again!');
      localStorage.removeItem('userID');
      location.reload();

    }))

  }

  OnClick(event) {
    this.loader=true
    var value1=event.target.value
    this.appointment = value1;
    console.log(value1,this.appointment)
  

    if (value1 === "Tomorrows") {
      const today = new Date();
      const tomorrow = new Date(today.setDate(today.getDate() + 1));
      let data = {
        "fromDate": tomorrow.toISOString().slice(0,10),
        "toDate": tomorrow.toISOString().slice(0,10)
      };
      this.master.getAppointmentsByCriteria(data).subscribe(data => {
        this.allAppointment = JSON.parse(JSON.stringify(data));
        console.log(this.allAppointment)
        this.loader=false
        setTimeout(function () {
          $('#example').DataTable();
  
        }, 2000);

      });
   
    } else if (value1 === "Todays") {
      const today = new Date();
      let data = {
        "fromDate": today.toISOString().slice(0,10),
        "toDate": today.toISOString().slice(0,10)
      };
      this.master.getAppointmentsByCriteria(data).subscribe(data => {
        this.allAppointment = JSON.parse(JSON.stringify(data));
        console.log(this.allAppointment)
        this.loader=false
        setTimeout(function () {
          $('#example').DataTable();
        
        }, 2000);

      });
   
    } else if (value1 === "Upcoming") {
      const today = new Date();
      const tomorrow = new Date(today.setDate(today.getDate() + 1000));
      let data = {
        "fromDate": new Date().toISOString().slice(0,10),
        "toDate": tomorrow.toISOString().slice(0,10)
      };
      this.master.getAppointmentsByCriteria(data).subscribe(data => {
        this.allAppointment = JSON.parse(JSON.stringify(data));
        console.log(this.allAppointment)
        this.loader=false
        setTimeout(function () {
          $('#example').DataTable();
    
        }, 2000);
      });
   
    }
  }


  getAllTodaysAppointment() {
     this.loader=true
    const today = new Date();
    // today.setHours(0,0,0);
    
      let data = {
        "fromDate": today.toISOString().slice(0,10),
        "toDate": today.toISOString().slice(0,10)
      };

      console.log(today.toISOString().slice(0,10));
      this.master.getAppointmentsByCriteria(data).subscribe(data => {
        this.allAppointment = data;
        for(let i=0;i<this.allAppointment.length;i++){
          console.log(this.allAppointment[i])
            this.allAppointment[i].consultationType = this.typeCunsultation[Number(data[i].consultationType)-1]
        }
        console.log(this.allAppointment)
      this.loader = false;
      });


  }

  totalUser(){
    console.log("user")
    this.router.navigate(["/dashboard/users"])
  }

  totalEnquiry(){
    this.router.navigate(["/dashboard/enquire"])
  }
  totalAppoint(){
    this.router.navigate(["/dashboard/appointments/all"])
    
  }
totalBlogs(){
  this.router.navigate(["/dashboard/allblogs"]) 
}
}
