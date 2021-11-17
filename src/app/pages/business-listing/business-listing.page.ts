import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-business-listing',
  templateUrl: './business-listing.page.html',
  styleUrls: ['./business-listing.page.scss'],
})
export class BusinessListingPage implements OnInit {

  constructor(private com: ComService) { }

  ngOnInit() {
  }

  goBack(){
    this.com.navCtrl.back();
  }

}
