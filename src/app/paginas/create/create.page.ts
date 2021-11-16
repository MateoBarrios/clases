import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from'@angular/forms';
import { LoadingController, AlertController } from "@ionic/angular";
import { FirestoreService } from "src/app/services/data/firestore.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createSongForm: any;
  constructor( public LC: LoadingController, 
               public AC: AlertController, 
               public FS: FirestoreService,
               public Router: Router,
               public FB: FormBuilder) {
  this.createSongForm = FB.group({
    albumName: ['',Validators.required],
    artistName: ['',Validators.required],
    songDescription: ['',Validators.required],
    songName: ['',Validators.required],
  });            
}

  ngOnInit() {
  }

  async crearCancion(){
    const loading = await this.LC.create();
    const albumName = this.createSongForm.value.albumName;
    const artistName = this.createSongForm.value.artistName;
    const songName = this.createSongForm.value.songName;
    const songDescription = this.createSongForm.value.songDescription;

    this.FS.crear_cancion(albumName,artistName,songDescription,songName).then(
      ()=>{
        loading.dismiss().then(()=>
          {this.Router.navigateByUrl('');}
        );
    }, error =>{
    console.error(error);
    });
    
    return await loading.present();
 
  }
}
