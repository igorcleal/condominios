import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirestoreService {

  constructor(public db: AngularFirestore) { }

  salvar(collection:string,obj) {
    return this.db.collection('condominios').add(obj)
  }

}
