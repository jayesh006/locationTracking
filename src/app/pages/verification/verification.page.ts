import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  constructor(private com: ComService) { }

  ngOnInit() {
  }

  goBack(){
    this.com.navCtrl.back();
  }

  verify(){
    this.com.navCtrl.navigateForward('create-password');
  }
}
