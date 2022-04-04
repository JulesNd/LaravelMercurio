import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Rti } from '../../rti';
import { ClipboardModule } from 'ngx-clipboard';
import { User } from '../../user';
import Swal from 'sweetalert2';
import { JwtService } from './../../shared/jwt.service';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';

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
  rti_id: any;
  rtis: any;
  data: any;
  users:any;
  user: User;

  rti = new Rti();

  constructor(private route:ActivatedRoute, private dataService: DataService, public jwtService: JwtService,private _location: Location) {


    this.jwtService.profile().subscribe((res:any) => {
      this.user = res;
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
       OpenLIME.Skin.setUrl('/assets/js/skin.svg');

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
backClicked() {
this._location.back();
}
}
