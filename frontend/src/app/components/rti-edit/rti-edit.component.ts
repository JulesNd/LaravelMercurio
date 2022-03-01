import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Rti } from '../../rti';



declare var OpenLIME: any;
declare var layout: any;
declare var require: any;
const URL = require("url").URL;
declare var name: any;

@Component({
  selector: 'app-rti-edit',
  templateUrl: './rti-edit.component.html',
  styleUrls: ['./rti-edit.component.css']
})
export class RtiEditComponent implements OnInit {
rti_id: any;
  rtis: any ;
  rti = new Rti();

  constructor(private route:ActivatedRoute, private dataService: DataService) {



   }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params.id);
    this.rti_id =  this.route.snapshot.params.rti_id;
    this.getData();

    let lime = new OpenLIME.OpenLIME('#openlime');
 let layer = new OpenLIME.Layer({
   layout: 'itarzoom',
   normals: false,
   type:'rti',
   //url: 'assets/'+(this.IDrti)+'/info.json',

   url: './assets/'+(this.rti_id)+'/info.json',
   label: 'Layer'
 });
 lime.canvas.addLayer('Tome', layer);
 let ui = new OpenLIME.UIBasic(lime, { skin: 'assets/skin.svg' });
 ui.actions.light.active = true;
 ui.actions.layers.display = true;
 lime.camera.maxFixedZoom = 1;


  }

getData() {
  this.dataService.getRtiById(this.rti_id).subscribe(res=> {
    //console.log(res);
    this.rtis = res;
    this.rti = this.rtis;
  })
}
updateRti() {

this.dataService.updateData(this.rti_id, this.rti).subscribe(res=>{

});

}

}
