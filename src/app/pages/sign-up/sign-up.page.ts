import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {


userType = [{label:'User', id: 1, type:'user'},{label:'Business', id: 1, type:'business'}]
  constructor(private com:ComService) { }

  ngOnInit() {
  }

  

  goBack(){
    this.com.navCtrl.back();
  }

  onSignUpClick() {
    this.com.navCtrl.navigateForward('sign-up');
  }

}
