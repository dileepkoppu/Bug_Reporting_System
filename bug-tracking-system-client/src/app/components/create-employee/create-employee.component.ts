import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { EmployeeService } from "../../services/employee.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  createEmployeeForm=new FormGroup({
    username:new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    role_ids: new FormControl('',Validators.required),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    mobile: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    conformPassword: new FormControl('',Validators.required),
    parent_name: new FormControl('',Validators.required),
    parent_contact_no: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    pincode: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    is_active: new FormControl('',Validators.required),
    aadhar_number: new FormControl('',Validators.required),
  })
  role!:boolean
  alert :boolean =false
  success :boolean =false
  message : string =''

  constructor(
    private empServeice:EmployeeService,
    private router:Router,
    private auth :AuthService
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
  onsubmit(){
    const formdata=new FormData()
    this.empServeice.employeecreate(this.createEmployeeForm.value)
                                          .subscribe(
                                            (data)=>{
                                              this.router.navigate(['employees-list'],{state:{alert:true,success:data.success,message:data.message}})
                                            },
                                            (error)=>{
                                              this.message=error.error.message
                                              this.alert=!!this.message
                                              this.success= error.error.success
                                            })
  }

}
