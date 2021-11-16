import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';
import { FirestoreService } from "src/app/services/data/firestore.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  song: any={};
  songId: any;
  constructor(private FS: FirestoreService,
              private AR: ActivatedRoute,
              private Router: Router,
              public AC: AlertController) { }

  ngOnInit() {
    this.songId = this.AR.snapshot.paramMap.get('id');
    this.song = this.FS.obtenerDetalleCancion(this.songId).valueChanges();
  }

  async BorrarCanc(){
    const Alert = await this.AC.create({message:'Estas seguro que deseas eliminar esta cancion?', buttons:[
      {
        text: 'Cancel', role: 'Cancel', handler: blah =>{
          console.log('Confirma Eliminacion: blah ');
        },
      },
      {
        text:'Okay', handler:()=> {this.FS.BorrarCancion(this.songId).then(()=> {this.Router.navigateByUrl(''); });
      },


    },]});
    await Alert.present();
  }

}
