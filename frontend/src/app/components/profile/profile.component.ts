import { Component } from '@angular/core';
import { JwtService } from './../../shared/jwt.service';
import { EmployeesComponent } from '../employees/employees.component';


export class User {
  name: String;
  email: String;
  id: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  user: User;

  constructor(
    public jwtService: JwtService
  ) {
    this.jwtService.profile().subscribe((res:any) => {
      this.user = res;
    })
  }

}
