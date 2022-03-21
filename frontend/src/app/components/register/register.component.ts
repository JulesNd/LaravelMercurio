import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { JwtService } from './../../shared/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  err = null;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public jwtService: JwtService
  ) {
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    })
  }

  ngOnInit() { }

  onSubmit() {
    this.jwtService.signUp(this.signupForm.value).subscribe(
      res => {
        console.log(res)
        Swal.fire({
//position: 'top-end',
icon: 'success',
title: 'Compte crée avec succès. Vous allez etre redirigé à la page connexion',
showConfirmButton: false,
timer: 2200
})
      },
      error => {
        this.err = error.error;
        Swal.fire({
title: '',
text: "Veuillez verifier vos informations. Nous vous rappelons que votre mot de passe doit contenir au moins 1 majuscule et 1 chiffre",
icon: 'warning',
confirmButtonColor: '#3085d6',
confirmButtonText: 'Re-essayer'
})
      },
      () => {
        this.signupForm.reset()
        this.router.navigate(['login']);
      }
    )
  }

}
