import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/service/userservice.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: UserService;
  //let httpService: HttpService
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,ReactiveFormsModule,HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = new UserService(null);
   // httpService = new HttpService(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
 /* it('when we register should return succes message', () => {
    const data: any = {
      "status": "ok",
      "message": "Registration Successful",
      "result": "1"
    };
    var reqbody = {
      firstName: component.firstname.value,
      lastName: component.lastname.value,
      mobileNumber: component.mobileFormControl.value,
      email: component.emailFormControl.value,
      password: component.password.value,
    };
    spyOn(service, 'register').and.callFake(() => {
      return  data;
    });

    component.register();

    // Assert - Check and report whether the test is pass or fail
    expect(component.userService.register(reqbody)).toEqual(data);
  });*/

  //** Initial value testing for fields **
  it('Initial value of first name should empty', () => {
    expect(component.firstname.value).toEqual('');
  });
  it('Initial value of last name should empty', () => {
    expect(component.lastname.value).toEqual('');
  });
  it('Initial value of mobile number should empty', () => {
    expect(component.mobileFormControl.value).toEqual('');
  });
  it('Initial value of email id should empty', () => {
    expect(component.emailFormControl.value).toEqual('');
  });
  it('Initial value of password should empty', () => {
    expect(component.password.value).toEqual('');
  });
  it('Initial value of confirm password should empty', () => {
    expect(component.confirmPassword.value).toEqual('');
  });

  //** Null value testing for fields **
  it('first name should not null', () => {
    component.firstname.setValue(null);
    expect(component.getFirstnameErrorMessage()).toEqual("First name is required");
  });
  it('last name should not null', () => {
    component.lastname.setValue(null);
    expect(component.getLastnameErrorMessage()).toEqual("Last name is required");
  });
  it('mobile number should not null', () => {
    component.mobileFormControl.setValue(null);
    expect(component.getMobileErrorMessage()).toEqual("Mobile number is required");
  });
  it('email id should not null', () => {
    component.emailFormControl.setValue(null);
    expect(component.getEmailErrorMessage()).toEqual("Email id is required");
  });
  it('password should not null', () => {
    component.password.setValue(null);
    expect(component.getPasswordErrorMessage()).toEqual("Password is required");
  });
  it('confirm password should not null', () => {
    component.confirmPassword.setValue(null);
    expect(component.getConfirmPasswordErrorMessage()).toEqual("Confirm password is required");
  });

 //** Invalid value testing for fields **
  it('first name Should be valid', () => {
    component.firstname.setValue("ravi");
    expect(component.getFirstnameErrorMessage()).toEqual("Please enter a valid first name");
  });
  it('last name should be valid', () => {
    component.lastname.setValue("xy");
    expect(component.getLastnameErrorMessage()).toEqual("Please enter a valid last name");
  });
  it('mobile number should be valid', () => {
    component.mobileFormControl.setValue("854291");
    expect(component.getMobileErrorMessage()).toEqual("Please enter a valid mobile number");
  });
  it('email should be valid', () => {
    component.emailFormControl.setValue("xy.com");
    expect(component.getEmailErrorMessage()).toEqual("Please enter a valid email id");
  });
  it('password should be valid', () => {
    component.password.setValue("xy");
    expect(component.getPasswordErrorMessage()).toEqual("Please enter a valid password");
  });

});
import { from, Observable } from 'rxjs';
