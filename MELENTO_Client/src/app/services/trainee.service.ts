import { Injectable } from '@angular/core';
import { Trainee } from '../models/trainee';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  arrTrainee: Trainee[] = [];
  baseUrl:string="http://localhost:3000"
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private httpClient:HttpClient) {
    
  }

  getTrainee():Observable<Trainee[]> {
    return this.httpClient.get<Trainee[]>(this.baseUrl+'/trainee').pipe(catchError(this.httpError));
  }
  getTraineeById(id: number):Observable<Trainee> {
    return this.httpClient.get<Trainee>(this.baseUrl+'/trainee/'+id.toString()).pipe(catchError(this.httpError));

  }
  addTrainee(t: Trainee): Observable<Trainee> {
    const payload={
      ...t,
      id:t.id.toString()
    }
    return this.httpClient.post<Trainee>(this.baseUrl+'/trainee',JSON.stringify(payload),this.httpHeader).pipe(catchError(this.httpError));
  }
  updateTrainee(t: Trainee): Observable<Trainee> {
    return this.httpClient.put<Trainee>(this.baseUrl+'/trainee/'+t.id.toString(),JSON.stringify(t),this.httpHeader).pipe(catchError(this.httpError));
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
