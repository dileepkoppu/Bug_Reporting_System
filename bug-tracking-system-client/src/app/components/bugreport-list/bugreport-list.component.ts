import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BugreportService } from '../../services/bugreport.service';
import { AuthService } from "../../services/auth.service";

interface reportInterface{
  _id:string,
  id:string,
  title:string,
  developerName:string,
  testerName:string,
  status:string,
  priority:string,
  projectName:string
}

@Component({
  selector: 'app-bugreport-list',
  templateUrl: './bugreport-list.component.html',
  styleUrls: ['./bugreport-list.component.css']
})
export class BugreportListComponent implements OnInit {
  role!:boolean
  reports:reportInterface[]=[]
  alert :boolean =false
  success :boolean =false
  message : string =''

  constructor(
    private bugreportServeice:BugreportService,
    private router:Router,
    private auth:AuthService
    ){
      this.auth.behaviorRole.subscribe(
        value=>this.role=value!=="developer"
      )
      this.alert=this.router.getCurrentNavigation()?.extras.state?.alert
      this.success=this.router.getCurrentNavigation()?.extras.state?.success
      this.message=this.router.getCurrentNavigation()?.extras.state?.message
  }

  ngOnInit(): void {
    this.bugreportServeice.bugreportlist()
                            .subscribe((data)=>{
                              this.reports=data.data
                            },
                            (error)=>{
                              this.router.navigate([''],{state:{alert:true,success:error.success,message:error.message}})
                            }
                            )
  }

}
