import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>; 

  constructor(private afs: AngularFirestore) { 
    //this.items = this.afs.collection('items').valueChanges();
    this.itemsCollection = this.afs.collection<Item>('items', ref => ref.orderBy('title', 'asc'));
    this.items = this.afs.collection('items').snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item
          data.id = a.payload.doc.id;
          return data;
        });
      }));

  }

  getItems(){
    return this.items;
  }

  addItem(item: Item){
    this.itemsCollection.add(item)
  }

  deleteItem(item: Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}



interface Item {
  id?:string;
  title?:string;
  description?:string;
}
