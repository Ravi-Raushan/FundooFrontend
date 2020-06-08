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
  msg: string;
  response: any;
  toggle: boolean;
  constructor(private router: Router, private userService: UserService) {}
  emailFormControl = new FormControl("", [ Validators.required, Validators.email]); 
  ngOnInit() {}
  model = {};
  hide = true;

    //To display email error message
  getEmailErrorMessage() {
    return this.emailFormControl.hasError("required")
    ? "Email id is required"
    : this.emailFormControl.hasError("email")
      ? "Please enter a valid email id"
      : " ";
  }
  validate(){
    if(this.emailFormControl.valid){
      this.toggle = false;
      return "false";
    }
    this.toggle = true;
    return "true";
  }
  forgotpassword() {
    let email = this.emailFormControl.value
    console.log(email);
    this.userService.forgotpassword(email).subscribe(
      data => {
        console.log(data);
        this.response = data;
        localStorage.setItem("token", this.response.result);
        this.msg = "A link is send to your email id!";
      },
      err => {
        console.log(err);
        this.msg = "Failed to send link!";  
      });
  }
  login() {
    this.router.navigate(["login"]);
  }
  matcher = new MyErrorStateMatcher();
}
