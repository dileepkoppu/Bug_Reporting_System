import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';

interface loginInterface{
  success:boolean,
  data:{
    token:string,
    expiresIn:Date,
    username:string,
    role:string
  }
}

interface resetpasswordInterface{
  success:boolean,
  message:string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  setLocalStorage(responseObj:any) {
    const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');
    localStorage.setItem('id_token', responseObj.token);
    localStorage.setItem('username',responseObj.username);
    localStorage.setItem('role',responseObj.role);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  } 

  login(data:any):Observable<loginInterface>{
    
    return this.http.post<loginInterface>(`login`,data)
                                        .pipe(catchError((error)=>{return throwError(error)}))
  }

  resetpassword(data:any):Observable<resetpasswordInterface>{
    return this.http.post<resetpasswordInterface>(`resetpassword`,data)
                                              .pipe(catchError((error)=>{return throwError(error)}))
  }
  conformresetPassword(data:any,authToken:string,id:string):Observable<resetpasswordInterface>{
    return this.http.patch<resetpasswordInterface>(`resetpassword/${authToken}/${id}`,data) 
                                                    .pipe(catchError((error)=>{return throwError(error)}))
  }

  logout(){
    localStorage.clear()
    this.changeAuthStatus(this.isLoggedIn());
    this.changeDetails()
    this.router.navigate([''])
  }


  isLoggedIn():boolean {
    let role=localStorage.getItem('role')
    if (localStorage.getItem('id_token') && localStorage.getItem('username') && role && localStorage.getItem("expires_at")) {
      let isRoleValid=role==="admin"||role==="superuser"||role==="tester"||role==="developer"    
      return moment().isBefore(this.getExpiration(), "second")&&(isRoleValid)
    } else {
      return false
    }
  }


  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration) {
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    } else {
        return moment();
    }
  } 

  private loggedIn = new BehaviorSubject <boolean>(this.isLoggedIn());
  private _username = new BehaviorSubject <string|null>(localStorage.getItem('username'));
  private _role = new BehaviorSubject <string|null>(localStorage.getItem('role'));
  authStatus = this.loggedIn.asObservable();
  behaviorUsername = this._username.asObservable()
  behaviorRole = this._role.asObservable()
  changeAuthStatus(value : boolean){
         this.loggedIn.next(value)
  }
  changeDetails(username:string="",role:string=""){
    this._username.next(username)
    this._role.next(role)
  }
}
