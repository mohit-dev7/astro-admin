import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MasterService } from 'src/app/services/master.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs-compat/operator/first';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
userForm:FormGroup
userData:any = [];
self=this;
isForm:boolean=false;
loader:boolean=false;
singleUser:any
firstName=new FormControl("",Validators.required)
lastName=new FormControl("")
email=new FormControl("")
phone=new FormControl("")
message:any = '';
error:boolean = false;

  constructor(private http: HttpClient, private master:MasterService) { }

    ngOnInit(): void {
      this.userForm=new FormGroup({
        firstName:new FormControl(""),
        lastName:new FormControl(""),
        email:new FormControl(""),
        phone:new FormControl("")
      })
  this.getAllUSerData();
    }


    ngAfterViewInit(): void {

      $(document).ready( function () {
    


      
    } );
    }


    
    getAllUSerData(){
      this.loader=true;
    var exampleArray = [];
      this.master.getMethod('/getUsers').subscribe(data=>{


      this.userData = JSON.parse(JSON.stringify(data));
      console.log(this.userData)


      setTimeout(function(){
        $('#example').DataTable();
      }, 1000);
      this.loader=false;
    
      });

      
    }

    onUpdate(){
      var id = $('#userID').val();
      var firstName=this.userForm.get("firstName").value;
      var lastName=this.userForm.get("lastName").value;
      var email=this.userForm.get("email").value;
      var phone=this.userForm.get("phone").value;
      console.log(firstName,lastName,email,phone)
      const data={
        "aboutMe": this.singleUser.aboutMe,
        "country": this.singleUser.country,
        "dob": this.singleUser.dob,
        "email": email,
        "firstName": firstName,
        "gender": this.singleUser.gender,
        "id": id,
        "lastName": lastName,
        "phone": phone,
        "placeOfBirth": this.singleUser.placeOfBirth,
        "profilePicName": this.singleUser.profilePicName,
        "timeOfBirth": this.singleUser.timeOfBirth
        
      }
      console.log(data)
      this.master.methodPost(data,"/saveProfile?userId="+id).subscribe(reponse=>{

        if(reponse['name']!='')
        {  
        
     
          this.error = false;
          this.message = ' user updated successfully!';
          // setTimeout(()=>{location.reload()},1000);
          this.ngOnInit();
          return false;
    
        }else{
          this.error = true;
          this.message = 'Failed to update user please check all details!';
          return false;
        }
    
      },(error=>{
        alert("failed to update user something went wrong");
      }))
    
    }




    editUser(id:any){
      $(window).scrollTop(0);
      this.isForm=true;
      this.loader=true;
      this.master.getMethod("/getProfile?userId="+id).subscribe(data=>{
        this.singleUser=JSON.parse(JSON.stringify(data));
        console.log(this.singleUser)
          this.userForm=new FormGroup({
        firstName:new FormControl(this.singleUser.firstName),
        lastName:new FormControl(this.singleUser.lastName),
        email:new FormControl(this.singleUser.email),
        phone:new FormControl(this.singleUser.phone)
      })
      this.loader=false;
      $('#userID').val(id);
      });
     
      

      
    }

    onCancel(){
      this.isForm=false;
    }

    onDelete(id){
      // if(confirm("Are sure you want to delete this record")){
      //   this.master.deleteMethod("/deleteUser/"+id).subscribe(data=>{
      //     if(data['name']!='')
      //     { 
      //       alert("Record deleted successfully.");
      //       location.reload();
      
      //     }else{
      //       this.error = true;
      //       this.message = 'Failed to delete record!';
      //       return false;
      //     }
      //   },(error=>{
      //     alert("failed to delete data something wrong please check carefully ")
      //   }))
      // }
    
    }
  

}

