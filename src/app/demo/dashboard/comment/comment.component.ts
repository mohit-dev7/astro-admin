import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  id:any
  blog:any=[]
  loader:boolean=false
  error:boolean=false;
  message:any=""
  replyOf:any=[]
  commentOnData:any

  constructor( private route: ActivatedRoute,private http: HttpClient, private router: Router, private master: MasterService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.getAllBlogComment()
    
  }
  
  getAllBlogComment(){
    this.loader=true
    this.master.getMethod("/getBlogComments?id="+this.id).subscribe(data=>{
      this.blog=data;
      console.log(this.blog)
      setTimeout(function(){
        $('#example').DataTable();
       }, 1000);
       this.loader=false
      
    })
  }

  OnCheck(id){
    this.loader=true
    this.master.getMethod("/updateCommentStatus?id="+id+"&status=Approved").subscribe(data=>{
      if(data['name']!='')
      {    
        this.error=true
        this.loader=false
        this.message="Comment approved successfully."
        // location.reload();
  
      }else{
        this.error = true;
        this.loader=false
        this.message = 'Failed to approved Comment!';
        return false;
      }
  
     
     },(error=>{
      alert("failed to approved comment something went wrong");
     }))
  

  }
  onDelete(ID){
    
    if(confirm("Are sure you want to delete this data")){
      this.master.deleteMethod("/deleteComment/"+ID).subscribe(data=>{
        if(data['name']!='')
        {    
          this.error=true
          this.loader=false
          this.message="Comment deleted successfully."
          location.reload();
    
        }else{
          this.error = true;
          this.loader=false
          this.message = 'Failed to delete Comment!';
          return false;
        }
    
       
       },(error=>{
        alert("failed to delete comment something went wrong");
       }))
    }
    

  }

  viewAllComment(id,commentOn){
    this.commentOnData=commentOn
    this.master.getMethod("/getCommentReplies?id="+id).subscribe(data=>{

      this.replyOf=data;
      console.log(this.replyOf)
    })
  }

}
