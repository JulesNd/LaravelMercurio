import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String
}

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<any> {
    return this.http.post('//Backbeta.mercurio-app.com/api/auth/signup', user);
  }

  logIn(user: User): Observable<any> {
    return this.http.post<any>('//Backbeta.mercurio-app.com/api/auth/signin', user);
  }

  profile(): Observable<any> {
    return this.http.get('//Backbeta.mercurio-app.com/api/auth/user');
  }

}
