import { Injectable } from "@angular/core";
import { HttpService } from "../service/http.service";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private service: HttpService) { }

  login(body: any) {
    return this.service.postUser(body, "/user/login");
  }
  register(body: any) {
    return this.service.postUser(body, "/user/registration");
  }
  forgotpassword(body: any) {
    return this.service.postUser(body,"/user/forgotPassword");
  }
  resetpassword(body: any) {
    return this.service.resetpassword(body, "/user/resetPassword");
  }
  profilePic(body: any) {
    // console.log("res @ user service===>",body);
   // return this.service.put("setProfilePic", body)
  }
}