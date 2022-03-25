import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from 'sweetalert2';
import { JwtService } from './../../shared/jwt.service';
import { TokenAuthService } from '../../shared/token-auth.service';
import { AuthenticationStateService } from '../../shared/authentication-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLoggedin: boolean;

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
    })
  }

  ngOnInit() {
    this.authenticationStateService.userAuthState.subscribe(res => {
        this.isLoggedin = res;
    });

   }

  onSubmit() {
      this.jwtService.logIn(this.signinForm.value).subscribe(
        res => {
          this.tokenStorage(res);
          Swal.fire({
  //position: 'top-end',
  icon: 'success',
  title: 'Connexion réussie',
  showConfirmButton: false,
  timer: 1800
})
        },
        error => {
          this.err = error.error;
          Swal.fire({
  title: '',
  text: "Adresse E-mail ou mot de passe incorrect.",
  icon: 'warning',
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Re-essayer'
})
        },() => {
          this.authenticationStateService.setAuthState(true);
          this.signinForm.reset()
          this.router.navigate(['/loading']);
        }
      );
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
