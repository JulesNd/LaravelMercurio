import { Component, OnInit } from '@angular/core';
import { Rti } from '../../rti';
import { DataService } from '../../service/data.service';
import {ActivatedRoute } from '@angular/router';



declare var OpenLIME: any;
declare var layout: any;
declare var require: any;
const URL = require("url").URL;
declare var name: any;
declare var skin: any;


@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {
  annotation_id: any;
  rtis: any;
  rti = new Rti();

  constructor(private route:ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.annotation_id =  this.route.snapshot.params.annotation_id;
    this.getData();
    console.log(this.annotation_id);

    var idannojson = this.annotation_id;

  let lime = new OpenLIME.OpenLIME('#openlime', { canvas: { preserveDrawingBuffer: true} });

  let layer0 = new OpenLIME.Layer({
  label: 'Type de vues',
  layout: 'itarzoom',
  type:'rti',
  //	url: 'Data/ptm_lowdef_mask/info.json',
  url: '/assets/'+(this.annotation_id)+'/info.json',
  normals: false
  });

  let layer1 = new OpenLIME.Layer({
  label: 'Test',
  layout: 'itarzoom',
  type:'image',
  //	url: 'Data/ptm_lowdef_mask/info.json',
  url: '/assets/'+(this.annotation_id)+'/info.json',
  normals: false
  });
  lime.canvas.addLayer('fossil', layer0);
  lime.canvas.addLayer('TEST', layer1);

  let anno = new OpenLIME.SvgAnnotationLayer({
  label: 'Annotations',
  layout: layer0.layout,
  style:`
    .openlime-annotation { pointer-events:stroke; opacity: 0.7; }
    .openlime-annotation:hover { cursor:pointer; opacity: 1.0; }

    :focus { fill:yellow; }
    path { fill:none; stroke-width:2; stroke:#000; vector-effect:non-scaling-stroke; pointer-events:all; }
    path:hover { cursor:pointer; stroke:#f00; }

    rect { fill:rgba(255, 0, 0, 0.2); stroke:rgba(127, 0, 0, 0.7); vector-effect:non-scaling-stroke;}
    circle { fill:rgba(255, 0, 0, 0.2); stroke:#800; stroke-width:1px; vector-effect:non-scaling-stroke; pointer-events:all;  }
    circle.point { stroke-width:10px }
    .selected { stroke:#ff0000 !important; stroke-width:3; }
    `,
  infoTemplate: (annotation) => { return `
    <h3>${annotation.class}</h3>
    <p>${annotation.description}</p>
    `; },
  annotations: '/assets/js/annotations/json_eloi.php?idannojson='+idannojson,
  editable: true,
  });

  lime.canvas.addLayer('anno', anno); //here the overlayelement created and attached to layer

  lime.camera.maxFixedZoom = 4;

  OpenLIME.Skin.setUrl('/assets/js/annotations/skin.svg');

  let editor = new OpenLIME.SvgAnnotationEditor(lime, anno, {
  lime: lime,
  classes: {
    '': { stroke: '#000', label: '' },
    'class1': { stroke: '#770', label: 'A' },
    'class2': { stroke: '#707', label: 'B' },
    'class3': { stroke: '#777', label: 'C' },
    'class4': { stroke: '#070', label: 'D' },
    'class5': { stroke: '#007', label: 'E' },
    'class6': { stroke: '#077', label: 'F' },
  }
  });

  let ui = new OpenLIME.UIBasic(lime);
  ui.actions.snapshot.display = true;
  ui.actions.help.display = true;
  ui.actions.help.html = `
  <h2>Help</h2>
  <p>Si la lumière est éteinte, cliquez et déplacez pour déplacer l'image</p>
  <p>Si la lumière est allumée, cliquez et déplacez pour déplacer la lumière
  Cliquez sur la lumière pour changer sa fonction</p>

  <p>Cliquez sur l'icone <b>Calques</b> pour afficher les annotations
  Selectionnez une annotations et activez l'outil "dessin" en cliquant dessus.</p>
  <p>Commencez un dessin libre en cliquant sur une petite distance, vous pouvez le continuer en
  cliquand point par point. Pour commencer une nouvelle trace, il faut garder cliqué et bouger
  légèrmeent la souris.</p>

  <p>En mode <b>Annotation</b>, la combinaison <i>Majuscule</i> + clic et déplacement fait bouger la lumière
  La combinaison <i>Alt</i> + clic et déplacement fait bouger l'image
  Le bouton annuler permet d'annuler, il est possible aussi de faire <i>Ctrl</i>+z</p>
  `;

  editor.createCallback = (anno) => { console.log("Created annotation: ", anno); processRequest(anno, 'create'); return true; };
  editor.deleteCallback = (anno) => { console.log("Deleted annotation: ", anno); processRequest(anno, 'delete'); return true; };
  editor.updateCallback = (anno) => { console.log("Updated annotation: ", anno); processRequest(anno, 'update'); return true; };

  editor.multiple = true;



  async function processRequest(anno, action) {
  anno.action = action;
  anno.idannojson = idannojson;
  const response = await fetch('/assets/js/annotations/json_eloi.php', {method: 'POST', body: JSON.stringify(anno)});
  if (!response.ok) {
     const message = `An error has occured: ${response.status} ${response.statusText} `;
     alert(message);
     throw new Error(message);
  }
  let json = await response.json();
  if(json.status == 'error')
    alert(json.msg);
  console.log(json);
  }



  }

  getData() {
    this.dataService.getRtiById(this.annotation_id).subscribe(res=> {
      //console.log(res);
      this.rtis = res;
    })
  }

}
