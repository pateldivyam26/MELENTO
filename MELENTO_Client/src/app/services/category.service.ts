import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  arrCategory: Category[] = [];
  baseUrl:string="http://localhost:3000"
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private httpClient:HttpClient) {
    this.arrCategory = [
      // new Category(0, 'Science')
    ];
  }

  getCategory():Observable<Category[]> {
    // return this.arrCategory;
    return this.httpClient.get<Category[]>(this.baseUrl+'/course_categories').pipe(catchError(this.httpError));
  }
  getCategoryById(id: number) {
    for (var i = 0; i < this.arrCategory.length; i++) {
      if (id == this.arrCategory[i].id) {
        return this.arrCategory[i];
      }
    }
    return new Category(0, '', '');
  }
  addCategory(category: Category):Observable<Category> {
    // this.arrCategory.push(category);
    const userPayload = {
      ...category,
      id: category.id.toString()
    };
    return this.httpClient.post<Category>(this.baseUrl+'/course_categories',JSON.stringify(userPayload),this.httpHeader).pipe(catchError(this.httpError));
  }
  updateCategory(category: Category):Observable<Category> {
    return this.httpClient.put<Category>(this.baseUrl+'/course_categories/'+category.id.toString(),JSON.stringify(category),this.httpHeader).pipe(catchError(this.httpError));
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


