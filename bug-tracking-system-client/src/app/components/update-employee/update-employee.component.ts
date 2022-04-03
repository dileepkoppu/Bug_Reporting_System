import { Component, Input, OnInit, Pipe } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { Router,ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';

import { EmployeeService } from "../../services/employee.service";
import { AuthService } from "../../services/auth.service";



@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  @Input() employee!: object;
  role!:boolean
  updateEmployeeForm=new FormGroup({
    username:new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    role_ids: new FormControl('',Validators.required),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    mobile: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    parent_name: new FormControl('',Validators.required),
    parent_contact_no: new FormControl('',Validators.required),
    address: new FormGroup({
      city: new FormControl('',Validators.required),
      pincode: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
    }),
    is_active: new FormControl('',Validators.required),
    aadhar_number: new FormControl('',Validators.required),
  })
  alert :boolean =false
  success :boolean =false
  message : string =''

  constructor(
    private router:Router,
    private empServeice:EmployeeService,
    private activatedRoute:ActivatedRoute,
    private auth :AuthService
    ) { 
    this.employee=this.router.getCurrentNavigation()?.extras.state?.data
  }

  ngOnInit(): void {
    this.auth.behaviorRole.subscribe(
      value=>this.role=value==="superuser"
    )
    let id = this.activatedRoute.snapshot.params.id
    this.empServeice.employeedetails(id)
                            .subscribe((data)=>{
                              data.data.dob=new DatePipe("en-US").transform(data.data.dob, 'yyyy-MM-dd')
                              this.updateEmployeeForm.patchValue(data.data)
                            },
                            (error)=>{                              
                              this.router.navigate(['employees-list'],{state:{alert:true,success:error.error.success,message:error.error.message}})
                            }
                            )
    }
  onsubmit(){
    let id = this.activatedRoute.snapshot.params.id
    this.empServeice.employeeupdate(id,this.updateEmployeeForm.value)
                                            .subscribe((data)=>{
                                              this.router.navigate(['employees-list'],{state:{alert:true,success:data.success,message:data.message}})
                                            },
                                            (error)=>{
                                              this.message=error.error.message
                                              this.alert=!!this.message,
                                              this.success=error.error.success
                                            }
                                            )
  }

}
