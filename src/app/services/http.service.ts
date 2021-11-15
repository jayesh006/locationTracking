import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const root = 'https://bookmyoccasion.com/';
export const url = {
  login: root + 'user/login',
  singUpAsCustomer: root + 'user',
  signUpAsBusiness: root + 'business-details/create',
  country: root + 'world/country',
  state: root + 'world/state',
  city: root + 'world/city',
  category: root + 'categories',
};


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


  login(data){
    return new Promise( (resolve, reject) => {
      this.http.post(url.login, data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  postData(api,data, token?){
    return new Promise( (resolve, reject) => {
      let header = new HttpHeaders();
      header = header.set('token', token)
      this.http.post(api, data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      )
    } );
  }

  getData(api,param=null,token?, offset=null){

    
    let endPoint = api;
    if(param != null){
      for(let key in param){
        endPoint += "?"+ key +"=" +param[key];
        endPoint += "&";
      }
      endPoint = endPoint.substr(0,endPoint.length - 1);
    }

    if(offset != null){
      if(param == null ){
        endPoint += 'offset='+offset;
      }
      else {
        endPoint += '&offset=' + offset;
      }
    }
    console.log(endPoint)
    // console.log(Object.values(param)[0]);
    // let data = '?'+Object.keys(param)[0]+'='+Object.values(param)[0]
    return new Promise( (resolve, reject) => {

      this.http.get(endPoint).subscribe(
        (res) => {
          resolve(res);
        },
        (error) =>{
          reject(error);
        }
      )
    });
  }

}
