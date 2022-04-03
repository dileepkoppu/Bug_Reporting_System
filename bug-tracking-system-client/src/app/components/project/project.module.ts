import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectcreateComponent } from './projectcreate/projectcreate.component';
import { ProjectupdateComponent } from './projectupdate/projectupdate.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';

// import { AppModule } from "../../app.module";
import { alertmessageModule } from "../alert-message/alert-message.module";


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectListComponent,
    ProjectcreateComponent,
    ProjectupdateComponent,
    ProjectdetailsComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    alertmessageModule
    ]
})
export class ProjectModule { }
