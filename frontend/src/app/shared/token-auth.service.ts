import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenAuthService {

  private tokenIssuer = {
    login: 'http://mercurio-app.com/api/auth/signin',
    register: 'http://mercurio-app.com/api/auth/signup'
  }

  constructor() { }

  setTokenStorage(token){
    localStorage.setItem('auth_token', token);
  }

  getJwtToken(){
    return localStorage.getItem('auth_token');
  }

  // Validate token
  validateToken(){
     const token = this.getJwtToken();

     if(token){
       const payload = this.payload(token);
       if(payload){
         return Object.values(this.tokenIssuer).indexOf(payload.iss) > -1 ? true : false;
       }
     } else {
        return false;
     }
  }

  payload(token) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state
  isSignedin() {
    return this.validateToken();
  }

  // Destroy token
  destroyToken(){
    localStorage.removeItem('auth_token');
  }

}
