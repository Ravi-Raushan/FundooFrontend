import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordComponent } from './resetpassword.component';
import { UserService } from 'src/app/service/userservice.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

fdescribe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,ReactiveFormsModule,HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [ ResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Initial value of password should empty', () => {
    expect(component.password.value).toEqual('');
  });
  it('Initial value of confirm password should empty', () => {
    expect(component.confirmPassword.value).toEqual('');
  });

  it('password should not null', () => {
    component.password.setValue(null);
    expect(component.getPasswordErrorMessage()).toEqual("Password is required");
  });
  it('confirm password should not null', () => {
    component.confirmPassword.setValue(null);
    expect(component.getConfirmPasswordErrorMessage()).toEqual("Confirm password is required");
  });

  it('password should be valid', () => {
    component.password.setValue("xy");
    expect(component.getPasswordErrorMessage()).toEqual("Please enter a valid password");
  });
});
