import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ProjectService } from "../../../services/project.service";

interface projectinterface{
  _id:string,
  id:string,
  projectName:string,
  clientName:string,
  repoLink:string,
  status:string
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects:projectinterface[]=[]
  alert :boolean =false
  success :boolean =false
  message : string =''

  constructor(private projservice:ProjectService,private router:Router) { 
    this.alert=this.router.getCurrentNavigation()?.extras.state?.alert
    this.success=this.router.getCurrentNavigation()?.extras.state?.success
    this.message=this.router.getCurrentNavigation()?.extras.state?.message
  }

  ngOnInit(): void {
      this.projservice.projectlist()
                                .subscribe((data)=>{
                                  this.projects=data.data
                                },
                                (error)=>{
                                  this.router.navigate([''],{state:{alert:true,success:error.error.success,message:error.error.message}})
                                })
  }

}
