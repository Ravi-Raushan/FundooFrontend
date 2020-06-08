import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  url: string;
  constructor(public http: HttpClient) { }
  apiBaseurl = environment.baseUrl;
  
  postUser(user, url) {
    var httpOptions = {
      headers: new HttpHeaders({  "Content-Type": "application/json"  })
    };
    // set header in your http request
    return this.http.post(this.apiBaseurl + url, user, httpOptions);
  }
  postUrl(url){
    var httpOptions = {
      headers: new HttpHeaders({  "Content-Type": "application/json" })
    };
    return this.http.post(this.apiBaseurl + url, httpOptions);
  }
  resetpassword(data,url) {
    let headers = new HttpHeaders({
      "content-Type": "application/json", //shows the type of content
      token: localStorage.getItem("token") //grabbing the token from localstorage
    });
    console.log("token",headers);
    // set header in your http request
    return this.http.put(this.apiBaseurl+url, data, {
      headers: headers
    });
  }

  put(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
       // "Content-Type": "multipart/form-data"
      })
    };
    return this.http.post(url, body, httpOptions);
  }
  putUser(url: string ): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "application/json"
        //token: localStorage.getItem("token")
      })
    };
    return this.http.put(url, httpOptions);
  }
  getHttp(url) {
    const httpTocken = {
      headers: new HttpHeaders({
        "content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.get(this.apiBaseurl + url, httpTocken);
  }

}