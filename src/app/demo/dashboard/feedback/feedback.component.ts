import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MasterService } from 'src/app/services/master.service';
declare var require: any

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

    this.URLify('https://xxx.xom  <a href="www.dd.dd">ss</a>fkjkjfd jkjfd ')
  }


  // ngAfterViewInit(): void {

  //   $(document).ready( function () {
    
  //     $('#example').DataTable();
  // } );
  // }

  URLify(string){
    var urls = string.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g);
    if (urls) {
      urls.forEach(function (url) {
        string = string.replace(url, '<a target="_blank" href="' + url + '">' + url + "</a>");
      });
    }
    console.log(string.replace(/<a\b[^>]*>/i,"").replace(/<\/a>/i, "").replace(/(^\w+:|^)\/\//, ''));
    return string.replace("(", "<br/>(");
  }

  filterFeedbacks(){
    var personName = <HTMLInputElement>document.getElementById('personName');

    alert(personName.value);

  }


  getFeedbackData(){

    this.master.getMethod('/getAllFeedback').subscribe(res=>{

      this.feedData = JSON.parse(JSON.stringify(res));
      var Filter = require('bad-words'),
      filter = new Filter();
    console.log(this.feedData);
        Object.keys(this.feedData).forEach(element => {
          let feed = this.feedData[element]['message'];
          //console.log(feed);
          let cleanWord = filter.clean(feed);
          console.log(cleanWord);

          console.log(  feed.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''));
          this.feedData[element]['message'] = cleanWord;

        });
        ;

     
    
          
    setTimeout(function(){
      $('#example').DataTable();
     }, 1000);

    })

  }

}
