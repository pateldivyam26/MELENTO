import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;


  constructor(private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken=localStorage.getItem('authToken');
    req = req.clone({
      // withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });


    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error)
        // logout when token is expired
        if(error.error=="Authorization failed. No access token." || error.message=="Token is expired"||error.error=="Could not verify token")
        {
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('authToken');

        this.router.navigate(['/home']).then(() => {
        location.reload();
    });
  }
/*  }
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/signin') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }
*/
        return throwError(() => error);
      })
    );
  }
  

//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;


//       if (this.storageService.isLoggedIn()) {
//         this.eventBusService.emit(new EventData('logout', null));
//       }
//     }


//     return next.handle(request);
//   }
}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];