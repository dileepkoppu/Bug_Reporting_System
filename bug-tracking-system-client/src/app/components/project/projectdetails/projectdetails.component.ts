import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

interface projectdetailInterface{
  _id:string,
  id:string,
  projectName:string,
  clientName:string,
  repoLink:string,
  status:string
}

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectdetailsComponent implements OnInit {
  project:projectdetailInterface={
      _id:"",
      id:"",
      projectName:"",
      clientName:"",
      repoLink:"",
      status:""
    }

  constructor(
    private projService:ProjectService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
  this.projService.projectdetail(this.activatedRoute.snapshot.params['id'])
                                        .subscribe((data)=>{
                                          this.project=data.data
                                        },
                                        (error)=>{
                                          this.router.navigate([''],{state:{alert:true,success:error.error.success,message:error.error.message}})
                                        })
  
  }


}
