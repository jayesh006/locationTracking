import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';
import { HttpService, url } from 'src/app/services/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {


  userType = [{label:'Customer', id: 4, type:'user'},{label:'Business', id: 3, type:'business'}]
  eye = true;
  passwordType = 'password';
  confirmPasswordeye = true;
  confirmPasswordType = 'password';

  firstName = null;
  lastName = null;
  email = null;
  phoneNumber = null;
  password = null;
  confirmPassword = null;
  selectedRole = null;

  constructor(private com: ComService, public http : HttpService) { }

  ngOnInit() {
  }



  goBack() {
    this.com.navCtrl.back();
  }

  onSignUpClick() {

    if(this.firstName == null || this.firstName.length == 0){
      this.com.showToast('First Name should not be Empty');
      return;
    }
    else if(this.lastName == null || this.lastName.length == 0){
      this.com.showToast('Last Name should not be Empty');
      return;
    }
    else if(this.email == null || this.email.length == 0){
      this.com.showToast('Email should not be Empty');
      return;
    }
    else if(this.phoneNumber == null || this.phoneNumber.length == 0){
      this.com.showToast('Phone Number should not be Empty');
      return
    }
    else if(this.password == null || this.password.length == 0){
      this.com.showToast('Password should not be Empty');
      return;
    }
    else if(this.confirmPassword == null || this.confirmPassword.length == 0){
      this.com.showToast('Confirm Password should not be Empty');
      return;
    }
    else if(this.password != this.confirmPassword){
      this.com.showToast('Password Not Match', 'bottom');
      return;
    }
    

    // return;
    let param = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone: this.phoneNumber,
      role: this.selectedRole,
      password: this.password,
      confirm_password: this.confirmPassword
    }
    this.http.postData(url.singUpAsCustomer, param ).then( (res: any) => {
      console.log(res);
      this.com.showToast(res.msg).then( () => {
        this.com.navCtrl.navigateRoot('verification')
      });

    } ).catch(error => {
      console.log(error);
      if(error.error.status == 400){
        this.errorCase( error.error.data.errors[0].param,error.error.data.errors[0].msg).then( (data) => {
          this.com.showToast(data);
        });
      }
    });
    // this.com.navCtrl.navigateForward('sign-up');
  }

 async errorCase(label, msg){
console.log(label, msg)
var message;
     switch(label){
      case "first_name":
         message = 'First Name ' + msg.toLowerCase();
      break;

      case "last_name":
         message = 'Last Name ' + msg.toLowerCase();
      break;

      case "email":
         message = 'Email ' + msg.toLowerCase();
      break;

      case "password":
         message = 'Password ' + msg.toLowerCase();
      break;

      case "phone":
         message = msg.toLowerCase();
      break;

      default:
        break;
    }
    return message;
  }

  onEyeClick() {
    if (this.eye == false) {
      this.eye = true;
      this.passwordType = 'password';
    }
    else {
      this.eye = false;
      this.passwordType = 'text';
    }
    // this.eye = this.eye == false ? true : false;
  }

  onConfirmPasswordEye() {
    if (this.confirmPasswordeye == false) {
      this.confirmPasswordeye = true;
      this.confirmPasswordType = 'password';
    }
    else {
      this.confirmPasswordeye = false;
      this.confirmPasswordType = 'text';
    }
  }

}
