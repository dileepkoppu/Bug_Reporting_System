import { Injectable } from '@angular/core';
import { CanActivate,CanDeactivate,Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private auth:AuthService ,private route:Router){}
  canActivate():boolean{
      if (this.auth.isLoggedIn()) {
        return true
      } else {
        this.route.navigate(['/login'])
        return false
      }
  }
  canDeactivate(): Observable<boolean> {
    return of(true);
  }
}
