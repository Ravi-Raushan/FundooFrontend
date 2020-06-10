import { Injectable } from "@angular/core";
import { HttpService } from "../service/http.service";
import { environment } from "./../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private service: HttpService) { }

  login(body: any) {
    return this.service.postUser(body, environment.loginPath);
  }
  register(body: any) {
    return this.service.postUser(body, environment.registrationPath);
  }
  forgotpassword(email: string) {
    return this.service.postUrl(environment.forgotPasswordPath+email);
  }
  resetpassword(body: any) {
    return this.service.resetpassword(body, environment.resetPasswordPath);
  }
  profilePic(body: any) {
    return this.service.upload(environment.profilePicPath, body);
  }
}