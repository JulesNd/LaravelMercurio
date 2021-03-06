import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from 'sweetalert2';
import { JwtService } from './../../shared/jwt.service';
import { TokenAuthService } from '../../shared/token-auth.service';
import { AuthenticationStateService } from '../../shared/authentication-state.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export class User {
  name: string;
  email: string;
  id: string;
  username: string;
  img: string;
  biography: string;
  location: string;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})





export class NavbarComponent implements OnInit {

  @ViewChild('navBurger') navBurger: ElementRef;
    @ViewChild('navMenu') navMenu: ElementRef;

  isLoggedin: boolean;
  user: User;
  signinForm: FormGroup;
  err = null;
  public isCollapsed = false;
  toggleNavbar() {
         this.navBurger.nativeElement.classList.toggle('is-active');
         this.navMenu.nativeElement.classList.toggle('is-active');
     }




  constructor(
    public router: Router,
    public fb: FormBuilder,
    public jwtService: JwtService,
    private tokenAuthService: TokenAuthService,
    private authenticationStateService: AuthenticationStateService,
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };




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
    Swal.fire({
title: '',
text: "Deconnect??.",
icon: 'error',
showConfirmButton: false,

})
    this.router.navigate(['login']);
  }
}
