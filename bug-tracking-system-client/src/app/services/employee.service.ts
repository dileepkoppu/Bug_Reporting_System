import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable,throwError } from 'rxjs';
interface employeelistInterface{
  success:boolean,
  data:{id:string,username:string,email:string,role_ids:string,is_active:boolean,_id:string,mobile:string}[]
}
interface employeedetailsInterface{
  success:boolean,
  message ?:string,
  data :{username:string,email:string,role_ids:string,is_active:boolean,_id:string,mobile:string,dob:string|null}
}
interface employeecreateInterface{
  success:boolean,
  message:string
}
interface employeesusernamelistInterface{
  success:boolean,
  data:{username:string}[]
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  employeelist(){
    return this.http.get<employeelistInterface>(`employees-list`)
                                      .pipe(catchError((error)=>{return throwError(error)}))
  }
  employeedetails(id:string):Observable<employeedetailsInterface>{
    return this.http.get<employeedetailsInterface>(`employee-detail/${id}`)
                                      .pipe(catchError((error)=>{return throwError(error)}))
  }
  developersUsernameList():Observable<employeesusernamelistInterface>{
    return this.http.get<employeesusernamelistInterface>(`developersUsernameList`)
                                      .pipe(catchError((error)=>{return throwError(error)}))
  }
  testersUsernameList():Observable<employeesusernamelistInterface>{
    return this.http.get<employeesusernamelistInterface>(`testersUsernameList`)
                                      .pipe(catchError((error)=>{return throwError(error)}))
  }
  employeeupdate(id:string,data:object):Observable<employeedetailsInterface>{
    return this.http.patch<employeedetailsInterface>(`employee-detail/${id}/update`,data)
                                      .pipe(catchError((error)=>{return throwError(error)}))
  }
  employeecreate(data:object){
    return this.http.post<employeecreateInterface>(`employee-create`,data)
                              .pipe(catchError((error)=>{return throwError(error)}))
  }
  employeedelete(id:string){
    return this.http.delete<employeecreateInterface>(`employee-detail/${id}/delete`)
                                      .pipe(catchError((error)=>{return throwError(error)}))                                       
  }

}
