import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Rti } from '../../rti';


@Component({
  selector: 'app-add-rti',
  templateUrl: './add-rti.component.html',
  styleUrls: ['./add-rti.component.css']
})
export class AddRtiComponent implements OnInit {

  rtis: any ;
  rti = new Rti();

    constructor(private DataService: DataService) {



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
