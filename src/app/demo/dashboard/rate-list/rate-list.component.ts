import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';

import { FormControl,  Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

// piyush

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss']
})
export class RateListComponent implements OnInit{
 

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
  countryData:any=[]
  rateListCountry:any=[]
  sortedRateList:any=[]
  filterDeletedData:any=[]
  destroy: number = 0;
  ischecked:boolean

  constructor( private master:MasterService ,private authservice:AuthService, private router:Router,private toaster:ToastrService) {


    
   }

  ngOnInit(): void {
    this.ratelistform= new FormGroup({
      country: new FormControl(""),
      ctype: new FormControl(""),
      rateofvalue: new FormControl("")
    });
  
    this.getRateList();
    this.getcountryList();
    
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
        location.reload();
        return false;

      }else{
        this.error = true;
        this.message = 'Failed to add new country please check all details!';
        return false;
      }

     
     },(error=>{
      this.toaster.error("failed to add new country something went wrong");
     }));

    }

    
  }



  
 getRateList(){
   this.loader=true
   this.sortedRateList=[]
   this.master.getMethod('/getAllRateList').subscribe(data=>{

    this.rateList = JSON.parse(JSON.stringify(data));
    // for (let i=0;i<this.rateList.length ; i++){
    //   if (this.rateList[i].status!="DELETED"){
    //       this.filterDeletedData.push(this.rateList[i])
    //   }
    // }
    // console.log(this.rateList)
    // var low=0;
    // var high=this.filterDeletedData.length -1;
    // while(low<=high){
    //   if(this.filterDeletedData[low].sno<this.filterDeletedData[high].sno){
    //     this.sortedRateList.push(this.filterDeletedData[high]);
    //     high--
    //   }else{
    //     this.sortedRateList.push(this.filterDeletedData[low]); 
    //     low++;
    //   }
    // }

  
   
  
   
   
   });
   setTimeout(function(){
    $('#example').DataTable();
   }, 1000);
   this.loader=false
 }
  
 getcountryList(){
  this.master.getMethod('/AllCountries').subscribe(data=>{

   this.rateListCountry = JSON.parse(JSON.stringify(data));
   var keys = Object.keys(data);
   var len = keys.length;
  
   for(let i=0;i<len ;i++){
    
     if(data[i].status!="DELETED" && data[i].status!="DEACTIVATE"){
        
         this.countryData.push(data[i]);
     }
   } 
   console.log(this.countryData)
  
  
  });
}


 editRateList(id){
   console.log(id)

  $(window).scrollTop(0);
  this.loader =true;
   this.master.getMethod("/getRateListDetail/" + id).subscribe((res)=>{

    this.loader =false;
    this.formTitle="Edit Rate List";
    this.ifUpdate=true;
 
     this.singaleCountry=JSON.parse(JSON.stringify(res));
     console.log(this.singaleCountry)

     

     this.ratelistform= new FormGroup({
      country: new FormControl(this.singaleCountry.countryName),
      ctype: new FormControl(this.singaleCountry.consultationType),
      rateofvalue: new FormControl(this.singaleCountry.rateOfValues),
      status: new FormControl(this.singaleCountry.status)
    });
    if(this.singaleCountry.status=="ACTIVE"){
      this.ischecked=true
    }

    $('#ratelistid').val(this.singaleCountry.sno);
  
   })
 }




 updateRateList(){

  var id = $('#ratelistid').val();
  var Country=this.ratelistform.get("country").value;
  var ctype=this.ratelistform.get("ctype").value;
  var rateofvalue=this.ratelistform.get("rateofvalue").value;
  var action=this.checkbox;
  console.log(id,Country,ctype,rateofvalue,action)
 

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
    "countryName":Country,
    "consultationType":ctype,
    "rateOfValues": rateofvalue,
    "status":action,
    "sno":id,
    "remarks":''

  }
  this.master.methodPost(data, '/EditRateList' ).subscribe(reponse=>{

    if(reponse['name']!='')
    {  this.formTitle="Add";
    this.ifUpdate=false;
 
      this.error = false;
      this.message = ' Ratelist updated successfully!';
      // setTimeout(()=>{location.reload()},1000);
      location.reload();
      return false;

    }else{
      this.error = true;
      this.message = 'Failed to update ratelist please check all details!';
      return false;
    }

   
   },(error=>{
    this.toaster.error("failed to update ratelist something went wrong");
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
     "consultationType":ctype,
     "rateOfValues":rateoflist,
     "status":"DELETED",
     "sno":id,
     "remarks":''
   }
   this.master.deleteMethod( '/deleteRatelist/'+id).subscribe(reponse=>{
 
     if(reponse['name']!='')
     { 
       this.toaster.success("Record deleted successfully.");
       location.reload();
 
     }else{
       this.error = true;
       this.message = 'Failed to delete record!';
       return false;
     }
 
    
    },(error=>{
     this.toaster.error("failed to delete ratelist something went wrong");
    }));
 
  }else{
    return false;
  }
}

onCancel(){
  this.loader =false;
    this.formTitle="Add rateList";
    this.ifUpdate=false;
    this.ischecked=false
    this.ratelistform= new FormGroup({
      country: new FormControl(""),
      ctype: new FormControl(""),
      rateofvalue: new FormControl("")
    });
}



}
