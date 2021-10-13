import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(private com: ComService) { }

  ngOnInit() {
  }

  goBack(){
    this.com.navCtrl.back();
  }

  sendCode(){
    this.com.navCtrl.navigateForward('verification');
  }

}
