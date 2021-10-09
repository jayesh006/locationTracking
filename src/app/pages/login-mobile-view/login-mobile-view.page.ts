import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login-mobile-view',
  templateUrl: './login-mobile-view.page.html',
  styleUrls: ['./login-mobile-view.page.scss'],
})
export class LoginMobileViewPage implements OnInit {

  userType = [{label:'Customer', id: 1, type:'user'},{label:'Business', id: 1, type:'business'}]
  constructor(private com:ComService, private http:HttpService) { 
    
  }

  ngOnInit() {
  }

  onSignUpCustomerClick() {
    this.com.navCtrl.navigateForward('sign-up');
  }

  onSignUpBusinessClick() {
    this.com.navCtrl.navigateForward('sign-up-business');
  }

  onLoginClick(){
    
    this.http.gettest().then( (res:any) => {
      console.log(res);
    })
  }

  goBack(){
    this.com.navCtrl.back();
  }

}
