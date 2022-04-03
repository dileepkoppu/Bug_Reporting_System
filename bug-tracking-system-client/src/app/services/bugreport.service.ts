import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable,throwError } from 'rxjs';
interface bugreportInterface{
  success:Boolean,
  data:{
    _id:string,
    id:string,
    title:string,
    developerName:string,
    testerName:string,
    status:string,
    priority:string,
    projectName:string
  }[]
}
interface bugreportcreateInterface{
  success:boolean,
  message:string
}
interface bugreportdetailsInterface{
  success:boolean
  data:{_id:string,
  title:string,
  description:string,
  developerName:string,
  testerName:string,
  details:string,
  status:string,
  priority:string,
  projectName:string,
  discussions:[]
}
}
interface discussionsInterface{
  success:boolean,
  data:{comment:string,username:string,time:Date}
}

@Injectable({
  providedIn: 'root'
})
export class BugreportService {

  constructor(private http:HttpClient) { }

  bugreportlist():Observable<bugreportInterface>{
    return this.http.get<bugreportInterface>(`bugreport-list`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  bugreportcreate(data: { [x: string]: any; }):Observable<bugreportcreateInterface>{
    const formData = new FormData();
    for ( const key of Object.keys(data) ) {
    const value = data[key];
    formData.append(key, value);
    }
    return this.http.post<bugreportcreateInterface>(`bugreport-create`,formData)
                                      .pipe(catchError((error)=>{return throwError(error)}))
  }
  bugreportdetails(id:string):Observable<bugreportdetailsInterface>{
    return this.http.get<bugreportdetailsInterface>(`bugreport-detail/${id}`)
                                                  .pipe(catchError((error)=>{return throwError(error)}))
  }
  bugreportupdate(id:string,data:object):Observable<bugreportcreateInterface>{
    return this.http.patch<bugreportcreateInterface>(`bugreport-detail/${id}/update`,data)
                                                  .pipe(catchError((error)=>{return throwError(error)}))
  }
  bugreportdelete(id:string):Observable<bugreportcreateInterface>{
    return this.http.delete<bugreportcreateInterface>(`bugreport-detail/${id}/delete`)
                                                .pipe(catchError((error)=>{return throwError(error)}))
  }
  bugreportdiscussion(id:string,data:object):Observable<discussionsInterface>{
    return this.http.post<discussionsInterface>(`bugreport-detail/${id}/discussions`,data)
                                                .pipe(catchError((error)=>{return throwError(error)}))
  }
}
