import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Rti } from '../../rti';
import {NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {Location} from '@angular/common';
import { JwtService } from './../../shared/jwt.service';
import Swal from 'sweetalert2';

export class User {
  name: string;
  email: string;
  id: string;
  username: string;
}


@Component({
  selector: 'app-add-rti',
  templateUrl: './add-rti.component.html',
  styleUrls: ['./add-rti.component.css']
})
export class AddRtiComponent implements OnInit {

  rtis: any;
  users:any;
  rti = new Rti();
  user: User;


    constructor(private dataService: DataService, private http: HttpClient, private _location: Location,     public jwtService: JwtService,
) {

      this.jwtService.profile().subscribe((res:any) => {
        this.user = res;
      })

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
         Swal.fire({
         //position: 'top-end',
         icon: 'success',
         title: 'RTI crée avec succès',
         showConfirmButton: false,
         timer: 1800
         })

      });

    }

    getUsersData() {

      this.dataService.getUsers().subscribe(res => {
         this.users = res;
      });
    }

    backClicked() {
   this._location.back();
 }

}
