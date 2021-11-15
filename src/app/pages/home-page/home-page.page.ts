import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComService } from 'src/app/services/com.service';
import { HttpService, url } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})


export class HomePagePage implements OnInit {

  public slideOpts = {
    slidesPerView: 1.6,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  categoryList = [];

  serachObj = {
    location:'',
    locationid:'',
    guest:'',
    type:'',
  }

  locationlist = [];
  locationSelected = false;
  constructor(private com:ComService, private http: HttpService,public route:Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.http.getData(url.category).then( (res: any) => {
      this.categoryList = res.data;
      console.log('res : ', res );
    });
  }

  onSearch(){
    if(!this.serachObj.location && !this.serachObj.guest && !this.serachObj.type){
      return false;
    }
    this.route.navigate(['/list'],{"queryParams":this.serachObj})
  }

  seletcCategory(categoryData){
    this.route.navigate(['/list'],{"queryParams":{'categoryid':categoryData.id,"category":categoryData.name}})
  }

  onLoginClick(){
    this.com.navCtrl.navigateForward('login-mobile-view');
  }

  onCreateUser(){
    this.com.navCtrl.navigateForward('list-with-us');
  }

  getLoction(event){
    if(this.locationSelected){
       this.locationSelected = false;
       return false; 
    }
    console.log(event.target.value);
    // For country
    let param = {
      search: event.target.value
    };

    // For state
    // let param = { 
    //   country_id:'101'
    // }

    // for city
    // let param = {
    //   state_id:'4008'
    // }
    this.http.getData(url.country,param).then( (res: any) => {
      console.log(res);
      if(res.data && res.data.length > 0){
        this.locationlist = res.data;
      }
    }).catch(error => {
      console.log(error);
      if(error.error.status == 400){
        this.errorCase( error.error.data.errors[0].param,error.error.data.errors[0].msg).then( (data) => {
          this.com.showToast(data);
        });
      }
    });
  }

  selectLocation(id,locationName){
    this.locationSelected = true;
    this.serachObj.location = locationName;
    this.serachObj.locationid = id;
    this.locationlist = [];
  }


  async errorCase(label, msg){
    console.log(label, msg)
    var message;
         switch(label){
          case "country_id":
             message =   msg.toLowerCase();
          break;
    
          case "search":
             message = 'Location ' +msg.toLowerCase();
          break;
    
          case "email":
             message = 'Email ' + msg.toLowerCase();
          break;
    
          case "business_mobile_number":
             message = 'Contact Number ' + msg.toLowerCase();
          break;
    
          default:
            break;
        }
        return message;
      }
}
