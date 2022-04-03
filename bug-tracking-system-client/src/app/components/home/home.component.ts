import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alert :boolean =false
  success :boolean =false
  message : string =''

  constructor(private router:Router) {
    this.alert=this.router.getCurrentNavigation()?.extras.state?.alert
    this.success=this.router.getCurrentNavigation()?.extras.state?.success
    this.message=this.router.getCurrentNavigation()?.extras.state?.message
   }

  ngOnInit(): void {
  }
}
