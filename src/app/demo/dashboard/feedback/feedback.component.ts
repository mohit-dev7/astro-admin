import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedData: any = [];

  constructor(private master:MasterService) { }

  ngOnInit(): void {
    this.getFeedbackData();
  }


  ngAfterViewInit(): void {

    $(document).ready( function () {
    
      $('#example').DataTable();
  } );
  }



  getFeedbackData(){

    this.master.getMethod('/getAllFeedback').subscribe(res=>{

        this.feedData = res;

    })

  }

}
