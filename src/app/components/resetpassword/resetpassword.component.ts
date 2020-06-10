import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../service/userservice.service";

@Component({
  selector: "app-resetpassword",
  templateUrl: "./resetpassword.component.html",
  styleUrls: ["./resetpassword.component.scss"]
})

export class ResetpasswordComponent implements OnInit {
  errorMsg: string;
  toggle: boolean;
  constructor(private router: Router,private userService: UserService) {}

  ngOnInit() {}
  model = {};
  hide = true;
  password = new FormControl("", [Validators.required,Validators.pattern("((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40})")]);
  confirmPassword = new FormControl("", [Validators.required]);
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
    if(this.password.valid && this.confirmPassword.valid){
      this.toggle = false;
    return "false";
    }
    this.toggle = true;
    return "true";
  }

  submit(){
    var reqbody = {
      password: this.password.value,
    };   
    this.userService.resetpassword(reqbody).subscribe(
      data => {
        console.log(data);
        localStorage.removeItem("token");
        this.router.navigate(["login"]);
      },
      err => {
        console.log(err);
        this.errorMsg = "Password Reset Failed!!";  
      });
  }
  loginTo() {
    this.router.navigate(["login"]);
  }
}
