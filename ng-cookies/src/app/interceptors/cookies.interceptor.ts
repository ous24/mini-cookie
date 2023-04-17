import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CookiesInterceptor implements HttpInterceptor {
  cookiedRequest!: HttpRequest<any>;
  constructor(private authService: AuthService) {}
  cookie = this.authService.getCookie()
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request);
  }
}
