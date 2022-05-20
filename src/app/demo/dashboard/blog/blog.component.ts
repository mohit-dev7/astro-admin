import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MasterService } from 'src/app/services/master.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  htmlContent:any;
  name = 'Angular 4';
  urlDt:any = '../..//assets/images/placeholder.png';


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
  simg: any;
  loader:boolean = false;
  error:boolean=false
  message:string=""

  constructor(private master:MasterService, private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
  }



  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.simg = event.target.files[0];
      console.log(this.simg)
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlDt = event.target.result;
      }
    }
  }

 



  postNewBlog(){
    $(window).scrollTop(0);
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
      this.error=true
      this.loader=false
      this.message='Please add blog title';
      return false;

    }

    else if(blogSubtitle==''){
      this.error=true
      this.loader=false
      this.message='Please add blog subtitle';
      return false;

    }

    else if(content==''){
      this.error=true
      this.loader=false
      this.message='Please write something in blog.'
      return false;

    }

    else if(keyword==''){
      this.error=true
      this.loader=false
      this.message='Please write some keywords in blog.'
      return false;

    }

    else{

      var data ={
      "title":blogTitle,
      "subtitle":blogSubtitle,
      "content":content,
      "status":"Active",
       "image":this.simg.name,
      "description":description,
      "keywords":keyword,
      "slug":value1
    }

       this.master.methodPost(data,'/addBlog').subscribe((response:any)=>{

          console.log(response['id']);
          let imgData = new FormData()
          imgData.append("file",this.simg)
         this.master.methodPostMulti(imgData,`/uploadBlogPic?blogId=${response.id}`).subscribe((res)=>{
          if(this.urlDt != '../..//assets/images/placeholder.png' && this.urlDt!='' ){
            this.loader = false;
          this.message='Blog Added seuucess fully.';
              this.router.navigate(['/dashboard/allblogs']);
          }
          else{
            this.uploadBlogImage(response['id']);
          }
         })

          
        

       });

    }
    

  }







  uploadBlogImage(id){
    
    var formData = new FormData();
    formData.append('file', this.simg);


    console.log(this.simg);
    this.master.methodPostMulti(formData, '/uploadBlogPic?blogId='+id).subscribe(res=>{
console.log(res);
       this.router.navigate(['/dashboard/allblogs']);

       this.toaster.success('Blog Added successfully.');
    });
  }

}
