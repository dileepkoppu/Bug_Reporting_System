import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  } from "@angular/forms";
// import { ProjectComponent } from './project.component';

import { ProjectListComponent } from "../project/project-list/project-list.component";
import { ProjectcreateComponent } from "../project/projectcreate/projectcreate.component";
import { ProjectdetailsComponent } from "../project/projectdetails/projectdetails.component";
import { ProjectupdateComponent } from "../project/projectupdate/projectupdate.component";

import { AuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
  { path: '', 
  children:[
    {path:"",component:ProjectListComponent,canActivate:[AuthGuard]},
    {path:"project-create",component:ProjectcreateComponent},
    {path:":id/details",component:ProjectdetailsComponent},
    {path:":id/update",component:ProjectupdateComponent}
  ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
