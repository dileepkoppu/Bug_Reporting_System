import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { BugreportService } from "../../services/bugreport.service";
import { EmployeeService } from "../../services/employee.service";
import { AuthService } from "../../services/auth.service";
import { ProjectService } from "../../services/project.service";

@Component({
  selector: 'app-create-bugreport',
  templateUrl: './create-bugreport.component.html',
  styleUrls: ['./create-bugreport.component.css']
})
export class CreateBugreportComponent implements OnInit {
  isTester!:boolean
  developerlist!:{username:string}[]
  testerlist!:{username:string}[]
  projectlist!:{projectName:string}[]

  createBugreportForm = new FormGroup({
    title:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    developerName: new FormControl('',Validators.required),
    testerName: new FormControl(''),
    projectName: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    priority: new FormControl('',Validators.required),
    details : new FormControl('',Validators.required)
  })
  alert :boolean =false
  success :boolean =false
  message : string =''
  constructor(
    private bugreportService:BugreportService,
    private router:Router,
    private empService:EmployeeService,
    private auth :AuthService,
    private projService:ProjectService
    ) { }

  ngOnInit(): void {
    this.auth.behaviorRole.subscribe(
      value=>this.isTester=value==="tester"
    )
    this.empService.developersUsernameList()
                        .subscribe((data)=>{
                          this.developerlist=data.data
                        },
                        (error)=>{
                          this.router.navigate(['bugreport-list'],{state:{alert:true,success:error.error.success,message:error.error.message}})
                        }
                        )
    this.projService.projectnamelist()
                          .subscribe((data)=>{
                            this.projectlist=data.data
                          },
                          (error)=>{
                            this.router.navigate(['bugreport-list'],{state:{alert:true,success:error.error.success,message:error.error.message}}) 
                          })
   if (!this.isTester) {
    this.empService.testersUsernameList()
                    .subscribe((data)=>{
                      this.testerlist=data.data
                    },
                    (error)=>{
                      this.router.navigate(['bugreport-list'],{state:{alert:true,success:error.error.success,message:error.error.message}})
                    }
                    )
   }

  }
  createBugreport(){
    this.bugreportService.bugreportcreate(this.createBugreportForm.value)
                                  .subscribe(
                                    (data)=>{
                                      this.router.navigate(['bugreport-list'],{state:{alert:true,success:data.success,message:data.message}})
                                    },
                                    (error)=>{
                                      this.message=error.error.message
                                      this.alert=!!this.message
                                      this.success= error.error.success
                                    })
  }

  file(event:any){
    this.createBugreportForm.patchValue({details:event.target.files[0]})
  }

}