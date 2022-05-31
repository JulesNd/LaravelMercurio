import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './../../shared/jwt.service';
import { TokenAuthService } from '../../shared/token-auth.service';
import { AuthenticationStateService } from '../../shared/authentication-state.service';


export class User {
  name: String;
  email: String;
  id: string;
  username: String;
}

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoggedin: boolean;
  user: User;
  err = null;

  constructor(public router: Router,
    public jwtService: JwtService,
    private tokenAuthService: TokenAuthService,
    private authenticationStateService: AuthenticationStateService,) {

      this.jwtService.profile().subscribe((res:any) => {
        this.user = res;
      })




     }

  ngOnInit(): void {
    this.authenticationStateService.userAuthState.subscribe(res => {
        this.isLoggedin = res;
    });

    setTimeout(() => {
      this.router.navigate(['Users/',this.user.username]);
    }, 500);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }



  tokenStorage(jwt){
    this.tokenAuthService.setTokenStorage(jwt.access_token);
  }
  }
