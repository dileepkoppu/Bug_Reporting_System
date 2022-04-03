import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetpasswordForm =new FormGroup({
    email: new FormControl('',Validators.required),
  });

  constructor(private auth:AuthService,private router:Router) { }
  alert:boolean=false
  success:boolean=false
  message:string=""
  ngOnInit(): void {
  }
  onsubmit(){
    this.auth.resetpassword(this.resetpasswordForm.value)
                                            .subscribe(
                                              (data)=>{
                                                this.router.navigate(['/login'],{state:{alert:true,success:data.success,message:data.message}})
                                              },
                                              (error)=>{
                                                this.alert=!!error.error.message
                                                this.message=error.error.message
                                                this.success=error.error.success
                                              }
                                              )
  }
}
