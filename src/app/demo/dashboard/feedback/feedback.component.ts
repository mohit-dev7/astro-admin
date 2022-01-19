import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MasterService } from 'src/app/services/master.service';
import { ToastNoAnimation, ToastrService } from 'ngx-toastr';
declare var require: any

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedData: any = [];
  error:boolean=false;
  message:any=""
  

  constructor(private master:MasterService,private toaster:ToastrService) { }

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

 onDelete(id){
   if(confirm("Are Sure you want to delete this data")){
     this.master.deleteMethod("/deleteFeedback/"+id).subscribe(data=>{
       if(data["name"]!=""){
         this.error=true
         this.toaster.success("this data is deleted successfully")
         this.getFeedbackData()
       }else{
         this.error=true
         this.toaster.error("failed to delete feedback")
         
       }
     },(error=>{
       this.toaster.error("something went wrong please check carefully")
     }))
   }
 }

 onCancel(){
   
 }

}
