import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.page.html',
  styleUrls: ['./create-password.page.scss'],
})
export class CreatePasswordPage implements OnInit {

  eye = true;
  passwordType = 'password';

  confirmPasswordeye = true;
  confirmpasswordType = 'password';

  constructor(private com: ComService) { }

  ngOnInit() {
  }

  onEyeClick() {
    if(this.eye == false){
      this.eye = true;
      this.passwordType = 'password';
    }
    else {
      this.eye = false;
      this.passwordType = 'text';
    }
    // this.eye = this.eye == false ? true : false;
  }

  confirmPassowrdEyeClick() {
    if(this.confirmPasswordeye == false){
      this.confirmPasswordeye = true;
      this.confirmpasswordType = 'password';
    }
    else {
      this.confirmPasswordeye = false;
      this.confirmpasswordType = 'text';
    }
    // this.eye = this.eye == false ? true : false;
  }

  goBack(){
    this.com.navCtrl.back();
  }

}
