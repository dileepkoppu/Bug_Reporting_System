import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ProjectService } from "../../../services/project.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-projectcreate',
  templateUrl: './projectcreate.component.html',
  styleUrls: ['./projectcreate.component.css']
})
export class ProjectcreateComponent implements OnInit {
  projectcreateForm = new FormGroup({
    projectName : new FormControl('',Validators.required),
    clientName : new FormControl('',Validators.required),
    repoLink : new FormControl('',Validators.required),
    status : new FormControl('',Validators.required)
  })
  role!:boolean
  alert :boolean =false
  success :boolean =false
  message : string =''

  constructor(
    private projService:ProjectService,
    private router:Router,
    private auth:AuthService
    ) { }

  ngOnInit(): void {
    this.auth.behaviorRole.subscribe(
      value=>{
        this.role=value==="superuser"||value==="admin"
        if (value==="tester"||value==="developer") {
          this.router.navigate([''],{state:{alert:true,success:false,message:"You are not authorized to visit this route"}})
        }
      })
  }
  onSumbit(){
    this.projService.projectcreate(this.projectcreateForm.value)
                            .subscribe((data)=>{
                              this.router.navigate(['project'],{state:{alert:true,success:data.success,message:data.message}})
                            },
                            (error)=>{
                              this.message=error.error.message
                              this.alert=!!this.message
                              this.success= error.error.success
                            })
  }
}
