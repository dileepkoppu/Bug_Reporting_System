import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";

import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: 'app-details-of-employee',
  templateUrl: './details-of-employee.component.html',
  styleUrls: ['./details-of-employee.component.css']
})
export class DetailsOfEmployeeComponent implements OnInit {
  employee!: { 
    username: string; 
    email: string; 
    role_ids: string; 
    is_active: boolean;
    _id: string; 
    mobile: string};

  constructor(
    private activatedRoute:ActivatedRoute,
    private empServeice:EmployeeService,
    private router:Router
    ) { }

  ngOnInit(): void {
      this.empServeice.employeedetails(this.activatedRoute.snapshot.params.id)
                                        .subscribe((data)=>{
                                                    this.employee=data.data
                                                  },
                                                  (error)=>{
                                                    this.router.navigate([''],{state:{alert:true,success:error.error.success,message:error.error.message}})
                                                  })    
  }

  deleteEmployee(id:string){
    this.empServeice.employeedelete(id)
                          .subscribe((data)=>{
                            this.router.navigate(['employees-list'],{state:{alert:true,success:data.success,message:data.message}})
                          },
                          (error)=>{
                            this.router.navigate(['employees-list'],{state:{alert:true,success:error.error.success,message:error.error.message}})
                          }
                          )
  }
}


