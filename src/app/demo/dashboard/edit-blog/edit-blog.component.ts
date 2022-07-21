import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MasterService } from 'src/app/services/master.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  singleData:any = [];
  name = 'Angular 4';
  urlDt:any = '../..//assets/images/placeholder.png';
  apURL = 'http://54.213.248.244:8080';

imgURL = this.apURL+"/getBlogPic"+"/";

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
blogId :any = '';
  simg: string | Blob;

  imgSlt:boolean = false;
  loader:boolean = false;
  userImage: any;
  imload: boolean;
  allMediaFiles: Object;
  constructor(private master:MasterService, private router:Router, private route:ActivatedRoute,private toaster:ToastrService) {

    this.blogId =  this.route.params['_value']['id'];

      this.getBlogData(this.blogId);
   }

  ngOnInit(): void {

    this.getAllMedia();
  }




  getBlogData(id){

this.master.getMethod('/getBlog?id='+id).subscribe(response=>{
this.singleData = response;
this.userImage = response['image'];
this.urlDt = this.imgURL +response['image'] + '/'+response['id'];
$('#editor1 .angular-editor-textarea').html(response['content']);
})

  }


 
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
this.simg = event.target.files[0];
this.imgSlt = true;
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlDt = event.target.result;
      }
    }
  }

 



  postNewBlog(){
    this.loader = true;
 

    var blogTitle = $('#blog_title').val();
    var blogSubtitle = $('#blogSubtilte').val();
    var blog_ftr = $('#blog_ftr').val();
    var content = $('#editor1 .angular-editor-textarea').html();
    var description=$('#description').val();
    var value=String($('#blog_title').val()).split(' ').join('-').toLowerCase();
    var value1 = value.replace('&','and');
    var keyword=$('#keyword').val();
    console.log(value)

    if(blogTitle==''){
      this.toaster.error('Please add blog title');
      this.loader=false
      return false;

    }

    else if(blogSubtitle==''){
      this.loader=false
      this.toaster.error('Please add blog subtitle');
      return false;

    }

    else if(content==''){
      this.loader=false
      this.toaster.error('Please write something in blog.');
      return false;

    }

    else if(keyword==''){
      this.loader=false
      this.toaster.error('Please write some keywords in blog.');
      return false;

    }

    else{

      if(this.imgSlt!=true){
        
      var data ={
        "id": this.blogId,
      "title":blogTitle,
      "subtitle":blogSubtitle,
      "content":content,
      "image":this.userImage,
      "status":"Active",
      "description":description,
      "keywords":keyword,
      "slug":value1
    }


    this.master.methodPost(data,'/addBlog').subscribe((response:any)=>{

      console.log(response['id']);

      this.loader = false;
      this.toaster.success('Blog Added seuucess fully.');
          this.router.navigate(['/dashboard/allblogs']);
      
     
    

   });

      }

      else{
        var data2 ={
          "id": this.blogId,
        "title":blogTitle,
        "subtitle":blogSubtitle,
        "content":content,
        "status":"Active",
        "description":description,
        "keywords":keyword,
        "slug":value1
      }
  
  
      this.master.methodPost(data2,'/addBlog').subscribe((response:any)=>{
  
        console.log(response['id']);
        
       this.uploadBlogImage(response['id']);
      
  
     });
      }

  

    }
    

  }







  uploadBlogImage(id){
  
    var formData = new FormData();
    formData.append('file', this.simg);


    console.log(this.simg);
    this.master.methodPostMulti(formData, '/uploadBlogPic?blogId='+id).subscribe(res=>{
console.log(res);
       this.router.navigate(['/dashboard/allblogs']);
       this.loader = false;
       this.toaster.success('Blog Added successfully.');
    });
  }



  
  appendImg(src){
    let img = '<img src="'+src+'" />'
    $('#editor1 .angular-editor-textarea').append(img);

    $('#editor1 .angular-editor-textarea img').css({
      width:'50%'
    })

    $('#mediapop').modal('toggle');

  }



  
  getAllMedia(){

    this.master.getMethod('/common/all').subscribe(res=>{
    
    this.allMediaFiles = res;
    
    });
    
      }
    
    
    
      removeMedia(id){
        this.imload = true;
    
        if(confirm('Are sure want to delete this media?')){
    
          this.master.deleteMethod('/common/delete/'+id).subscribe(res=>{
         
            this.getAllMedia()
           this.toaster.success('Image deleted success fully!')
           this.imload = false;
          });
    
        }
    
      }
    
      addMoreImage(event){
    
        this.imload = true;
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
    
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          this.simg = event.target.files[0];
      
        let formDataN = new FormData;
        formDataN.append('file',this.simg) 
    
    
        this.master.methodPostMulti(formDataN,'/common/uploadPic').subscribe(res=>{
    
          this.getAllMedia()
          this.imload = false;
          if(res[0].id!==''){
            this.toaster.success('Image Added successfully.');
            this.getAllMedia()
            this.imload = false;
          }
          else{
            this.toaster.error('Image Added failed.');
            this.getAllMedia()
          }
    
        },err=>{
          this.toaster.success('Image Added successfully.');
        })
    
    
        }
    
      }
 

}
