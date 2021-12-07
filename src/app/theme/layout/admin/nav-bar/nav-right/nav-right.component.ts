import {Component, DoCheck, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import {DattaConfig} from '../../../../../app-config';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('100ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('100ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public dattaConfig: any;
  userData:any;

  constructor(config: NgbDropdownConfig, private authservice:AuthService) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.dattaConfig = DattaConfig.config;
    this.userData = [];
    // this.getCurrentUserData();
  }

  ngOnInit() {
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('datta-rtl')) {
      this.dattaConfig['rtl-layout'] = true;
    } else {
      this.dattaConfig['rtl-layout'] = false;
    }
  }


  // getCurrentUserData(){

    // var userID = localStorage.getItem('userID');

    // if(userID!=''){

    //   this.authservice.getUserDetails(userID).subscribe(response=>{
      

    //       if(response){

          
    //     this.userData = JSON.parse(JSON.stringify(response));
    //     console.log(this.userData);

    //       }
    //       else{
    //         localStorage.removeItem('userID');
    //         location.reload();
    //       }

    //   });

    // }


  // }


  logoutUser(){
    if(confirm("Are you sure want to logout?")){
      localStorage.removeItem('userID');
      window.location.reload();
    }
    else{
      return false;

    }
  }
}
