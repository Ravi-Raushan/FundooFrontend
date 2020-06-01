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
    public userService: UserService
  ) {}

  ngOnInit() {}
  model = {};
  hide = true;

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]); //Formcontrol for binding the value.
  password = new FormControl("", [Validators.required]);

  //method to show email error message

  login() {
    try {
      if (this.emailFormControl.value == "" || this.password.value == "")
        throw "fields cannot be empty";

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
          //this.successMsg = "Logged in successfully!!";
          this.router.navigate(["dashboard"]);
        },
        err => {
          console.log("err", err);
          this.failedMsg = "Logged in failed!!";
        }
      );
    } catch {
      this.incorrectInput = "Email or Password can not be empty!";
    }
  }
  register() {
    this.router.navigate(["register"]);
  }
  forgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }
  matcher = new MyErrorStateMatcher();
}