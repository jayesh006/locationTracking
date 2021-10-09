import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-sign-up-business',
  templateUrl: './sign-up-business.page.html',
  styleUrls: ['./sign-up-business.page.scss'],
})
export class SignUpBusinessPage implements OnInit {

  selectedButton = 'owner';
  venderStyle = '--background: #FAC800; color: black';
  vender1Style = '--background: #E5E5E5; color: black';

  constructor(private com:ComService) { }

  ngOnInit() {
  }

  goBack(){
    this.com.navCtrl.back();
  }

  onOwnerClic(){
    this.selectedButton = 'owner';
    this.venderStyle = '--background: #FAC800; color: black';
    this.vender1Style = '--background: #E5E5E5; color: black';

  }

  onCustomerClick(){
    this.selectedButton = 'customer';
    this.vender1Style = '--background: #FAC800; color: black';
    this.venderStyle = '--background: #E5E5E5; color: black';

  }

}
