import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.scss']
})
export class AppoinmentsComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient) { }




  ngOnInit(): void {



  }

  ngAfterViewInit(): void {

    $(document).ready( function () {
    
      $('#example').DataTable();
  } );
  }



}
