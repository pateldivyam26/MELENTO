import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  arrCourse: Course[] = [];
  baseUrl:string="http://localhost:3000"
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private httpClient:HttpClient) {
    this.arrCourse = [
      // new Course(1, 'Angular', 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.', 30),
      // new Course(2, 'React', 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.', 25),
      // new Course(3, 'Vue', 'Vue.js is a progressive framework for building user interfaces.', 20)
    ];
  }

  getCourses():Observable<Course[]> {
    // return this.arrCourse;
    return this.httpClient.get<Course[]>(this.baseUrl+'/courses').pipe(catchError(this.httpError));
  }
  getCourseById(id: number) {
    for (var i = 0; i < this.arrCourse.length; i++) {
      if (id == this.arrCourse[i].id) {
        return this.arrCourse[i];
      }
    }
    return new Course(0, '', '',0);
  }

  addCourse(course: Course):Observable<Course> {
    // this.arrCourse.push(course);
    // console.log('Course added:', course);
    const userPayload = {
      ...course,
      id: course.id.toString()
    };
    return this.httpClient.post<Course>(this.baseUrl+'/courses',JSON.stringify(userPayload),this.httpHeader).pipe(catchError(this.httpError));
  }

  updateCourse(course: Course):Observable<Course> {
    return this.httpClient.put<Course>(this.baseUrl+'/courses/'+course.id.toString(),JSON.stringify(course),this.httpHeader).pipe(catchError(this.httpError));
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