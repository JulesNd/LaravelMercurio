import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

import { JwtService } from './../../shared/jwt.service';
import { TokenAuthService } from '../../shared/token-auth.service';
import { AuthenticationStateService } from '../../shared/authentication-state.service';



export class User {
  name: string;
  email: string;
  id: string;
  username: string;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})





export class NavbarComponent implements OnInit {
  isLoggedin: boolean;
  user: User;
  signinForm: FormGroup;
  err = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public jwtService: JwtService,
    private tokenAuthService: TokenAuthService,
    private authenticationStateService: AuthenticationStateService,
  ) {
    this.signinForm = this.fb.group({
      email: [],
      password: []
    });

    this.jwtService.profile().subscribe((res:any) => {
      this.user = res;
    })

  }

  ngOnInit() {
    this.authenticationStateService.userAuthState.subscribe(res => {
        this.isLoggedin = res;
    });

   }



  tokenStorage(jwt){
    this.tokenAuthService.setTokenStorage(jwt.access_token);
  }

  logOut() {
    this.authenticationStateService.setAuthState(false);
    this.tokenAuthService.destroyToken();
    this.router.navigate(['signin']);
  }
}
