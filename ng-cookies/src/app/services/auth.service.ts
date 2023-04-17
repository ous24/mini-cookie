import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:5000';
  constructor(private http: HttpClient, private cookie: CookieService, private router :Router) {}
  signin(data: any) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, {
        ...data,
      })
      .pipe(
        map((res) => {
          console.log('USER:', res);
          // set the cookie from res
          this.cookie.put('token', res.token);
          return res;
        })
      );
  }
  logout() {
    this.deleteCookie()
    this.router.navigate(['/login'])
  }

  getCookie() {
    return this.cookie.get('token');
  }

  deleteCookie() {
    this.cookie.remove('token');
  }
  
  isLoggedIn(): boolean{
    return !! this.cookie.get('token');
  }
}