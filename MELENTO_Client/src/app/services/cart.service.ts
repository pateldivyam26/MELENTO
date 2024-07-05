import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  Cart: Cart[] = [];
  private checkoutSource = new Subject<number>();
  baseUrl:string="http://localhost:3000"
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private httpClient:HttpClient) { }

  //this function will be only called by the admin if required. not to be called for each user
  getCart():Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(this.baseUrl+'/cart').pipe(catchError(this.httpError)); 
  }
  getCartById(id: string):Observable<Cart>  {
    return this.httpClient.get<Cart>(this.baseUrl+'/cart/'+id).pipe(catchError(this.httpError));
  }
    
  AddToCart(c:Cart):Observable<Cart>{
    const cartPayload = {
      ...c,
      id: c.id.toString()
    };
    return this.httpClient.post<Cart>(this.baseUrl+'/cart',JSON.stringify(cartPayload),this.httpHeader).pipe(catchError(this.httpError));
  }
  RemoveFromCart(id:string):void{
    this.httpClient.delete<Cart>(this.baseUrl+'/cart/'+id,this.httpHeader).subscribe();
  }
  UpdateCart(c:Cart):Observable<Cart>{
    const cartPayload = {
      ...c,
      id: c.id.toString()
    };
    return this.httpClient.put<Cart>(this.baseUrl+'/cart/'+c.id,JSON.stringify(cartPayload),this.httpHeader).pipe(catchError(this.httpError));
  }
  
  checkout(count: number) {
    this.checkoutSource.next(count);
  }
  getcheckout(): Observable<number> {
    return this.checkoutSource.asObservable();
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
