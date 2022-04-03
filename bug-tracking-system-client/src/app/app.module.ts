import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { DetailsOfEmployeeComponent } from './components/details-of-employee/details-of-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { BugreportListComponent } from './components/bugreport-list/bugreport-list.component';
import { CreateBugreportComponent } from './components/create-bugreport/create-bugreport.component';
import { DetailsOfBugreportComponent } from './components/details-of-bugreport/details-of-bugreport.component';
import { UpdateBugreportComponent } from './components/update-bugreport/update-bugreport.component';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ConformationResetpasswordComponent } from './components/conformation-resetpassword/conformation-resetpassword.component';
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";


import { alertmessageModule } from "./components/alert-message/alert-message.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    DetailsOfEmployeeComponent,
    UpdateEmployeeComponent,
    BugreportListComponent,
    CreateBugreportComponent,
    DetailsOfBugreportComponent,
    UpdateBugreportComponent,
    LoginComponent,
    ResetpasswordComponent,
    ConformationResetpasswordComponent,
    // AlertMessageComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    alertmessageModule
  ],

  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
