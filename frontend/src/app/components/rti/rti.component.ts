import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { JwtService } from '../../shared/jwt.service';
import { Rti } from '../../rti';





export class User {
  name: string;
  email: string;
  id: string;
  username: string;
}


@Component({
  selector: 'app-rti',
  templateUrl: './rti.component.html',
  styleUrls: ['./rti.component.css']
})
export class RtiComponent implements OnInit {

  rtis: any ;
  rtis1:any;
  rti = new Rti();
  user: User;

    constructor(private DataService: DataService,public jwtService: JwtService) {


      this.jwtService.profile().subscribe((res:any) => {
        this.user = res;
      })


     }

    ngOnInit(): void {
  this.getRtisData();
  this.getRtis();

    }

    getRtisData() {
      this.DataService.getDataByUser().subscribe(res => {
         this.rtis = res;
      });
    }

    getRtis() {
      this.DataService.getData().subscribe(res => {
         this.rtis1 = res;
      });
    }

    insertData()  {

      this.DataService.insertData(this.rti).subscribe(res => {
         console.log(res);
      });

    }





}
