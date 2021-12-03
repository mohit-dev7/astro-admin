import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';

import { FormControl,  Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare var $: any;

// piyush

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss']
})
export class RateListComponent implements OnInit {
 

  ratelistform:FormGroup;
  rateList:any = [];
  country = new FormControl("", [Validators.required]);
  ctype= new FormControl("", [Validators.required]);
  rateofvalue= new FormControl("", [Validators.required]);
  data:any
  checkbox:any = 'DEACTIVATE';
  isCheck:boolean = false;
  message:any = '';
  error:boolean = false;
  loader:boolean=false;
  formTitle:any="Add Rate List";
  ifUpdate:boolean=false;
  singaleCountry: any;

  constructor( private master:MasterService ,private authservice:AuthService, private router:Router) {


    
   }

  ngOnInit(): void {
    this.ratelistform= new FormGroup({
      country: new FormControl(""),
      ctype: new FormControl(""),
      rateofvalue: new FormControl("")
    });
  
    this.getRateList();
    
  }
  
  ngAfterViewInit(): void {

    $(document).ready( function () {
    
      $('#example').DataTable();
  } );


  }

  checkCheckBoxvalue(event){
   
    if (this.isCheck==false){
      this.isCheck =true;
      this.checkbox="ACTIVE"
    }else{
      this.isCheck =false;
      this.checkbox="INACTIVE"
    }

  }

  AddRateList(){
    debugger;
    var Country=this.ratelistform.get("country").value;
    var Ctype=this.ratelistform.get("ctype").value;
    var Rate=this.ratelistform.get("rateofvalue").value;
    var action=this.checkbox;
   

    if(Country==''){
      this.error = true;
      this.message = 'Please select a country name!';
      return false;

    }

    else if(Ctype==''){
      this.error = true;
      this.message = 'Please select consultation type!';
      return false;

    }
    else if(Rate==''){
      this.error = true;
      this.message = 'Please enter rate';
      return false;

    }
    else{

         
    const data ={
      "countryName":Country,
      "consultationType":Ctype,
      "rateOfValues":Rate,
      "status":action
    }
    this.master.methodPost(data,'/addRateList').subscribe(reponse=>{

      if(reponse['name']!='')
      {
        this.error = false;
        this.message = 'New country added successfully!';
        // setTimeout(()=>{location.reload()},1000);
        this.ngOnInit();
        return false;

      }else{
        this.error = true;
        this.message = 'Failed to add new country please check all details!';
        return false;
      }

     
     },(error=>{
      alert("failed to add new country something went wrong");
     }));

    }

    
  }



  
 getRateList(){
   this.master.getMethod('/getAllRateList').subscribe(data=>{

    this.rateList = JSON.parse(JSON.stringify(data));
   
   });
 }


 editRateList(id){

  $(window).scrollTop(0);
  this.loader =true;
   this.master.getMethod("/getRateListDetail?id=" + id).subscribe((res)=>{
    this.loader =false;
    this.formTitle="Edit Rate List";
    this.ifUpdate=true;
 
     this.singaleCountry=res;
     console.log(this.singaleCountry.countryName);

     this.ratelistform= new FormGroup({
      country: new FormControl(this.singaleCountry.countryName),
      ctype: new FormControl(this.singaleCountry.ctype),
      rateofvalue: new FormControl(this.singaleCountry.rateofvalue),
      status: new FormControl(this.singaleCountry.status)
    });

    $('#ratelistid').val(this.singaleCountry.sno);
  
   })
 }


 updateRateList(){

  var id = $('#ratelistid').val();
  var Country=this.ratelistform.get("country").value;
  var ctype=this.ratelistform.get("ctype").value;
  var rateofvalue=this.ratelistform.get("rateofvalue").value;
  var action=this.checkbox;
 

  if(Country==''){
    this.error = true;
    this.message = 'Please select country name!';
 
    return false;

  }

  else if(ctype==''){
    this.error = true;
    this.message = 'Please select consultation type!';
    return false;

  }
  else if(rateofvalue==''){
    this.error = true;
    this.message = 'Please select rate of value';
    return false;

  }
  else{

       
  const data ={
    "name":Country,
    "ctype":ctype,
    "rateofvalue": rateofvalue,
    "status":action,
    "sno":id,
    "remarks":''

  }
  this.master.methodPost(data, '/EditRateList='+id).subscribe(reponse=>{

    if(reponse['name']!='')
    {  this.formTitle="Add";
    this.ifUpdate=false;
 
      this.error = false;
      this.message = ' Ratelist updated successfully!';
      // setTimeout(()=>{location.reload()},1000);
      this.ngOnInit();
      return false;

    }else{
      this.error = true;
      this.message = 'Failed to update ratelist please check all details!';
      return false;
    }

   
   },(error=>{
    alert("failed to update ratelist something went wrong");
   }));

  }

  

 }


 
 OnDelete(id, countryName, ctype, rateoflist){
  if(confirm("Are you sure want to delete this record?")){

  //  var Country=this.ratelistform.get("country").value;
  //  var Ctype=this.ratelistform.get("ctype").value;
  //  var Rateoflist=this.ratelistform.get("rateoflist").value;
  //  var action=this.checkbox;

   const data ={
     "countryName":countryName,
     "ctype":ctype,
     "Rateoflist":rateoflist,
     "status":"DELETED",
     "sno":id,
     "remarks":''
   }
   this.master.methodPost(data, '/EditRateList?id='+id).subscribe(reponse=>{
 
     if(reponse['name']!='')
     { 
       alert("Record deleted successfully.");
       this.ngOnInit();
 
     }else{
       this.error = true;
       this.message = 'Failed to delete record!';
       return false;
     }
 
    
    },(error=>{
     alert("failed to delete ratelist something went wrong");
    }));
 
  }else{
    return false;
  }
}



}
