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
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  response: any;
  successMsg: string;
  failedMsg: string;
  incorrectInput: string;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public userService: UserService
  ) {}

  ngOnInit(
  ) {}
  model = {};
  hide = true;
  emailFormControl = new FormControl("", [ Validators.required, Validators.email]); 
  password = new FormControl("", [Validators.required,Validators.pattern("((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40})")]);

  //To display email error message
  getEmailErrorMessage() {
    return this.emailFormControl.hasError("required")
    ? "Email id is required"
    : this.emailFormControl.hasError("email")
      ? "Please enter a valid email id"
      : " ";
  }
  //To display password error message
  getPasswordErrorMessage() {
    return this.password.hasError("required")
    ? "Password is required"
    : this.password.hasError("pattern")
      ? "Please enter a valid password"
      : " ";
  }
validate(){
  if(this.emailFormControl.valid && this.password.valid){
  return "false";
  }
  return "true";
}
  login() {
      var reqbody = {
        email: this.emailFormControl.value,
        password: this.password.value
      };
      console.log(reqbody);

      this.userService.login(reqbody).subscribe(
        data => {
          console.log(data);
          this.response = data;
          localStorage.setItem("token", this.response.any);
          this.successMsg = "Logged in successfully!!";
          this.router.navigate(["dashboard"]);
        },
        err => {
          console.log("err", err);
         // this.snackBar.open("Login Failed", "Ok", { duration: 5000 });
          this.failedMsg = "Logged in failed!!";
        }
      );
  }
  register() {
    this.router.navigate(["register"]);
  }
  forgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }
  matcher = new MyErrorStateMatcher();
}