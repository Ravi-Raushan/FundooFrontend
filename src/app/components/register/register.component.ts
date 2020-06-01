import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
//import { HttpService } from "../../service/http.service";
import { Router } from "@angular/router";
import { UserService } from "../../service/userservice.service";
//import { MatSnackBar } from "@angular/material";
import { ErrorStateMatcher } from "@angular/material/core";
import { throwError } from 'rxjs';

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
  constructor(
   // private service: HttpService,
   // private snackBar: MatSnackBar,
   // public matcher: MyErrorStateMatcher,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
  }

  model = {};
  hide = true;
  firstname = new FormControl("", [Validators.required]);
  lastname = new FormControl("", [Validators.required]);
  mobileFormControl = new FormControl("", [
    Validators.required,
  ]);
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  password = new FormControl("", [Validators.required]);
  confirmPassword = new FormControl("", Validators.required);
  
  //To display firstname error message.
  getFirstnameErrorMessage() {
    return this.firstname.hasError("required") ? "Enter first name" : "";
  }

  //To display lastname error message.
  getlastnameErrorMessage() {
    return this.lastname.hasError("requried") ? "Enter last name" : "";
  }
//To display mobile error message
getmobileErrorMessage() {
  return this.mobileFormControl.hasError("requried") ? "Enter mobile number" : "";
}
  //To display email error message
  getemailErrorMessage() {
    return this.emailFormControl.hasError("requried") ? "Enter email" : "";
  }

  //To display password error message
  getpasswordErrorMessage() {
    return this.password.hasError("requried") ? "Enter Password" : "";
  }

  //To display confirmPassword error message.
  getconfirmPasswordErrorMessage() {
    return this.confirmPassword.hasError("requried") ? "Enter Password" : "";
  }
  register() {
    if(this.password.value!==this.confirmPassword.value){
      this.passwordMsg = "Password Mismatch";
      }
    var reqbody = {
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      mobileNumber: this.mobileFormControl.value,
      email: this.emailFormControl.value,
      password: this.password.value,
     // confirmPassword: this.confirmPassword.value
    };
  //  confirmPassword: this.confirmPassword.value
   
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
}