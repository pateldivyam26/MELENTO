import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Assessment } from '../models/assessment';
@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {
  arrAssessments: Assessment[] = []
  baseUrl: string = "http://localhost:3000"
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) {
    this.arrAssessments=[

    ]
  }
  getAssessments(): Observable<Assessment[]> {
    // return this.arrAssessments
    // return this.httpClient.get<AssessmentCard[]>(this.baseUrl+'/assessment_cards').pipe(catchError(this.httpError));
    return this.httpClient.get<Assessment[]>(this.baseUrl + '/assessment').pipe(catchError(this.httpError));

  }

  // getAssessmentById(id:number){
  //   for(var i =0; i<this.arrAssessments.length; i++){
  //     if(id==this.arrAssessments[i].id){
  //       return this.arrAssessments[i];
  //     }
  //   }
  //   return new AssessmentCard(0,'','',true)
  // }
  getAssessmentById(id: number): Observable<Assessment> {
    // return this.httpClient.get<Assessment>(`${this.baseUrl}/assessment_cards/${id}`).pipe(catchError(this.httpError));
    return this.httpClient.get<Assessment>(this.baseUrl + '/assessment/' + id).pipe(catchError(this.httpError));

  }

  addAssessment(assessment: Assessment): Observable<Assessment> {
    // this.arrAssessments.push(assessment)
    const AssessmentPayload = {
      ...assessment,
      id: assessment.id.toString()
    };
    return this.httpClient.post<Assessment>(this.baseUrl + '/assessment', JSON.stringify(AssessmentPayload), this.httpHeader).pipe(catchError(this.httpError));
  }
  updateAssessment(assessment: Assessment): Observable<Assessment> {
    const AssessmentPayload = {
      ...assessment,
      id: assessment.id.toString()
    };
    return this.httpClient.put<Assessment>(`${this.baseUrl}/assessment/${assessment.id}`, JSON.stringify(AssessmentPayload), this.httpHeader).pipe(catchError(this.httpError));
  }

  httpError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    }
    else {
      msg = `Error Code:${error.status}\nMessage:${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
