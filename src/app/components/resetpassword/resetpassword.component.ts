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
  selector: "app-resetpassword",
  templateUrl: "./resetpassword.component.html",
  styleUrls: ["./resetpassword.component.scss"]
})

export class ResetpasswordComponent implements OnInit {
  errorMsg: string;
  constructor(private router: Router,private userService: UserService) {}
  password = new FormControl("", [Validators.required]);
  ngOnInit() {}
  model = {};
  hide = true;

  submit(){
    var reqbody = {
      password: this.password.value,
     // confirmPassword: this.confirmPassword.value
    };   
    this.userService.resetpassword(reqbody).subscribe(
      data => {
        console.log(data);
        this.router.navigate(["login"]);
      },
      err => {
        console.log(err);
        this.errorMsg = "Password Reset Failed!!";  
      });
  }
  matcher = new MyErrorStateMatcher();
  loginTo() {
    this.router.navigate(["login"]);
  }
}
