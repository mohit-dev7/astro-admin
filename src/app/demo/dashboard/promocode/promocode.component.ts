import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
declare var $: any;

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.scss']
})
export class PromocodeComponent implements OnInit {





  promocode:any
  promoForm:FormGroup
  promcode= new FormControl( "",[Validators.required]);
  percentAmount= new FormControl( "",[Validators.required]);
  effective= new FormControl( "",[Validators.required]);
  expiry= new FormControl( "",[Validators.required]);
  option= new FormControl( "",[Validators.required]);
  optionValue:any
 

  message:any = '';
  error:boolean = false;

  

  constructor(private master:MasterService) {
 
   }

  ngOnInit(): void {
    this.promoForm= new FormGroup({
      promcode:new FormControl(""),
      percentAmount:new FormControl(""),
      effective:new FormControl(""),
      expiry:new FormControl(""),
       option:new FormControl("")
    });

    this.getAllPromocode();
    
  }

  getAllPromocode(){
    this.master.getMethod('/getPromo').subscribe(data=>{
 
     this.promocode = JSON.parse(JSON.stringify(data));
     console.log(data)
    
    });

    
  }

  addNewPromoCode(){
    var procode=this.promoForm.get('promcode').value;
    var percentAmount=this.promoForm.get('percentAmount').value;
    var effective=this.promoForm.get("effective").value;
    var expiry=this.promoForm.get("expiry").value;
    var option=this.promoForm.get("option").value;
    console.log(procode,percentAmount,effective,expiry,option)
    if(procode==''){
      this.error = true;
      this.message = 'Please enter a promocode!';
   
      return false;

    }

    else if(percentAmount==''){
      this.error = true;
      this.message = 'Please enter a percent/amount!';
      return false;

    
    }
    else if(effective==''){
      this.error = true;
      this.message = 'Please enter a effective date!';
      return false;

    }
    else if(expiry==''){
      this.error = true;
      this.message = 'Please enter a expiry date';
      return false;

    }else{
      var data ={
        "code":procode,
        "amount":percentAmount,
        "effectiveDate":effective,
        "expiryDate":expiry,
        "type":option,
        "status":"active"

      }}

      this.master.promoDataPost(data).subscribe(reponse=>{
          console.log(reponse)
          if (reponse["code"]!=""){
            this.error = false;
            this.message = 'New promocode added successfully!';
            // setTimeout(()=>{location.reload()},1000);
            this.ngOnInit();
            return false;
          }else{
            this.error = true;
            this.message = 'Failed to add new promocode check all details!';
            return false;
          }
  
      },(error=>{
        alert("failed to add new promocode something went wrong");
      }));

      


      


  }





 
 



















  ngAfterViewInit(): void {

    $(document).ready( function () {
    
      $('#example').DataTable();
  } );

  $(document).ready(function () {
    $('.checkbox input:checkbox').on('click', function(){
      $(this).closest('.checkbox').find('.ch_for').toggle();
    })
  });

  }
 
 


}


