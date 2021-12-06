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
  public allAppointment:any=[]
  constructor(private http: HttpClient,private master:MasterService) { }




  ngOnInit(): void {


  this.getAllAppointment();
  }

  ngAfterViewInit(): void {

    $(document).ready( function () {
    
      $('#example').DataTable();
  } );
  }

  getAllAppointment(){
    this.master.getMethod("/allAppointments").subscribe(data=>{
      this.allAppointment=data;
      console.log(this.allAppointment)
    })
  }




}
