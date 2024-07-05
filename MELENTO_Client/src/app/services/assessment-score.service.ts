import { Injectable } from '@angular/core';
import { AssessmentScore } from '../models/assessmentScore';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssessmentScoreService {
  arrAssessmentScores:AssessmentScore[] = [];
  baseUrl:string="http://localhost:3000"
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private httpClient:HttpClient) {
    this.arrAssessmentScores = [
  
    ];
  }

  getAssessmentScore():Observable<AssessmentScore[]>{
    return this.httpClient.get<AssessmentScore[]>(this.baseUrl+'/assessment_score').pipe(catchError(this.httpError));
  }

  // getAssessmentScoreById(id:number){
  //   for (var i = 0; i < this.arrAssessmentScores.length; i++) {
  //     if (id == this.arrAssessmentScores[i].id) {
  //       return this.arrAssessmentScores[i];
  //     }
  //   }
  //   return new AssessmentScore(0,0,0,0,0);
  // }

  getAssessmentScoreById(id: number): Observable<AssessmentScore> {
    // return this.httpClient.get<Assessment>(`${this.baseUrl}/assessment_cards/${id}`).pipe(catchError(this.httpError));
    return this.httpClient.get<AssessmentScore>(`${this.baseUrl}/assessment_score/${id}`).pipe(catchError(this.httpError));

  }


  addAssessmentScore(u:AssessmentScore):Observable<AssessmentScore>{
    const userPayload = {
      ...u,
      id: u.id.toString()
    };
    return this.httpClient.post<AssessmentScore>(this.baseUrl+'/assessment_score',JSON.stringify(userPayload),this.httpHeader).pipe(catchError(this.httpError));
  }

  
  updateAssessmentScore(u: AssessmentScore):Observable<AssessmentScore> {
    return this.httpClient.put<AssessmentScore>(this.baseUrl+'/assessment_score/'+u.id.toString(),JSON.stringify(u),this.httpHeader).pipe(catchError(this.httpError));
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
