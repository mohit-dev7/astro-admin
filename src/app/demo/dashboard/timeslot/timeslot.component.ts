import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.scss']
})
export class TimeslotComponent implements OnInit {

  timeslotForm: FormGroup;
  timeslotData: any = [];
  startTime = new FormControl("", [Validators.required]);
  endTime = new FormControl("", [Validators.required]);
  data: any
  checkbox: any = 'DEACTIVATE';
  isCheck: boolean = false;
  message: any = '';
  error: boolean = false;
  edit: boolean = false;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  loader:boolean=false;
  formTitle:any="Add Timeslot";
  ifUpdate:boolean=false;
  ischecked:boolean
  singleData:any

  constructor(private master: MasterService, private authservice: AuthService, private router: Router,private toaster:ToastrService) {



  }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'day',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.timeslotForm = new FormGroup({
      id: new FormControl(""),
      startTime: new FormControl(""),
      endTime: new FormControl("")
    });
    this.getAllDays();
    this.getAllTimeSlots();


  }
  onItemSelect(item: any) {

    console.log(item);
    this.selectedItems.push(item);
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems.push(items);
  }
  onItemDeSelect(item: any) {
    console.log(item);
    Object.keys(this.selectedItems).forEach(key => {
      let obj = this.selectedItems[key];
      let index = this.selectedItems.indexOf(obj);
      if (obj['day'] === item['day']) {
        this.selectedItems.splice(index, 1);
      }
    })
  }

 

  checkCheckBoxvalue(event) {

    if (this.isCheck == false) {
      this.isCheck = true;
      this.checkbox = "ACTIVE"
    } else {
      this.isCheck = false;
      this.checkbox = "INACTIVE"
    }

  }

  addNewTimeslot() {
    
    var id = this.timeslotForm.get("id").value;
    var startTime = this.timeslotForm.get("startTime").value;
    var endTime = this.timeslotForm.get("endTime").value;
    var action = this.checkbox;


    if (startTime == '') {
      this.error = true;
      this.message = 'Please enter start time!';

      return false;

    }

    else if (endTime == '') {
      this.error = true;
      this.message = 'Please enter end time!';
      return false;

    }
    else {

      let daysArray = [];
      Object.keys(this.selectedItems).forEach(value => {
        let objData = this.selectedItems[value]
        let saveObj = {};
        saveObj['id'] = objData['id'];
        saveObj['day'] = objData['day'];
        daysArray.push(saveObj);
      })

      const data = {
        "id": id,
        "startTime": startTime,
        "endTime": endTime,
        "timeSlotName": startTime + " - " + endTime,
        "status": action,
        "days": daysArray
      }
      if (!this.edit) {
        this.master.timeslotDataPost(data).subscribe(response => {

          // if(response['name']!='')
          // {
          if (response) {
            this.error = false;
            this.message = 'Time Slot added successfully!';
            // setTimeout(()=>{location.reload()},1000);
            this.ngOnInit();
            return false;
          } else {
            this.error = true;
            this.message = 'Failed to add time slot';
            return false;
          }






        }, (error => {
          this.error = true;
          this.message = 'Failed to add new time slot!';
          return false;
        }));
      }
      else {
        this.master.timeslotDataPost(data).subscribe(response => {

          // if(response['name']!='')
          // {
          if (response) {
            this.error = false;
            this.message = 'Time Slot Updated successfully!';
            this.edit = false;
          
            // setTimeout(()=>{location.reload()},1000);
            this.ngOnInit();
            return false;
          } else {
            this.error = true;
            this.message = 'Failed to add time slot';
            return false;
          }
        });
      }
    }

  }




  getAllTimeSlots() {
    this.loader=true
    this.master.timeslotGetData().subscribe(data => {

      this.timeslotData = JSON.parse(JSON.stringify(data));
      setTimeout(function(){
        $('#example').DataTable();
       }, 1000);
       this.loader=false
       console.log(this.timeslotData)
    });
    

    // this.getAllDays();
  }


  getAllDays(valueData?: any) {
    this.master.daysData().subscribe(data => {
      let dayArray = [];
      
      Object.keys(data).forEach(value => {
        let objData = data[value]
        let saveObj = {};
        saveObj['id'] = objData['id'];
        saveObj['day'] = objData['day'];
        dayArray.push(saveObj);
      })
      this.dropdownList = dayArray;
      if (valueData) {
        this.selectedItems = valueData['days'];
      }
      // this.dropdownList = [
      //   { item_id: 1, item_text: 'Mumbai' },
      //   { item_id: 2, item_text: 'Bangaluru' },
      //   { item_id: 3, item_text: 'Pune' },
      //   { item_id: 4, item_text: 'Navsari' },
      //   { item_id: 5, item_text: 'New Delhi' }
      // ];
      // this.selectedItems = [
      //   { item_id: 3, item_text: 'Pune' },
      //   { item_id: 4, item_text: 'Navsari' }
      // ];
    });
  }

  editTimeSlot(id: any) {
    this.loader =true;
   
    this.edit = true;
    this.master.timeSlotGetDetailData(id).subscribe(data => {
      this.singleData=JSON.parse(JSON.stringify(data))
      this.loader =false;
      this.formTitle="Update";
      this.ifUpdate=true;
      this.timeslotForm.patchValue(data);
      if(this.singleData.status=="ACTIVE"){
        this.ischecked=true;
      }
      this.getAllDays(data);
      this.getAllTimeSlots();

      var id = this.timeslotForm.get("id").value;
      var startTime = this.timeslotForm.get("startTime").value;
      var endTime = this.timeslotForm.get("endTime").value;
      var action = this.checkbox;
      let daysArray = [];

      Object.keys(this.selectedItems).forEach(value => {
        let objData = this.selectedItems[value]
        let saveObj = {};
        saveObj['id'] = objData['id'];
        saveObj['day'] = objData['day'];
        daysArray.push(saveObj);
      })

      const data1 = {
        "id": id,
        "startTime": startTime,
        "endTime": endTime,
        "timeSlotName": startTime + " - " + endTime,
        "status": action,
        "days": daysArray
      }
      


    });


  }


  onCancel(){
    this.edit=false;
    this.ischecked=false;
    this.formTitle="Add TimeSlot";
    this.timeslotForm=new FormGroup({
      startTime : new FormControl("", [Validators.required]),
      endTime : new FormControl("", [Validators.required])
    })
 


  }
  onDelete(id){
    if(confirm("Are sure you want to delete this record")){
      this.master.deleteMethod("/deleteTimeslot/"+id).subscribe(data=>{
        if(data['name']!='')
        { 
          this.toaster.success("Record deleted successfully.");
          location.reload();
    
        }else{
          this.error = true;
          this.message = 'Failed to delete record!';
          return false;
        }
      },(error=>{
        this.toaster.error("failed to delete data something wrong please check carefully ")
      }))
    }
  
  }





}
