import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set("Access-Control-Allow-Origin", "*"),
      withCredentials: true
    });
    //TODO: change to token
    var token = localStorage.getItem("customerId");
    if(token) {
      request = request.clone({
        headers: request.headers.set('Authorization', token)
      });
    }
    return next.handle(request);
  }
}
