import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  holidayForm: FormGroup;
  holidayData: any = [];
  // startTime = new FormControl("", [Validators.required]);
  // endTime= new FormControl("", [Validators.required]);
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
  today = new Date().toJSON().split('T')[0];;



  constructor(private master: MasterService, private authservice: AuthService, private router: Router,private toaster:ToastrService) {



  }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'timeSlotName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.holidayForm = new FormGroup({
      id: new FormControl(""),
      holidayDate: new FormControl(""),
      toHolidayDate:new FormControl("")
    });

    this.getAllHolidays();
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
      if (obj['timeSlotName'] === item['timeSlotName']) {
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

  addNewHoliday() {
    
    var holidayDate = this.holidayForm.get("holidayDate").value;
    var fromHoliday=this.holidayForm.get("toHolidayDate").value;
    var action = this.checkbox;

    if (holidayDate == '') {
      this.error = true;
      this.message = 'Please enter Holiday!';

      return false;

    }
    else {

      let timeSlotsArray = [];
      Object.keys(this.selectedItems).forEach(value => {
        let objData = this.selectedItems[value]
        let saveObj = {};
        saveObj['id'] = objData['id'];
        saveObj['timeSlotName'] = objData['timeSlotName'];
        timeSlotsArray.push(saveObj);
      })
      const data = {
        "id": this.holidayForm.get("id").value,
        "holidayDate": holidayDate,
        "timeSlots": timeSlotsArray
      }
      if (!this.edit) { 
      this.master.holidayDataPost(data).subscribe(response => {
        if (response) {
          this.error = false;
          this.message = 'Holiday added successfully!';
          // setTimeout(()=>{location.reload()},1000);
          this.ngOnInit();
          return false;
        } else {
          this.error = true;
          this.message = 'Failed to add Holiday';
          return false;
        }
      }, (error => {
        this.error = true;
        this.message = 'Failed to add Holiday';
        return false;
      }));
    }else{
      debugger;
      this.master.holidayDataEdit(data).subscribe(response => {
        if (response) {
          this.error = false;
          this.message = 'Holiday Updated successfully!';
          this.edit=false;
          this.selectedItems = [];
          this.ngOnInit();
          return false;
        } else {
          this.error = true;
          this.message = 'Failed to add Holiday';
          return false;
        }
      }, (error => {
        this.error = true;
        this.message = 'Failed to add Holiday';
        return false;
      }));
    }

    }


  }




  getAllHolidays() {
    this.loader=true
    this.master.holidayGetData().subscribe(data => {

      this.holidayData = JSON.parse(JSON.stringify(data));
      setTimeout(function(){
        $('#example').DataTable();
       }, 1000);
       this.loader=false

    });
  }

  getAllTimeSlots(slots? : any) {
    this.master.timeslotGetData().subscribe(data => {
      let dayArray = [];
   
      Object.keys(data).forEach(value => {
        let objData = data[value]
        let saveObj = {};
        saveObj['id'] = objData['id'];
        saveObj['timeSlotName'] = objData['timeSlotName'];
        dayArray.push(saveObj);
      })
      this.dropdownList = dayArray;
      if(slots)
      {
        this.selectedItems = slots['timeSlots'];
      }
    });
  }

  editHoliday(id: any) {
    this.edit = true;
    this.loader=true;
    this.master.holidayGetDetailData(id).subscribe(data => {
      this.holidayForm.patchValue(data);
      this.loader=false;
      this.getAllTimeSlots(data);
    });


  }



  OnCancel(){
    this.edit=false;
    this.holidayForm = new FormGroup({
      id: new FormControl(""),
      holidayDate: new FormControl("")
    });

  }

  onDelete(id){
    if(confirm("Are sure you want to delete this record")){
      this.master.deleteMethod("/deleteHoliday/"+id).subscribe(data=>{
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
