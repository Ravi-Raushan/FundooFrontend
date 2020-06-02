import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { environment } from "../../../environments/environment";
// import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: "root"
})
export class HttpService {
  url: string;
 // public currentUser: Observable<>;
  constructor(public http: HttpClient) { }
  apiBaseurl = "http://localhost:8081";

  postUser(user, url) {
    var httpOptions = {
      headers: new HttpHeaders({
        //creat HTTP headers which allow the client and the server to pass additional information with the request or the response.
        "Content-Type": "application/json"
      })
    };
    // set header in your http request
    return this.http.post(this.apiBaseurl + url, user, httpOptions);
  }
  loginUser(user, url): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        //creat HTTP headers which allow the client and the server to pass additional information with the request or the response.
        "Content-Type": "application/json"
      })
    };
    // set header in your http request
    return this.http.post(this.apiBaseurl + url, user, httpOptions).pipe(
      map(response =>{
        if(response){
        localStorage.setItem('currentUser',JSON.stringify(response));
       // this.currentUserSubject.next(response);
        }
        return response;
      })
    );
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

  postJSON(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.post(url, body, httpOptions);
  }
  put(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.put(url, body, httpOptions);
  }
  putUser(url: string ): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
         "Content-Type": "application/json"
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
  getHttpLabel(url) {
    const httpTocken = {
      headers: new HttpHeaders({
        "content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.get(this.apiBaseurl + url, httpTocken);
  }
  postJSONLabel(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.post(url, body, httpOptions);
  }
}