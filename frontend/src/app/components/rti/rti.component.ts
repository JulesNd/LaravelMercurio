import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { JwtService } from '../../shared/jwt.service';
import { Rti } from '../../rti';




export class User {
  name: String;
  email: String;
  id: string;
  owner_id: string;
}


@Component({
  selector: 'app-rti',
  templateUrl: './rti.component.html',
  styleUrls: ['./rti.component.css']
})
export class RtiComponent implements OnInit {

  rtis: any ;
  rti = new Rti();
  user: User;

    constructor(private DataService: DataService,public jwtService: JwtService) {


      this.jwtService.profile().subscribe((res:any) => {
        this.user = res;
      })


     }

    ngOnInit(): void {
  this.getRtisData();

    }

    getRtisData() {
      this.DataService.getDataByUser().subscribe(res => {
         this.rtis = res;
      });
    }

    insertData()  {

      this.DataService.insertData(this.rti).subscribe(res => {
         console.log(res);
      });

    }



}
