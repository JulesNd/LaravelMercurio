import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Rti } from '../../rti';
import {NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {Location} from '@angular/common';
import { JwtService } from './../../shared/jwt.service';
import Swal from 'sweetalert2';
import { EditorModule } from "@tinymce/tinymce-angular";

export class User {
  name: string;
  email: string;
  id: string;
  username: string;
  status: string;
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


    constructor(private DataService: DataService, private http: HttpClient, private _location: Location,     public jwtService: JwtService,
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
      this.http.post('//backdev.mercurio-app.com/api/upload', myFormData, {
      headers: headers
      }).subscribe(data => {
       //Check success message
       //sweetalert message popup





      console.log('success')
      });

  }
/* file upload */

    ngOnInit(): void {

  this.getUsersData();
  this.getUserdraft();

    }

    getRtisData() {
      this.DataService.getDataByUser().subscribe(res => {
         this.rtis = res;
      });
    }

    insertData()  {

      this.DataService.insertData(this.rti).subscribe(res => {
         console.log(res);
         Swal.fire({
         //position: 'top-end',
         icon: 'success',
         title: 'RTI crée avec succès',
         html:

           '<a href="/#/loading">Rafraichir la page</a>',
         showConfirmButton: false,
         timer: 1800
         })

      });

    }

    getUserdraft() {
      this.DataService.getUserdraft().subscribe(res => {
         this.rtis = res;
      });
    }


    getUsersData() {

      this.DataService.getUsers().subscribe(res => {
         this.users = res;
      });
    }

    backClicked() {
   this._location.back();
 }

}
