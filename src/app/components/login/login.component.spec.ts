import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from 'src/app/service/userservice.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,ReactiveFormsModule,HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //** Initial value testing for fields **
  it('Initial value of email id should empty', () => {
    expect(component.emailFormControl.value).toEqual('');
  });
  it('Initial value of password should empty', () => {
    expect(component.password.value).toEqual('');
  });

  //** Null value testing for fields **
  it('email id should not null', () => {
    component.emailFormControl.setValue(null);
    expect(component.getEmailErrorMessage()).toEqual("Email id is required");
  });
  it('password should not null', () => {
    component.password.setValue(null);
    expect(component.getPasswordErrorMessage()).toEqual("Password is required");
  });

//** Invalid value testing for fields **
  it('email should be valid', () => {
    component.emailFormControl.setValue("xy.com");
    expect(component.getEmailErrorMessage()).toEqual("Please enter a valid email id");
  });
  it('password should be valid', () => {
    component.password.setValue("xy");
    expect(component.getPasswordErrorMessage()).toEqual("Please enter a valid password");
  });
});
