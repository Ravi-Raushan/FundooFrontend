
import {
    Component,
    OnInit,
    Inject,
  } from "@angular/core";
  import { MediaMatcher } from "@angular/cdk/layout";
  import { MatDialog, } from "@angular/material";
  import { ChangeDetectorRef, OnDestroy } from "@angular/core";
  import { Router } from "@angular/router";
  import { MatSnackBar } from "@angular/material";
  import { DOCUMENT } from '@angular/common';
  import { UserService } from "../../service/userservice.service";
  import { DataserviceService } from 'src/app/service/dataservice.service';
  
  @Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
  })
  export class DashboardComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;
    message: string = "Fundoo";
    Search: string;
    labelList: any;
    email: any;
    username: string;
    response: any;
    msg: string;
    imgFile: File;
    labelsList: any
    img = localStorage.getItem(localStorage.getItem('email'));
    private _mobileQueryListener: () => void;
  
    constructor(
      @Inject(DOCUMENT) private document: any,
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      private router: Router,
      public dialog: MatDialog,
      private snackBar: MatSnackBar,
      private userService: UserService,
      private data: DataserviceService
    ) {
      this.mobileQuery = media.matchMedia("(max-width: 600px)");
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      this.email = localStorage.getItem('email');
      this.username = localStorage.getItem('name');
    }
  
    ngOnInit() {
      this.islist = true;
      this.isClicked = false;
    }
    islist;
    isClicked;
    changeview() {
      if (this.islist) {
        this.islist = false;
        console.log("list", this.islist);
        this.isClicked = true;
      }
  
      else {
  
        this.isClicked = false;
        console.log("grid", this.isClicked);
        this.islist = true;
      }
    }
  
    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  
    isclick() {
      return false;
    }
  
    refresh(): void {
      window.location.reload();
    }
    note() {
      this.message = "Fundoo"
      this.router.navigate(['dashboard/note']);
    }
    reminders() {
  
      this.message = "Reminders"
      this.router.navigate(['dashboard/reminders'])
    }
    signout() {
     // localStorage.clear();
      localStorage.removeItem("token");
      this.router.navigate(['login']);
    }
    archive() {
      this.message = "Archive"
      this.router.navigate(['dashboard/archive']);
    }
    trashBox() {
      this.message = "Trash"
      this.router.navigate(['dashboard/trash']);
    }
    startSearch() {
      this.router.navigate(['dashboard/search']);
    }
    editlabes() {
      this.router.navigate(['dashboard/labels'])
    }
    lookfor() {
      this.data.changeMessage(this.Search)
    }
  
    sidenav() {
      console.log('i am run');
    }
  
   fileUpload($event) {
      console.log("jhgdhs==>", $event);
  
      this.setProfilePic($event)
    }
   setProfilePic($event) {
       this.imgFile = $event.target.files[0];
       var formData = new FormData();
    formData.append("file", this.imgFile);
    this.userService.profilePic(formData).subscribe(
      data => {
      console.log("------------------------------", data);
      this.response = data;
      this.msg = "Uploaded";
      localStorage.setItem(localStorage.getItem('email'), this.response.result);
    },
    err => {
      this.msg = "Error Occur";

    });
    }
  
   /* openSnackBar() {
      this.snackBar.open('Signed out successfully', 'Ok', { duration: 2000 })
    }*/
    goToUrl(): void {
      this.document.location.href = 'https://www.google.com';
    }
    goToUrl1(): void {
      this.document.location.href = 'https://www.google.com/intl/en-GB/drive';
    }
    goToUrl2(): void {
      this.document.location.href = 'https://www.google.com/maps';
    }
    goToUrl3(): void {
      this.document.location.href = 'https://www.youtube.com';
    }
    goToUrl4(): void {
      this.document.location.href = 'https://www.google.com/intl/en-GB/gmail/about';
    }
    openLabel() {
      { 
    }
    }
    
    sendLable(){ }
  }
  