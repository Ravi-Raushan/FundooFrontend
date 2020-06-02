import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../service/userservice.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from "@angular/material/core";

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
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  errorMsg: string;
  passwordMsg: string;
  myPatt: string;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public userService: UserService
  ) {}

  ngOnInit() {
  }

  model = {};
  hide = true;
  firstname = new FormControl("", [Validators.required,Validators.pattern("^[A-Z][a-z]{2,}$")]);
  lastname = new FormControl("", [Validators.required,Validators.pattern("^[A-Z][a-z]{2,}$")]);
  mobileFormControl = new FormControl("", [Validators.required,Validators.pattern("^[1-9][0-9]{9}$")]);
  emailFormControl = new FormControl("", [ Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required,Validators.pattern("((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40})")]);
  confirmPassword = new FormControl("", [Validators.required]);
  
  //To display firstname error message.
  getFirstnameErrorMessage() {
    return this.firstname.hasError("required")
    ? "First name is required"
    : this.firstname.hasError("pattern")
      ? "Please enter a valid first name"
      : " ";
  }
  //To display lastname error message.
  getLastnameErrorMessage() {
    return this.lastname.hasError("required")
    ? "Last name is required"
    : this.lastname.hasError("pattern")
      ? "Please enter a valid last name"
      : " ";
  }
//To display mobile error message
getMobileErrorMessage() {
  return this.mobileFormControl.hasError("required")
  ? "Mobile number is required"
  : this.mobileFormControl.hasError("pattern")
    ? "Please enter a valid mobile number"
    : " ";
}
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
  //To display confirmPassword error message.
  getConfirmPasswordErrorMessage() {
    return this.confirmPassword.hasError("required")
    ? "Confirm password is required"
      : " ";
  }
  validate(){
    if(this.emailFormControl.valid && this.password.valid && this.firstname.valid && this.lastname.valid &&
       this.mobileFormControl.valid && this.confirmPassword.valid){
    return "false";
    }
    return "true";
  }

  register() {
    var reqbody = {
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      mobileNumber: this.mobileFormControl.value,
      email: this.emailFormControl.value,
      password: this.password.value,
    };
   
    this.userService.register(reqbody).subscribe(
      data => {
        console.log(data);
        this.router.navigate(["login"]);
      },
      err => {
        console.log(err);
        this.errorMsg = "Registeration Failed!!";  
      });
  }
  login() {
    this.router.navigate(["login"]);
  }
  matcher = new MyErrorStateMatcher();
}