import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable,of } from 'rxjs';

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private auth:AuthService ,private router:Router){}
  canActivate(): Observable<boolean>  {
    if (this.auth.isLoggedIn()) {
      let role = localStorage.getItem('role')
      let checkRole= role==="admin"||role==="supersuer"
      if (checkRole) {
        return of(checkRole);
      } else {
        this.router.navigate([''])
        return of(checkRole);
      }
      
    } else {
      this.router.navigate(['/login'])
      return of(false)
    } 
  }
  
}
