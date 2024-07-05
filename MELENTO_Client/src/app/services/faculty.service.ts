import { Injectable } from '@angular/core';
import { Faculty } from '../models/faculty';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  arrFaculty: Faculty[] = [];
  baseUrl:string="http://localhost:3000"
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private httpClient:HttpClient) {
    this.arrFaculty = [
      // new Faculty(0, 0)
    ];
  }

  getFaculty():Observable<Faculty[]> {
    // return this.arrFaculty;
    return this.httpClient.get<Faculty[]>(this.baseUrl+'/faculty').pipe(catchError(this.httpError));
  }
  getFacultyById(id: number):Observable<Faculty> {
    return this.httpClient.get<Faculty>(this.baseUrl+'/faculty/'+id.toString()).pipe(catchError(this.httpError));
  }
  
  addFaculty(f:Faculty):Observable<Faculty>{
    const facultyPayload = {
      ...f,
      id: f.id.toString()
    };
    return this.httpClient.post<Faculty>(this.baseUrl+'/faculty',JSON.stringify(facultyPayload),this.httpHeader).pipe(catchError(this.httpError));
  }

  updateFaculty(f: Faculty):Observable<Faculty> {
    return this.httpClient.put<Faculty>(this.baseUrl+'/faculty/'+f.id.toString(),JSON.stringify(f),this.httpHeader).pipe(catchError(this.httpError));
  }

  httpError(error:HttpErrorResponse){
    let msg='';
    if(error.error instanceof ErrorEvent){
      msg=error.error.message;
    }
    else{
      msg=`Error Code:${error.status}\nMessage:${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}