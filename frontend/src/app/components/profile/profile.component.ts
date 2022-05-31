import { Component } from '@angular/core';
import { JwtService } from './../../shared/jwt.service';
import { TokenAuthService } from '../../shared/token-auth.service';
import {ActivatedRoute } from '@angular/router';
import { AuthenticationStateService } from '../../shared/authentication-state.service';
import { DataService } from '../../service/data.service';

export class User {
  name: string;
  email: string;
  id: string;
  pseudo: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  isLoggedin: boolean;
  user: User;
  pseudos:any;
  pseudo:any;

  constructor(
    public jwtService: JwtService,
    private tokenAuthService: TokenAuthService,
    private authenticationStateService: AuthenticationStateService,
    private route:ActivatedRoute, private dataService: DataService
  ) {
    this.jwtService.profile().subscribe((res:any) => {
      this.user = res;
    })
  }

    ngOnInit() {

      this.pseudo =  this.route.snapshot.params.pseudo;
      this.getData();
      console.log(this.pseudo, 'hi');
      this.authenticationStateService.userAuthState.subscribe(res => {
          this.isLoggedin = res;
      });

     }

     getData() {
       this.dataService.getPseudo().subscribe(res=> {
         //console.log(res);
         this.pseudos = res;
       })
     }

}
