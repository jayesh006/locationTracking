import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http:HttpClient) { }

  gettest(){
   return new Promise( (resolve, reject) => {
      this.http.get('https://run.mocky.io/v3/9f8b44e6-8f46-4198-8423-2dc15d1b7bf3').subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
