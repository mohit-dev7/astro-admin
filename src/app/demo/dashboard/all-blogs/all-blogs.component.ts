import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MasterService } from 'src/app/services/master.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'all-blogs-appoinments',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {

  appointmentForm:FormGroup;
  type=new FormControl("")
  name=new FormControl("");
  date=new FormControl("");
  public getBlogs:any=[];
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
  apURL = 'http://18.219.65.148:8080';
  constructor(private http: HttpClient,private master:MasterService) {


   }




  ngOnInit(): void {
    this.appointmentForm= new FormGroup({
      type:new FormControl(""),
      name:new FormControl(""),
      date:new FormControl("")

    })

  

  this.getAllAppointment();
  }




  



  ngAfterViewInit(): void {

  //   $(document).ready( function () {
    
  //     $('#example').DataTable();
  // } );
  }
  

  getAllAppointment(){
    this.loader=true
    this.master.getMethod("/getAllBlogs").subscribe(data=>{
      this.getBlogs=JSON.parse(JSON.stringify(data));
      console.log(data)
      setTimeout(function(){
        $('#example').DataTable();
       }, 1000);
       this.loader=false;
    })
  }




  deleteBlog(id){

if(confirm("Are you sure want to delete this blog?")){

  }

  else{
  }
  }


    onCancel(){
      this.onEdit=false;
      this.message="";
  
    }



}
