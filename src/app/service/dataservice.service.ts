import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private labelMsg=new Subject<string>();
  getLabel = this.labelMsg.asObservable();

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor() { }


  changeMessage(message: string) {
    console.log(message);

    this.messageSource.next(message)
  }

  sendLable(message:string){
    this.labelMsg.next(message);
  }

}
