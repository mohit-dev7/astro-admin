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
  constructor(private master:MasterService, private router:Router, private route:ActivatedRoute) {

    this.blogId =  this.route.params['_value']['id'];

      this.getBlogData(this.blogId);
   }

  ngOnInit(): void {

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlDt = event.target.result;
      }
    }
  }


  getBlogData(id){

this.master.getMethod('/getBlog?id='+id).subscribe(response=>{
this.singleData = response;
$('#editor1 .angular-editor-textarea').html(response['content']);
})

  }


  postNewBlog(){
    alert('failed to update blog try again letter.')
// debugger;
//     var blogTitle = $('#blog_title').val();
//     var blogSubtitle = $('#blogSubtilte').val();
//     var blog_ftr = $('#blog_ftr').val();
// var content = $('#editor1 .angular-editor-textarea').html();

//     if(blogTitle==''){
//       alert('Please add blog title');
//       return false;

//     }

//     else if(blogSubtitle==''){
//       alert('Please add blog subtitle');
//       return false;

//     }

//     else if(content==''){
//       alert('Please write something in blog.');
//       return false;

//     }

//     else{

//       var data ={
//         "title":blogTitle,
//       "subtitle":blogSubtitle,
//       "content":content,
//       "image":"akash.jpg",
//       "status":"Active",
//       "createdAt":"2021-01-01",
//       "updatedAt":"2021-01-02"}

//        this.master.methodPost(data,'/addBlog').subscribe((response:any)=>{

//           console.log(response);
//           alert('Blog Added seuucess fully.');
//           this.router.navigate(['/dashboard/allblogs']);

//        });

//     }
    

  }

}
