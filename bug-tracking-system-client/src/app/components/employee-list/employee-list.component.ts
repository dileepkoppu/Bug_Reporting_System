import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { Router } from "@angular/router";
interface employeeinterface{id:string,username:string,email:string,role_ids:string,is_active:boolean,_id:string,mobile:string}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  Employees:employeeinterface[]|undefined=[]
  alert :boolean =false
  success :boolean =false
  message : string =''

  constructor(private empServeice:EmployeeService,private router:Router) { 
    this.alert=this.router.getCurrentNavigation()?.extras.state?.alert
    this.success=this.router.getCurrentNavigation()?.extras.state?.success
    this.message=this.router.getCurrentNavigation()?.extras.state?.message
  }

  ngOnInit(): void {
  this.employeelist()
  }
  employeelist(){
    this.empServeice.employeelist()
                                  .subscribe(
                                  (data)=>{
                                    this.Employees=data.data
                                  },
                                  (error)=>{
                                    if (error.status===423) {
                                      this.alert =true
                                      this.success =error.error.success
                                      this.message =error.error.message 
                                    } else {
                                      this.router.navigate([''],{state:{alert:true,success:error.error.success,message:error.error.message}})
                                    }
                                  })
  }

}
