import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { User } from '../models/user';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  arrUsers: User[] = []
  baseUrl:string="http://localhost:3000"
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private httpClient:HttpClient) {
    this, this.arrUsers = [
      // new User(1, "Divyam", "Patel", "pateldivyam26@gmail.com", "9521345042", "2002-08-26", "user", "abcdef", new Address(1, 25, '8th Cross', 'Malleswaram', 'Karnataka', 'Bangalore', 'India', '307024'))
    ]
  }
  
  getUsers():Observable<User[]> {
    // return this.arrUsers;
    return this.httpClient.get<User[]>(this.baseUrl+'/users').pipe(catchError(this.httpError));
  }
  getUserById(id: number) {
    for (var i = 0; i < this.arrUsers.length; i++) {
      if (id == this.arrUsers[i].id) {
        return this.arrUsers[i]
      }
    }
    return new User(0, "", "", "", "", "", "", "", new Address(0, 0, '', '', '', '', '', 0))
  }

  // addUser(u: User) {
  //   this.arrUsers.push(u)
  //   console.log(this.arrUsers)
  // }

  addUser(u:User):Observable<User>{
    const userPayload = {
      ...u,
      id: u.id.toString()
    };
    return this.httpClient.post<User>(this.baseUrl+'/users',JSON.stringify(userPayload),this.httpHeader).pipe(catchError(this.httpError));
  }

  // updateUser(u: User) {
  //   for (var i = 0; i < this.arrUsers.length; i++) {
  //     if (u.id == this.arrUsers[i].id) {
  //       this.arrUsers[i] = u;
  //     }
  //   }
  //   this.arrUsers.forEach(u => {
  //     console.log(u)
  //   })
  // }
  
  updateUser(u: User):Observable<User> {
    return this.httpClient.put<User>(this.baseUrl+'/users/'+u.id.toString(),JSON.stringify(u),this.httpHeader).pipe(catchError(this.httpError));
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