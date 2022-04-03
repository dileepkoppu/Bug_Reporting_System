import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { BugreportService } from "../../services/bugreport.service";
import { EmployeeService } from "../../services/employee.service";
import { AuthService } from "../../services/auth.service";
import { ProjectService } from "../../services/project.service";




@Component({
  selector: 'app-update-bugreport',
  templateUrl: './update-bugreport.component.html',
  styleUrls: ['./update-bugreport.component.css']
})
export class UpdateBugreportComponent implements OnInit {
  role!:string|null
  developerlist!:{username:string}[]
  testerlist!:{username:string}[]
  alert :boolean =false
  success :boolean =false
  message : string =''

  updateBugreportForm= new FormGroup({
    title:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    developerName: new FormControl('',Validators.required),
    projectName: new FormControl('',Validators.required),
    testerName: new FormControl(''),
    status: new FormControl('',Validators.required),
    priority: new FormControl('',Validators.required),
  })
  constructor(
    private bugreportService:BugreportService,
    private router:Router,
    private empService:EmployeeService,
    private auth :AuthService,
    private activatedRoute:ActivatedRoute,
    private projService:ProjectService
  ) { }

  ngOnInit(): void {
    this.auth.behaviorRole.subscribe(
      (value)=>{
        this.role=value
      })
    if (this.role==="superuser"||this.role==="admin") {
      this.empService.testersUsernameList()
                        .subscribe((data)=>{
                          this.testerlist=data.data
                        },
                        (error)=>{
                          this.router.navigate([''],{state:{alert:true,success:error.error.success,message:error.error.message}})
                        }
                        )
    }
    if (this.role!=="developer") {
      this.empService.developersUsernameList()
                                  .subscribe((data)=>{
                                    this.developerlist=data.data
                                  },
                                  (error)=>{
                                    this.router.navigate([''],{state:{alert:true,success:error.error.success,message:error.error.message}})
                                  }
                                  )
    }

    let id = this.activatedRoute.snapshot.params.id
    this.bugreportService.bugreportdetails(id)
                            .subscribe((data)=>{
                              this.updateBugreportForm.patchValue(data.data)
                            },
                            (error)=>{
                              this.router.navigate([''],{state:{alert:true,success:error.error.success,message:error.error.message}})
                            }
                            )
  }
  updateBugreport(){
    this.bugreportService.bugreportupdate(this.activatedRoute.snapshot.params.id,this.updateBugreportForm.value)
                                              .subscribe((data)=>{
                                                this.router.navigate(['bugreport-list'],{state:{alert:true,success:data.success,message:data.message}})
                                              },
                                              (error)=>{
                                                console.warn(error);
                                                this.router.navigate(['bugreport-list'],{state:{alert:true,success:error.success,message:error.message}})
                                              }
                                              )
  }

}
