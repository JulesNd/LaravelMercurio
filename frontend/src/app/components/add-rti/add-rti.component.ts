import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Rti } from '../../rti';
import { User } from '../../user';
import {NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



@Component({
  selector: 'app-add-rti',
  templateUrl: './add-rti.component.html',
  styleUrls: ['./add-rti.component.css']
})
export class AddRtiComponent implements OnInit {

  rtis: any;
  users:any;
  rti = new Rti();

    constructor(private dataService: DataService, private http: HttpClient) {



     }




     /* file upload */
     /* Variabe to store file data */
     filedata:any;
    /* File onchange event */
    fileEvent(e){
        this.filedata = e.target.files[0];
    }
    /* Upload button functioanlity */
    onSubmitform(f: NgForm) {

      var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('zip', this.filedata);
      /* Image Post Request */
      this.http.post('//backbeta.mercurio-app.com/api/upload', myFormData, {
      headers: headers
      }).subscribe(data => {
       //Check success message
       //sweetalert message popup
      console.log('success')
      });

  }
/* file upload */

    ngOnInit(): void {
  this.getRtisData();
  this.getUsersData();

    }

    getRtisData() {
      this.dataService.getDataByUser().subscribe(res => {
         this.rtis = res;
      });
    }

    insertData()  {

      this.dataService.insertData(this.rti).subscribe(res => {
         console.log(res);
      });

    }

    getUsersData() {

      this.dataService.getUsers().subscribe(res => {
         this.users = res;
      });
    }

}
