import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import {ForgotpasswordComponent} from './components/forgotpassword/forgotpassword.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { AuthguardService } from './service/authguard.service';

const routes: Routes = [
  {
    path : '',
    component: LoginComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'resetpassword/'+ localStorage.getItem("token"),
    component:ResetpasswordComponent 
  },
  {
    path:'forgotpassword',
    component:ForgotpasswordComponent 
  },
  {
    path:'dashboard',
    component:DashboardComponent,canActivate:[AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }