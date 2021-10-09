import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-list-with-us',
  templateUrl: './list-with-us.page.html',
  styleUrls: ['./list-with-us.page.scss'],
})
export class ListWithUsPage implements OnInit {

  constructor(private com : ComService) { }

  ngOnInit() {
  }

  goBack(){
    this.com.navCtrl.back();
    }

  onApplyNowClick(){
    this.com.navCtrl.navigateForward('create-business-user');
  }

}
