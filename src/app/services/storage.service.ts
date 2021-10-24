import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(public _storage: Storage) {
    this.init();
   }


   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this._storage.create();
    this.storage = storage;
  }

   setData(key, value){
     return this.storage?.set(key, value);
   }

   async getData(key){
     var data;
    return this.storage?.get(key);   
   }
}
