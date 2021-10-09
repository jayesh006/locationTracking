import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  constructor(private com:ComService) { }

  ngOnInit() {
  }

  onLoginClick(){
    this.com.navCtrl.navigateForward('login-mobile-view');
  }

  onCreateUser(){
    this.com.navCtrl.navigateForward('list-with-us');
  }

  getLoction(event){
    console.log(event.target.value);
  }

}
