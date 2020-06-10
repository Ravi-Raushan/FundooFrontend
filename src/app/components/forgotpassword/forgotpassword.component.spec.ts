import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordComponent } from './forgotpassword.component';
import { UserService } from 'src/app/service/userservice.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

fdescribe('ForgotpasswordComponent', () => {
  let component: ForgotpasswordComponent;
  let fixture: ComponentFixture<ForgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,ReactiveFormsModule,HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [ ForgotpasswordComponent]
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initial value of email id should empty', () => {
    expect(component.emailFormControl.value).toEqual('');
  });

  it('email id should not null', () => {
    component.emailFormControl.setValue(null);
    expect(component.getEmailErrorMessage()).toEqual("Email id is required");
  });

  it('email should be valid', () => {
    component.emailFormControl.setValue("xy.com");
    expect(component.getEmailErrorMessage()).toEqual("Please enter a valid email id");
  });
});
