import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable,throwError } from 'rxjs';

interface projectsuccessinterface{
  success:boolean,
  message:string,
}

interface projectdeatailinterface{
  success:boolean,
  data:{
    _id:string,
    id:string,
    projectName:string,
    clientName:string,
    repoLink:string,
    status:string
  }
}
interface projectlistinterface{
  success:boolean,
  data:{
    _id:string,
    id:string,
    projectName:string,
    clientName:string,
    repoLink:string,
    status:string
  }[]
}
interface projectnamelistInterface{
  success:boolean
  data:{
    projectName:string
  }[]
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  projectlist():Observable<projectlistinterface>{
    return this.http.get<projectlistinterface>(`projects-list`)
  }
  projectcreate(data:object):Observable<projectsuccessinterface>{
    return this.http.post<projectsuccessinterface>(`project-create`,data)
  }
  projectdetail(id:string):Observable<projectdeatailinterface>{
    return this.http.get<projectdeatailinterface>(`project-detail/${id}`)
  }
  projectupdate(id:string,data:object):Observable<projectsuccessinterface>{
    return this.http.patch<projectsuccessinterface>(`project-detail/${id}/update`,data)
  }
  projectnamelist():Observable<projectnamelistInterface>{
    return this.http.get<projectnamelistInterface>(`projectNameList`)
  }
}
