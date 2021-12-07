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
  ifUpdate:boolean=false;
  loader:boolean=false;
  singlePromocodeData:any
 

  

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
     setTimeout(function(){
      $('#example').DataTable();
     }, 1000);
    
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


  editPromocode(id){
    console.log(id)
    $(window).scrollTop(0);
    this.loader =true;
    this.master.getMethod("/getPromoDetail?id=" + id).subscribe((res)=>{
    this.loader =false;
   
    this.ifUpdate=true;
   
    this.singlePromocodeData=res;
    console.log(this.singlePromocodeData.name);


    this.promoForm= new FormGroup({
      promcode: new FormControl(this.singlePromocodeData.code),
      percentAmount: new FormControl(this.singlePromocodeData.amount),
      effective: new FormControl(this.singlePromocodeData.effectiveDate),
      expiry: new FormControl(this.singlePromocodeData.expiryDate),
      option: new FormControl(this.singlePromocodeData.type)
    });
  

   
  
  })
  }


  updatePromocode(){
    var id = $('#promocodeid').val();
    var procode=this.promoForm.get('promcode').value;
    var percentAmount=this.promoForm.get('percentAmount').value;
    var effective=this.promoForm.get("effective").value;
    var expiry=this.promoForm.get("expiry").value;
    var option=this.promoForm.get("option").value;
    console.log(id)
    if(procode==''){
      this.error = true;
      this.message = 'Please promocode a country name!';
   
      return false;
  
    }
  
     else{
      var data ={
        "sno":id,
        "code":procode,
        "amount":percentAmount,
        "effectiveDate":effective,
        "expiryDate":expiry,
        "type":option,
        "status":"active"

      }
    }
    this.master.methodPost(data,'/editPromo?id='+id).subscribe(resp=>{
      if(resp['code']!='')
      { ;
      this.ifUpdate=false;
   
        this.error = false;
        this.message = ' Promocode updated successfully!';
        // setTimeout(()=>{location.reload()},1000);
        this.ngOnInit();
        return false;
  
      }else{
        this.error = true;
        this.message = 'Failed to update Promocode please check all details!';
        return false;
      }
    },(error=>{
      alert("failed to update Promocode something went wrong");
     }));



    
    
  }



  onCancel(){
    this.loader =false;
   
    this.ifUpdate=false;
    this.promoForm= new FormGroup({
      promcode:new FormControl(""),
      percentAmount:new FormControl(""),
      effective:new FormControl(""),
      expiry:new FormControl(""),
       option:new FormControl("")
    });
  }





 
 



















  ngAfterViewInit(): void {

  $(document).ready(function () {
    $('.checkbox input:checkbox').on('click', function(){
      $(this).closest('.checkbox').find('.ch_for').toggle();
    });
  });

 }
 
 


}


