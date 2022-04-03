import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ResetpasswordComponent } from "./components/resetpassword/resetpassword.component";
import { ConformationResetpasswordComponent } from "./components/conformation-resetpassword/conformation-resetpassword.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { CreateEmployeeComponent } from "./components/create-employee/create-employee.component";
import { DetailsOfEmployeeComponent } from "./components/details-of-employee/details-of-employee.component";
import { UpdateEmployeeComponent } from "./components/update-employee/update-employee.component";
import { BugreportListComponent } from "./components/bugreport-list/bugreport-list.component";
import { CreateBugreportComponent } from "./components/create-bugreport/create-bugreport.component";
import { DetailsOfBugreportComponent } from "./components/details-of-bugreport/details-of-bugreport.component";
import { UpdateBugreportComponent } from "./components/update-bugreport/update-bugreport.component";
import { AuthGuard } from "./guards/auth.guard";
import { CheckGuard } from "./guards/check.guard";


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"resetpassword",component:ResetpasswordComponent,canLoad:[CheckGuard]},
  {path:"resetpassword/:authToken/:id",component:ConformationResetpasswordComponent},
  {path:"employees-list",component:EmployeeListComponent,canActivate:[AuthGuard]},
  {path:"employee-create",component:CreateEmployeeComponent},
  {path:"employee-detail/:id",component:DetailsOfEmployeeComponent},
  {path:"employee-detail/:id/update",component:UpdateEmployeeComponent},
  {path:"bugreport-list",component:BugreportListComponent},
  {path:"bugreport-create",component:CreateBugreportComponent},
  {path:"bugreport-detail/:id",component:DetailsOfBugreportComponent},
  {path:"bugreport-detail/:id/update",component:UpdateBugreportComponent},
  { path: 'project', loadChildren: () => import('./components/project/project.module').then(m => m.ProjectModule) },
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
