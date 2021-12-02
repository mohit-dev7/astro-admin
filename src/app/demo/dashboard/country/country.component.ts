import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';

import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-country',
  templateUrl:'./country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
 

  countryForm:FormGroup;
  countryData:any = [];
  country = new FormControl("", [Validators.required]);
  code= new FormControl("", [Validators.required]);
  data:any
  checkbox:any = 'DEACTIVATE';
  isCheck:boolean = false;
  message:any = '';
  error:boolean = false;
  loader:boolean=false;
  formTitle:any="Add New Country";
  ifUpdate:boolean=false;
  singaleCountry:any = [];
  constructor( private master:MasterService ,private authservice:AuthService, private router:Router ) {


    
   }

  ngOnInit(): void {
    this.countryForm= new FormGroup({
      country: new FormControl(""),
      code: new FormControl("")
    });
  
    this.getAllCountry();

 
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

  addNewCountry(){
    debugger;
    var Country=this.countryForm.get("country").value;
    var Code=this.countryForm.get("code").value;
    var action=this.checkbox;
   

    if(Country==''){
      this.error = true;
      this.message = 'Please enter a country name!';
   
      return false;

    }

    else if(Code==''){
      this.error = true;
      this.message = 'Please enter a country code!';
      return false;

    }
    else{

         
    const data ={
      "name":Country,
      "code":Code,
      "status":action
    }
    this.master.methodPost(data, '/AddCountry').subscribe(reponse=>{

      if(reponse['name']!='')
      {
        this.error = false;
        this.message = 'New country added successfully!';
        // setTimeout(()=>{location.reload()},1000);
        this.ngOnInit();
        return false;

      }else{
        this.error = true;
        this.message = 'Failed to add new country polease check all details!';
        return false;
      }

     
     },(error=>{
      alert("failed to add new country something went wrong");
     }));

    }

    
  }



  
 getAllCountry(){
   this.master.getMethod('/AllCountries').subscribe(data=>{

    this.countryData = JSON.parse(JSON.stringify(data));
   
   });
 }


 editCountry(id){

  $(window).scrollTop(0);
  this.loader =true;
   this.master.getMethod("/getCountryDetail?id=" + id).subscribe((res)=>{
    this.loader =false;
    this.formTitle="Update Country";
    this.ifUpdate=true;
 
     this.singaleCountry=res;
     console.log(this.singaleCountry.name);


     this.countryForm= new FormGroup({
      country: new FormControl(this.singaleCountry.name),
      code: new FormControl(this.singaleCountry.code)
    });

    $('#contryid').val(this.singaleCountry.sno);
  
   })
 }

 updateCountry(){

  var id = $('#contryid').val();
  var Country=this.countryForm.get("country").value;
  var Code=this.countryForm.get("code").value;
  var action=this.checkbox;
 

  if(Country==''){
    this.error = true;
    this.message = 'Please enter a country name!';
 
    return false;

  }

  else if(Code==''){
    this.error = true;
    this.message = 'Please enter a country code!';
    return false;

  }
  else{

       
  const data ={
    "name":Country,
    "code":Code,
    "status":action,
    "sno":id,
    "remarks":''

  }
  this.master.methodPost(data, '/UpdateCountry?id='+id).subscribe(reponse=>{

    if(reponse['name']!='')
    {  this.formTitle="Add";
    this.ifUpdate=false;
 
      this.error = false;
      this.message = ' Country updated successfully!';
      // setTimeout(()=>{location.reload()},1000);
      this.ngOnInit();
      return false;

    }else{
      this.error = true;
      this.message = 'Failed to update country polease check all details!';
      return false;
    }

   
   },(error=>{
    alert("failed to update country something went wrong");
   }));

  }

  

 }

 OnDelete(id, name, code){
   if(confirm("Are you sure want to delete this record?")){
 
    var Country=this.countryForm.get("country").value;
    var Code=this.countryForm.get("code").value;
    var action=this.checkbox;

    const data ={
      "name":name,
      "code":code,
      "status":"DELETED",
      "sno":id,
      "remarks":''
  
    }
    this.master.methodPost(data, '/UpdateCountry?id='+id).subscribe(reponse=>{
  
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
      alert("failed to delete country something went wrong");
     }));
  
   }else{
     return false;
   }
 }

 cancelUpdate()
{
  this.loader =false;
  this.formTitle="Add";
  this.ifUpdate=false;
}
}
