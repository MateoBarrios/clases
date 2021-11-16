import { Injectable } from '@angular/core';
import { Song } from 'src/app/song';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  crear_cancion(albumName: string,
                artistName: string,
                songDescription: string,
                songName: string ): Promise<void>{
    const id = this.firestore.createId();
    return this.firestore.doc(`songList/${id}`).set({id,albumName,artistName,songDescription,songName});
  }

  obtenerListaCancion():AngularFirestoreCollection<Song>{
    return this.firestore.collection(`songList`);
  }

  obtenerDetalleCancion(songId: string): AngularFirestoreDocument<Song>{
    return this.firestore.collection(`songList`).doc(songId)
  }

  BorrarCancion(songId: string): Promise<void>{
    return this.firestore.doc(`songList/${songId}`).delete();
  }
}
