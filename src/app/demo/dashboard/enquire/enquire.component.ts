import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';

import { FormControl,  Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare var $: any;

// piyush

@Component({
  selector: 'app-enquire',
  templateUrl: './enquire.component.html',
  styleUrls: ['./enquire.component.scss']
})
export class EnquireComponent implements OnInit {
 

  enquireform:FormGroup;
  enquire:any = [];
  fromdate = new FormControl("", [Validators.required]);
  todate= new FormControl("", [Validators.required]);
  status = new FormControl("", [Validators.required]);
  data:any
  // checkbox:any = 'DEACTIVATE';
  // isCheck:boolean = false;
  enquiredata:any = [];
  message:any = '';
  error:boolean = false;

  constructor( private master:MasterService ,private authservice:AuthService, private router:Router) {


    
   }

  ngOnInit(): void {
    this.enquireform= new FormGroup({
      fromdate: new FormControl(""),
      todate: new FormControl(""),
      status: new FormControl("")
    });
  
    this.getEnquire();
  }
  
  ngAfterViewInit(): void {

    $(document).ready( function () {
    
      $('#example').DataTable();
  } );
  }


  getSearch(){
      var fromdate=this.enquireform.get("fromdate").value;
      var todate=this.enquireform.get("todate").value;
      var status=this.enquireform.get("status").value;

      this.master.getMethod('/getAllEnquiries').subscribe(data=>{
        var size = Object.keys(data).length;
        console.log(size);
        console.log(data)
        if (fromdate!="" && todate!="" && status!=""){
          for (let i=0;i<size;i++){
              if (data[i].date>=fromdate && data[i].data<todate && data[i].status=="done"){
                this.enquiredata.push(data[i]);
              }
          }
      }
      })
      
   
      
    
  }

 

  // AddRateList(){
  //   debugger;
  //   var Country=this.enquireform.get("country").value;
  //   var Ctype=this.enquireform.get("ctype").value;
  //   var Rate=this.enquireform.get("rateofvalue").value;
  

  //   if(Country==''){
  //     this.error = true;
  //     this.message = 'Please select a country name!';
  //     return false;

  //   }

  //   else if(Ctype==''){
  //     this.error = true;
  //     this.message = 'Please select consultation type!';
  //     return false;

  //   }
  //   else if(Rate==''){
  //     this.error = true;
  //     this.message = 'Please enter rate';
  //     return false;

  //   }
  //   else{

         
  //   const data ={
  //     "countryName":Country,
  //     "consultationType":Ctype,
  //     "rateOfValues":Rate,
     
  //   }
  //   this.master.methodPost(data,'/addRateList').subscribe(reponse=>{

  //     if(reponse['name']!='')
  //     {
  //       this.error = false;
  //       this.message = 'New country added successfully!';
  //       // setTimeout(()=>{location.reload()},1000);
  //       this.ngOnInit();
  //       return false;

  //     }else{
  //       this.error = true;
  //       this.message = 'Failed to add new country please check all details!';
  //       return false;
  //     }

     
  //    },(error=>{
  //     alert("failed to add new country something went wrong");
  //    }));

  //   }

    
  // }



  
  getEnquire(){
   this.master.getMethod('/getAllEnquiries').subscribe(data=>{

    this.enquiredata = JSON.parse(JSON.stringify(data));
   
   
   });
 }

//  getfilter(){

//   this.master.getMethod('/getAllEnquiries').subscribe(data=>{

//  }

}
