import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MasterService } from 'src/app/services/master.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.scss']
})
export class AppoinmentsComponent implements OnInit, AfterViewInit {
 
  singleData:any = [];
  name = 'Angular 4';
  urlDt:any = '../..//assets/images/placeholder.png';
  typeCunsultant:any=["Kundali/Birth Chart Consultation","Gemstone Consultation","Match Making Consultation","Vastu"]


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

  appointmentForm:any;
  
  public allAppointment:any=[];
  loader:boolean=false;

  DiffAppointment:any
  appointmentlike:string="All";
  token=localStorage.getItem('userID');
  onEdit:boolean=true;
  id:any
  message:any = '';
  error:boolean = false;
  singleUserDetail:any=[]
  dateFormat:any
  datepipe: any;
  edit:boolean=false;
  onEdit1:boolean=false
  onEdit2:boolean=true
  remedy:any
  simg: string | Blob;
  imload: boolean;
  allMediaFiles: Object;
  constructor(private http: HttpClient,private master:MasterService,private toaster:ToastrService,private datepip:DatePipe) {
    this.TokenExpired(this.token);

    this.getAllMedia()

   }




  ngOnInit(): void {
    this.appointmentForm= new FormGroup({
      newType:new FormControl(""),
      name:new FormControl(""),
      date:new FormControl("")

    });

  

  this.getAllAppointment();
  }

  TokenExpired(token){
    this.master.getMethod("/AllCountries").subscribe(data=>{
      if (data!="" && token!=""){
        return false
      }else{
        localStorage.removeItem('userID');
        location.reload();
      }
    },(error=>{
     
     this.toaster.show('Session is expired please login again!');
      localStorage.removeItem('userID');
      location.reload();

    }))

  }


  



  ngAfterViewInit(): void {

  }
  

  async getAllAppointment(){
    this.loader=true
    await this.master.getMethod("/allAppointments").subscribe(data=>{
      this.allAppointment=JSON.parse(JSON.stringify(data));
      console.log(this.allAppointment)
      for(let x of this.allAppointment){
        x.consultationType = this.typeCunsultant[Number(x.consultationType)-1]
      }
      
      this.loader=false

    })

    this.loadDataTable()
  }


  getAppointment(value){
    if (value!=""){
      this.DiffAppointment=value;
    }
  }

  
  async getDiffAppointment(){
  this.loader=true
  await this.clearDataTable()
 
  if(this.DiffAppointment=="All"){
    await this.getAllAppointment();
  }else if (this.DiffAppointment!="All"){
    this.appointmentlike=this.DiffAppointment;
    this.loader=true;
    await this.master.getMethod("/getAppointment/"+this.DiffAppointment).subscribe(data=>{
      console.log(data)
      
    this.allAppointment=JSON.parse(JSON.stringify(data));
    console.log(this.allAppointment)
    for(let x of this.allAppointment){
      x.consultationType = this.typeCunsultant[Number(x.consultationType)-1]
    }

      this.loader=false;
    });
  }

  await  this.loadDataTable()

}

editAppointment(id){

  $(window).scrollTop(0);
  
  this.onEdit=false;
  this.onEdit2=false
  this.onEdit1=true
  this.edit=false

  this.id=id
  this.master.getMethod("/getAppointmentDetail?id="+this.id).subscribe(data=>{
    this.singleUserDetail=JSON.parse(JSON.stringify(data));
    console.log(this.singleUserDetail)
    this.dateFormat=this.datepip.transform(this.singleUserDetail.appointDate, 'dd/MM/yyyy')
    console.log(this.dateFormat)
    // this.appointmentForm.patchValue({["name"]: this.singleUserDetail.name});
    this.appointmentForm=new FormGroup({
      name:new FormControl(this.singleUserDetail.name ),
      date:new FormControl(this.dateFormat ),
      newType:new FormControl("")
  
    })
  })
 

  
}

    updateStatus(){
      debugger
      this.loader=true
   var type=this.appointmentForm.get("newType").value;
    $('#userId').val(this.id);
    this.master.getMethod("/changeAppointmentStatus?id="+this.id+"&status="+type).subscribe(reponse=>{
        if(reponse['name']!='')
        {  
        

          this.error = false;
          this.message = ' status updated successfully!';
          // setTimeout(()=>{location.reload()},1000);
          this.loader=false
          this.ngOnInit();
          return false;
        
      } else{
        this.error = true;
        this.message = 'Failed to Update status please check all details!';
        this.loader=false;
        return false;
      }
    },(error=>{
  this.toaster.error("failed to Status update  something went wrong");
     }))
  }


    onCancel(){
      this.onEdit=true;
      this.onEdit2=true;
      this.onEdit1=false;
      this.edit=false

      this.message="";
  
    }
  
    editor(id, rmd){

     
      $(window).scrollTop(0);
      $('#userId').val(id)
      this.loader=true
      setTimeout(()=>{
        this.loader=false
      }, 1000)
      
      this.onEdit=false;
      this.onEdit2=false;
      this.edit=true
      this.onEdit1=false
      this.message=""
      setTimeout(()=>{
        $('#editor1 .angular-editor-textarea').html(rmd);
      },1000)
    
      


    }

    saveRemedies(){
      var id1=$("#userId").val()
   
      
      var content = $('#editor1 .angular-editor-textarea').html();

      var data = {
        "id":id1,
        "remedy":content
      };

      this.master.methodPost(data,"/addRemedyAppointment").subscribe(data=>{
        if(data['name']!='')
        {  
        

          this.error = false;
          this.message = ' Remedy addes  successfully!';
          setTimeout(()=>{location.reload()},1000);
          this.loader=false
          this.ngOnInit();
          return false;
        
      } else{
        this.error = true;
        this.message = 'Failed to add remedy please check all details!';
        this.loader=false;
        return false;
      }
    },(error=>{
      this.toaster.error("failed to add remedie  something went wrong");
     }))

      
    }

    addData(data){
      $('#example').DataTable().fnAddData(data);
    }

    loadDataTable(){
      console.log("hi")
      setTimeout(() => {
        $('#example').DataTable();
      }, 2000);
    }

    clearDataTable(){
      var table = $('#example').DataTable();
     
      table.clear()
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
