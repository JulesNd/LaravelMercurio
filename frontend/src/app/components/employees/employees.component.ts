import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { JwtService } from '../../shared/jwt.service';
import { PipePipe } from '../pipe.pipe';



export class User {
  name: String;
  email: String;
  id: string;
  owner_id: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})




export class EmployeesComponent implements OnInit {

employees: any ;
user: User;

  constructor(private DataService: DataService,public jwtService: JwtService) {


    this.jwtService.profile().subscribe((res:any) => {
      this.user = res;
    })


   }

  ngOnInit(): void {
this.getEmployeesData();

  }

  getEmployeesData() {
    this.DataService.getDataByUser().subscribe(res => {
       this.employees = res;
    });
  }


}
