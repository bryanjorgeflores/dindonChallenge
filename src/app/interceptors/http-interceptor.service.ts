import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  token = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZWFtY29yZS5uZXQiLCJzdWIiOiJpbnRlcnZpZXciLCJhdWQiOiJ0ZWFtY29yZS5uZXQvdGMtaW50ZXJ2aWV3Ly5nZXRfaW50ZXJ2aWV3IiwiZXhwIjoxNjAxNjY1OTgxLCJpYXQiOjE2MDEwNjExODEsImp0aSI6IjFfMTYwMTA2MTE4MV90ZWFtY29yZS5uZXQiLCJlbWFpbCI6ImludGVydmlld0B0ZWFtY29yZS5uZXQifQ.Fwo2uAqyvT5eAs2fM3y7tGGjqrDMWFe6D-k-3f0C2jSDcKX1n42NlyMqFvI1zx-xcjHWkS0BMJypwezhTzHuJA';
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    const reqClone = req.clone({
      headers
    });
    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    )
  }

  manejarError(error: HttpErrorResponse) {
    return throwError('Error' + error.message)
  }

}
