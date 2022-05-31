import { Component, OnInit, Input } from '@angular/core';
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
import { EditRtiFormComponent } from '../edit-rti-form/edit-rti-form.component';
import { AnnotationsComponent } from '../annotations/annotations.component';

declare var OpenLIME: any;
declare var require: any;
declare var layout: any;
const URL = require("url").URL;
declare var name: any;

@Component({
  selector: 'app-rti-edit',
  templateUrl: './rti-edit.component.html',
  styleUrls: ['./rti-edit.component.css']
})
export class RtiEditComponent implements OnInit {
  showFiller = false;
  rti_id: any;
  rtis: any;
  data: any;
  users:any;
  user: User;
  progress: number = 0;
  rti = new Rti();
  isModalActive: boolean = false;
  @Input() edit;
  constructor(private route:ActivatedRoute, private dataService: DataService, public jwtService: JwtService,private _location: Location, private http: HttpClient) {


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
         break;
       case HttpEventType.Response:
         console.log('User successfully created!', event.body);
         setTimeout(() => {
           this.progress = 0;
         }, 1500);

     }
    });

         Swal.fire({
           title: '<strong>Le RTI à bien été chargé !</strong>',
           icon: 'success',
           html:

             '<a href="/#/loading">Rafraichir la page</a> ',

           showCloseButton: false,
           showCancelButton: false,
           focusConfirm: false,
           showConfirmButton: false,

         })

}







  ngOnInit(): void {



    //REMPLACER TOUS LES annotation_id par rti_id

       //console.log(this.route.snapshot.params.id);
       this.rti_id =  this.route.snapshot.params.rti_id;
       this.getData();
       this.getDataForUpdate();
       this.getUsersData();


       let lime = new OpenLIME.OpenLIME('#openlime',{ background:'black'});
       OpenLIME.Skin.setUrl('/assets/js/Openlime/skin.svg');

       let layer0 = new OpenLIME.Layer({
          label: 'RTI',
            layout: 'itarzoom',  //VENIR RECUPERER this.layout
            type:'rti',
            url: '/assets/'+(this.rti_id)+'/info.json', //this.rti_id
     normals: false
    });


    let layer1 = new OpenLIME.Layer({
       label: 'Image',
         layout: 'tarzoom',  //VENIR RECUPERER this.layout
         type:'image',
         url: '/assets/'+(this.rti_id)+'/image.tzi', //this.rti_id
  normals: false
 });


 /** ADD LAYERS **/


       lime.canvas.addLayer('RTI', layer0);
       lime.canvas.addLayer('Image', layer1);


        /** ADD LAYERS **/

    /*
    if autodetectimage()
    {
        let layerimage= new OpenLIME.Layer({
         label: 'Image',
     layout: 'tarzoom',  //TOUJOURS TARZOOM POUR IMAGE
     type:'image',
     url: '/assets/'+(this.annotation_id)+'/image.tzi', //this.rti_id
     normals: false
    });
       lime.canvas.addLayer('IMAGE', layerimage);
    }
    */

       lime.camera.maxFixedZoom = 4;

       let ui = new OpenLIME.UIBasic(lime);
       ui.actions.snapshot.display = false;
       ui.actions.help.display = true;
       ui.actions.help.html = `
       <h2>Aide</h2>
       <p>Si la lumière est éteinte, cliquez et déplacez pour déplacer l'image</p>
       <p>Si la lumière est allumée, cliquez et déplacez pour déplacer la lumière
       Cliquez sur la lumière pour changer sa fonction</p>
       `;



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


getUsersData() {

  this.dataService.getUsers().subscribe(res => {
     this.users = res;
  });
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


toggleModal() {
  this.isModalActive = !this.isModalActive;
}
refresh(): void {
    window.location.reload();
}
}
