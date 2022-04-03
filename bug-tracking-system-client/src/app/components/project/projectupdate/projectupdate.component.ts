import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from "@angular/router";

import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projectupdate',
  templateUrl: './projectupdate.component.html',
  styleUrls: ['./projectupdate.component.css']
})
export class ProjectupdateComponent implements OnInit {

  projectupdateForm=new FormGroup({
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
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projService.projectdetail(this.activatedRoute.snapshot.params['id'])
                                              .subscribe((data)=>{
                                                this.projectupdateForm.patchValue(data.data)
                                              },
                                              (error)=>{
                                                this.router.navigate([''],{state:{alert:true,success:error.error.success,message:error.error.message}})
                                              })
  }
  onSumbit(){
    let id=this.activatedRoute.snapshot.params['id']    
    this.projService.projectupdate(id,this.projectupdateForm.value)
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
