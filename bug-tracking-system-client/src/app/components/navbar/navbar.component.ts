import { Component, OnInit } from '@angular/core';


import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false;
  username!:string|null
  role!:boolean|null

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value =>{ 
      this.loggedIn = value
    });
    this.auth.behaviorRole.subscribe(value => this.role = value==="admin"||value==="superuser");
    this.auth.behaviorUsername.subscribe(value => this.username = value);
  }
  logout(){ 
    this.auth.logout()
  }
}