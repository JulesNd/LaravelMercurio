import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from 'sweetalert2';
import { DataService } from '../../service/data.service';
import {ActivatedRoute } from '@angular/router';

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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
User: any;
user: User;
id: any;
data: any;


  constructor( private route:ActivatedRoute, public router: Router,
    public fb: FormBuilder,
    public jwtService: JwtService,
    private tokenAuthService: TokenAuthService,
    private authenticationStateService: AuthenticationStateService,
  private dataService: DataService, ) {

    this.jwtService.profile().subscribe((res:any) => {
      this.user = res;
    })

  }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params.id;
    this.getDataForUpdate();
  }


    tokenStorage(jwt){
      this.tokenAuthService.setTokenStorage(jwt.access_token);
    }


    updateUser() {

    this.dataService.updateUser(this.id, this.User).subscribe(res=>{
      Swal.fire({
        title: '<strong>Votre profil à bien été mis à jour</strong>',
        icon: 'success',
        html:

          '<a href="/#/loading">Rafraichir la page</a> ',

        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        showConfirmButton: false,

      })

    });

    }



    getDataForUpdate() {
      this.dataService.getUserForUpdate(this.id).subscribe(res=> {
        //console.log(res);
        this.data = res
        this.User = this.data;

      })
    }

}
