import { Component, OnInit } from '@angular/core';
import { Rti } from '../../rti';
import { DataService } from '../../service/data.service';
import {ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';



declare var OpenLIME: any;
declare var require: any;
const URL = require("url").URL;
declare var name: any;
declare var layout: any;

export class User {
  name: string;
  email: string;
  id: string;
  username: string;
  role: string;
}

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {
  rti_id: any;
  rtis: any;
  data: any;
  rti = new Rti();
  user: User;


  constructor(private route:ActivatedRoute, private dataService: DataService, private _location: Location,) { }

  ngOnInit(): void {


    this.rti_id =  this.route.snapshot.params.rti_id;
    this.getData();


    var idannojson = this.rti_id;

    let lime = new OpenLIME.OpenLIME('#openlime', { canvas: { preserveDrawingBuffer: true} });

    let layer0 = new OpenLIME.Layer({
    	label: 'RTI',
    	layout: 'itarzoom',
    	type:'rti',
    //	url: 'Data/ptm_lowdef_mask/info.json',
    	url: '/assets/'+(this.rti_id)+'/info.json',
    	normals: false
    });

    let layer1 = new OpenLIME.Layer({
       label: 'Image',
         layout: 'tarzoom',  //VENIR RECUPERER this.layout
         type:'image',
         url: '/assets/'+(this.rti_id)+'/image.tzi', //this.rti_id
  normals: false
 });


    lime.canvas.addLayer('RTI', layer0);
    lime.canvas.addLayer('Image', layer1);

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

  //  lime.camera.maxFixedZoom = 4;

    OpenLIME.Skin.setUrl('/assets/js/Openlime/skin.svg');

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
    <p>Si la lumi??re est ??teinte, cliquez et d??placez pour d??placer l'image</p>
    <p>Si la lumi??re est allum??e, cliquez et d??placez pour d??placer la lumi??re
    Cliquez sur la lumi??re pour changer sa fonction</p>

    <p>Cliquez sur l'icone <b>Calques</b> pour afficher les annotations
    Selectionnez une annotations et activez l'outil "dessin" en cliquant dessus.</p>
    <p>Commencez un dessin libre en cliquant sur une petite distance, vous pouvez le continuer en
    cliquand point par point. Pour commencer une nouvelle trace, il faut garder cliqu?? et bouger
    l??g??rmeent la souris.</p>

    <p>En mode <b>Annotation</b>, la combinaison <i>Majuscule</i> + clic et d??placement fait bouger la lumi??re
    La combinaison <i>Alt</i> + clic et d??placement fait bouger l'image
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
    this.dataService.getRtiById(this.rti_id).subscribe(res=> {
      //console.log(res);
      this.rtis = res;
    })
  }


  backClicked() {
 this._location.back();
}




}
