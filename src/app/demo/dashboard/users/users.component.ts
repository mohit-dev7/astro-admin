import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

userData:any = [];

  constructor(private http: HttpClient, private master:MasterService) { }

  ngOnInit(): void {
this.getAllUSerData();
  }


  ngAfterViewInit(): void {

    $(document).ready( function () {
   


      $('#example').DataTable();
  } );
  }


    
 getAllUSerData(){
  this.master.getMethod('/getUsers').subscribe(data=>{

   this.userData = JSON.parse(JSON.stringify(data));
  
  });
}

editCountry(sno : any)
{
  
}


}

