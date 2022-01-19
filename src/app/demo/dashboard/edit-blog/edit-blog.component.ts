import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  singleData:any = [];
  name = 'Angular 4';
  urlDt:any = '../../../../assets/images/placeholder.png';
  apURL = 'http://18.219.65.148:8080';

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
  constructor(private master:MasterService, private router:Router, private route:ActivatedRoute) {

    this.blogId =  this.route.params['_value']['id'];

      this.getBlogData(this.blogId);
   }

  ngOnInit(): void {

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
      alert('Please add blog title');
      this.loader=false
      return false;

    }

    else if(blogSubtitle==''){
      this.loader=false
      alert('Please add blog subtitle');
      return false;

    }

    else if(content==''){
      this.loader=false
      alert('Please write something in blog.');
      return false;

    }

    else if(keyword==''){
      this.loader=false
      alert('Please write some keywords in blog.');
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
      alert('Blog Added seuucess fully.');
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
       alert('Blog Added successfully.');
    });
  }

}
