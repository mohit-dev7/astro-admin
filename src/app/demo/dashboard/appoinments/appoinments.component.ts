import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MasterService } from 'src/app/services/master.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.scss']
})
export class AppoinmentsComponent implements OnInit, AfterViewInit {

  appointmentForm:FormGroup;
  type=new FormControl("")
  name=new FormControl("");
  date=new FormControl("");
  public allAppointment:any=[];
  loader:boolean=false;

  DiffAppointment:any
  appointmentlike:string="All";
  token=localStorage.getItem('userID');
  onEdit:boolean=false;
  id:any
  message:any = '';
  error:boolean = false;
  singleUserDetail:any=[]
  dateFormat:any
  datepipe: any;
  constructor(private http: HttpClient,private master:MasterService) {
    this.TokenExpired(this.token);

   }




  ngOnInit(): void {
    this.appointmentForm= new FormGroup({
      type:new FormControl(""),
      name:new FormControl(""),
      date:new FormControl("")

    })

  

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
      console.log(data)
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

editAppointment(id){

  $(window).scrollTop(0);
  this.onEdit=true;
  this.id=id
  this.master.getMethod("/getAppointmentDetail?id="+this.id).subscribe(data=>{
    this.singleUserDetail=JSON.parse(JSON.stringify(data));
    console.log(this.singleUserDetail)
    this.dateFormat=this.datepipe.transform(this.singleUserDetail.appointDate, 'dd/MM/yyyy')
    console.log(this.dateFormat)
    this.appointmentForm=new FormGroup({
      name:new FormControl(this.singleUserDetail.userProfile.firstName +" "+ this.singleUserDetail.userProfile.lastName),
      date:new FormControl(this.singleUserDetail.appointDate )
  
    })
  })
 

  
}

    updateStatus(){
      this.loader=true
    var type=this.appointmentForm.get("type").value;
    this.master.getMethod("/changeAppointmentStatus?id="+this.id+"&status="+type).subscribe(reponse=>{
        if(reponse['name']!='')
        {  
        

          this.error = false;
          this.message = ' status updated successfully!';
          // setTimeout(()=>{location.reload()},1000);
          this.loader=false
          this.ngOnInit();
          return false;
        
      } else{
        this.error = true;
        this.message = 'Failed to Update status please check all details!';
        this.loader=false;
        return false;
      }
    },(error=>{
      alert("failed to Status update  something went wrong");
     }))
  }


    onCancel(){
      this.onEdit=false;
      this.message="";
  
    }



}
