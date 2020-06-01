import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { UserService } from "../../service/userservice.service";
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.scss"]
})

export class ForgotpasswordComponent implements OnInit {
 // email: string;
  errorMsg: string;
  response: any;
  constructor(private router: Router, private userService: UserService) {}
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
 // password = new FormControl("", [Validators.required]);
  ngOnInit() {}
  model = {};
  hide = true;
 
 matcher = new MyErrorStateMatcher();

  forgotpassword() {
    var reqbody = {
    email: this.emailFormControl.value
    };
    console.log(reqbody);
    this.userService.forgotpassword(reqbody).subscribe(
      data => {
        console.log("token",data);
        this.response = data;
        localStorage.setItem("token", this.response);
        this.errorMsg = "A link is send to your email id!";
      },
      err => {
        console.log(err);
        this.errorMsg = "Failed to send link!";  
      });
  }
  login() {
    this.router.navigate(["login"]);
  }
}
