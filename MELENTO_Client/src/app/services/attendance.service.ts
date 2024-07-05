import { Injectable } from '@angular/core';
import { Attendance } from '../models/attendance';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  arrAttendance: Attendance[] = [];
  baseUrl: string = "http://localhost:3000";
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
    this.arrAttendance = [];
  }

  getAttendance(): Observable<Attendance[]> {
    return this.httpClient.get<Attendance[]>(this.baseUrl + '/attendance').pipe(catchError(this.httpError));
  }

  getAttendanceById(id: number): Observable<Attendance> {
    return this.httpClient.get<Attendance>(`${this.baseUrl}/attendance/${id}`).pipe(catchError(this.httpError));
  }

  addAttendance(attendance: Attendance): Observable<Attendance> {
    const attendancePayload = {
      ...attendance,
      id: attendance.id.toString()
    };
    return this.httpClient.post<Attendance>(this.baseUrl + '/attendance', JSON.stringify(attendancePayload), this.httpHeader).pipe(catchError(this.httpError));
  }

  updateAttendance(attendance: Attendance): Observable<Attendance> {
    return this.httpClient.put<Attendance>(this.baseUrl + '/attendance/' + attendance.id.toString(), JSON.stringify(attendance), this.httpHeader).pipe(catchError(this.httpError));
  }
  deleteAttendance(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/attendance/${id}`).pipe(catchError(this.httpError));
  }

  private httpError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(msg);
    return throwError(msg);
  }
}
