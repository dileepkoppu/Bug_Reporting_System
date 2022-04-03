import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { ActivatedRoute,Router} from "@angular/router";


import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-conformation-resetpassword',
  templateUrl: './conformation-resetpassword.component.html',
  styleUrls: ['./conformation-resetpassword.component.css']
})
export class ConformationResetpasswordComponent implements OnInit {
  conformResetpasswordForm= new FormGroup({
    password: new FormControl('',Validators.required),
    conformpassword : new FormControl('',Validators.required)
  })

  alert:boolean=false
  success:boolean=false
  message:string=''
  constructor(private activatedRoute:ActivatedRoute,private auth:AuthService,private router:Router) { }
  
  ngOnInit(): void {
    
  }
  onSubmit(){    
    this.auth.conformresetPassword(this.conformResetpasswordForm.value,this.activatedRoute.snapshot.params.authToken,this.activatedRoute.snapshot.params.id)
                                                                        .subscribe(
                                                                          (data)=>{
                                                                            this.router.navigate(['/login'],{state:{alert:true,success:data.success,message:data.message}})},
                                                                        (error)=>{
                                                                          this.alert=!!error.error.message
                                                                          this.message=error.error.message
                                                                          this.success=error.error.success
                                                                        }
                                                                     )
  }
}
