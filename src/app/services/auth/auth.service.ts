import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error: boolean = false;
  public link: string = environment.link + 'auth/';

  constructor(private http: HttpClient) { }

  loginByEmail(email: string, password: string): Observable<any> {
    return this.http.post<LoginI>(this.link, {
      "email": email,
      "password": password
    });
  }

  setToken(token: string): void {
    let tokenString = token;
    localStorage.setItem('token', tokenString)
  }

  getToken() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
  }
};
