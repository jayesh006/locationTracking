import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';
import { HttpService, url } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login-mobile-view',
  templateUrl: './login-mobile-view.page.html',
  styleUrls: ['./login-mobile-view.page.scss'],
})
export class LoginMobileViewPage implements OnInit {

  userType = [{label:'Customer', id: 4, type:'user'},{label:'Business', id: 3, type:'business'}]
  // userName = 'vedaakp@gmail.com';
  // password = 'pawan@123';
  userName = null;
  password = null;
  selectedRole = null;
  constructor(private com:ComService, private http:HttpService, public storage: StorageService) { 
    
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

    console.log(this.userName, this.password, this.selectedRole)
    let param = {
      email: this.userName,
      role: this.selectedRole,
      password: this.password
    }

    this.http.postData(url.login,param).then( (res: any) => {
      console.log(res);
      this.com.showToast(res.msg, 'bottom'); 
      this.storage.setData('userData', res.data).then( () => {
        this.com.navCtrl.navigateRoot('home-page');
      });

    }).catch(error => {
      console.log(error);
      if(error.error.status == 400){
        this.com.showToast(error.error.data.errors[0].msg, 'top');
      }
      else if(error.error.status == 401){
        this.com.showToast(error.error.message, 'top');
      }
    });
    
    // this.http.gettest().then( (res:any) => {
    //   console.log(res);
    // })
  }

  goBack(){
    this.com.navCtrl.back();
  }

  goToRestPasswordPage(){
    this.com.navCtrl.navigateForward('reset-password');
  }

}
