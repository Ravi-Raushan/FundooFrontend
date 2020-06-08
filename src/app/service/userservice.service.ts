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
  forgotpassword(email: string) {
    return this.service.postUrl("/user/forgotPassword/"+email);
  }
  resetpassword(body: any) {
    return this.service.resetpassword(body, "/user/resetPassword");
  }
  profilePic(body: any) {
     console.log("res @ user service===>",body);
    return this.service.put("/user/uploadFile", body);
  }
}