import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BugreportService } from "../../services/bugreport.service";
import { HttpClient, } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-details-of-bugreport',
  templateUrl: './details-of-bugreport.component.html',
  styleUrls: ['./details-of-bugreport.component.css']
})
export class DetailsOfBugreportComponent implements OnInit {


  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)

  })

  report:{
    _id:string,
    title:string,
    description:string,
    developerName:string,
    testerName:string,
    details:string,
    status:string,
    priority:string,
    projectName:string,
    discussions:{comment:string,time?:Date,username:string}[]
  }={
    _id:"",
    title:"",
    description:"",
    developerName:"",
    testerName:"",
    details:"",
    status:"",
    priority:"",
    projectName:"",
    discussions:[{comment:"",username:""}]
  }

  base="https://bug-tracking-system1.herokuapp.com/upload/"
  constructor(private bugreportService:BugreportService,private activatedRoute:ActivatedRoute,private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.bugreportService.bugreportdetails(this.activatedRoute.snapshot.params.id)
                                          .subscribe((data)=>{
                                                  this.report=data.data
                                                },
                                                (error)=>{
                                                  this.router.navigate(['bugreport-list',{state:{alert:true,success:error.success,message:error.message}}])
                                                })
  }
  deleteBugreport(id:string){
    this.bugreportService.bugreportdelete(id)
                            .subscribe((data)=>{
                              this.router.navigate(['bugreport-list'],{state:{alert:true,success:data.success,message:data.message}})
                            },
                            (error)=>{
                              this.router.navigate(['bugreport-list'],{state:{alert:true,success:error.error.success,message:error.error.message}})
                            }
                            )
  }  
  onSubmit(){
   this.bugreportService.bugreportdiscussion(this.activatedRoute.snapshot.params["id"],this.commentForm.value)
                                                .subscribe((data)=>{
                                                  this.report.discussions.push(data.data)
                                                  this.commentForm.reset()
                                                },
                                                (error)=>{
                                                  console.log(error);
                                                })

  }

}
