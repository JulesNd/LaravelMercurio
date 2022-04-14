import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Rti } from '../../rti';
import { ClipboardModule } from 'ngx-clipboard';
import { User } from '../../user';
import Swal from 'sweetalert2';
import {NgForm} from '@angular/forms';
import { JwtService } from './../../shared/jwt.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS , HttpEvent, HttpEventType } from '@angular/common/http';
import {Location} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';





@Component({
  selector: 'app-draftupload',
  templateUrl: './draftupload.component.html',
  styleUrls: ['./draftupload.component.css']
})
export class DraftuploadComponent implements OnInit {
  rti_id: any;
  rtis: any;
  data: any;
  users:any;
  user: User;
  progress: number = 0;
  rti = new Rti();


  constructor(private route:ActivatedRoute, private dataService: DataService, public jwtService: JwtService,private _location: Location, private http: HttpClient) { }

files: File[] = [];
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
   this.http.post('//backdev.mercurio-app.com/api/upload/'+ this.rti_id, myFormData, {
     reportProgress: true,
     observe: 'events',
   headers: headers
   }).subscribe(data => {
    //Check success message
    //sweetalert message popup










   console.log('success')
   });


   this.http.post('//backdev.mercurio-app.com/api/upload/'+ this.rti_id, myFormData, {
     reportProgress: true,
     observe: 'events',
   headers: headers
   }).subscribe((event: HttpEvent<any>) => {


     switch (event.type) {
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received!');
        break;
      case HttpEventType.UploadProgress:
        this.progress = Math.round(event.loaded / event.total * 100);
        console.log(`Uploaded! ${this.progress}%`);
        Swal.fire({
          title: '<strong>Le RTI à bien été chargé !</strong>',
          icon: 'success',
          html:

            '<a href="/#/loading">Rafraichir la page</a>',

          showCloseButton: false,
          showCancelButton: false,
          focusConfirm: false,
          showConfirmButton: false,

        })
        break;
      case HttpEventType.Response:
        console.log('User successfully created!', event.body);
        setTimeout(() => {
          this.progress = 0;
        }, 1500);

    }
   });



}




  ngOnInit(): void {
    this.rti_id =  this.route.snapshot.params.rti_id;
    this.getUserdraft();
    this.getDataForUpdate();
    this.getData();


  }

  getRtisData() {
    this.dataService.getDataByUser().subscribe(res => {
       this.rtis = res;
    });
  }



  getUserdraft() {
    this.dataService.getUserdraft().subscribe(res => {
       this.rtis = res;
    });
  }



  /* To copy Text from Textbox */
copyInputMessage(inputElement){
 inputElement.select();
 document.execCommand('copy');
 inputElement.setSelectionRange(0, 0);
}

getData() {
  this.dataService.getRtiById(this.rti_id).subscribe(res=> {
    //console.log(res);
    this.rtis = res;
  })
}



getDataForUpdate() {
  this.dataService.getForUpdate(this.rti_id).subscribe(res=> {
    //console.log(res);
    this.data = res
    this.rti = this.data;

  })
}






updateRti() {

this.dataService.updateData(this.rti_id, this.rti).subscribe(res=>{
  Swal.fire({
    title: '<strong>Le RTI à été mis à jour</strong>',
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
backClicked() {
this._location.back();
}

}
