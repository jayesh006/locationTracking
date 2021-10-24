import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';
import { HttpService, url } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sign-up-business',
  templateUrl: './sign-up-business.page.html',
  styleUrls: ['./sign-up-business.page.scss'],
})
export class SignUpBusinessPage implements OnInit {

  selectedButton = 'vendor';
  venderStyle = '--background: #FAC800; color: black';
  vender1Style = '--background: #E5E5E5; color: black';
  userData;
  
  vendorBusinessName = null;
  vendorCity = null;
  vendorName = null;
  vendorContactNumber = null;
  vendorEmail = null;
  vendorTypeOfBusiness = null;
  vendorBusinessLink = null;
  vendorBusinessDescription = null;
  vendorBusinessAddress = null;
  vendorBusinessPincode = null;

  venueBusinessName = null;
  venueCity = null;
  venueName = null;
  venueContactNumber = null;
  venueEmail = null;
  venueTypeOfBusiness = null;
  venueBusinessLink = null;
  venueBusinessDescription = null;
  venueBusinessAddress = null;
  venueBusinessPincode = null;

  constructor(private com:ComService, private storage: StorageService, private http: HttpService) { 
    
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.getData('userData').then( (data: any) =>{
      // alert(data)
      this.userData = data;
      console.log(this.userData , 'User Data')
    });
  }

  goBack(){
    this.com.navCtrl.back();
  }

  onOwnerClic(){
    this.selectedButton = 'vendor';
    this.venderStyle = '--background: #FAC800; color: black';
    this.vender1Style = '--background: #E5E5E5; color: black';

  }

  onCustomerClick(){
    this.selectedButton = 'venue';
    this.vender1Style = '--background: #FAC800; color: black';
    this.venderStyle = '--background: #E5E5E5; color: black';

  }

  signUpasVendor(){
    if(this.vendorBusinessName ==  null  || this.vendorBusinessName.length == 0){
      this.com.showToast('Business Name cannot be Blank');
      return;
    }
    else if(this.vendorCity == null || this.vendorCity.length == 0){
      this.com.showToast('City Cannot be Blank');
      return;
    }
    else if(this.vendorBusinessAddress ==  null  || this.vendorBusinessAddress.length == 0){
      this.com.showToast('Business Address cannot be Blank');
      return;
    }
    else if(this.vendorBusinessPincode == null || this.vendorBusinessPincode.length == 0){
      this.com.showToast('Business Pincode cannot be Blank');
      return;
    }
    else if(this.vendorBusinessName ==  null  || this.vendorBusinessName.length == 0){
      this.com.showToast('Business Name cannot be Blank');
      return;
    }
    else if(this.vendorName == null || this.vendorName.length == 0){
      this.com.showToast('Vendor Name Cannot be Blank');
      return;
    }
    else if(this.vendorContactNumber ==  null  || this.vendorContactNumber.length == 0){
      this.com.showToast('Business Contact Number cannot be Blank');
      return;
    }
    else if(this.vendorEmail == null || this.vendorEmail.length == 0){
      this.com.showToast('Email Cannot be Blank');
      return;
    }


    let param = {
      user_id : this.userData.user_id,
      business_name : this.vendorBusinessName,
      business_address : this.vendorBusinessAddress,
      category_id : 1,
      city : this.vendorCity,
      "state":"Maharashtra",
      pincode : this.vendorBusinessPincode,
      business_mobile_number : this.vendorContactNumber,
      business_link : this.vendorBusinessLink,
      business_description : this.vendorBusinessDescription,
      email : this.vendorEmail,
      user_name : this.vendorName
    }

    // console.log(param);

    this.http.postData(url.signUpAsBusiness,param).then( (res: any) =>{
      console.log(res)
      this.com.showToast(res.msg).then( () => {
        this.com.navCtrl.navigateRoot('home-page')
      });
    }).catch(error => {
      console.log(error, 'error in response')
      if(error.error.status == 400){
        this.errorCase( error.error.data.errors[0].param,error.error.data.errors[0].msg).then( (data) => {
          this.com.showToast(data);
        });
      }
    });
  }


  signUpasVenue(){
    if(this.venueBusinessName ==  null  || this.venueBusinessName.length == 0){
      this.com.showToast('Business Name cannot be Blank');
      return;
    }
    else if(this.venueCity == null || this.venueCity.length == 0){
      this.com.showToast('City Cannot be Blank');
      return;
    }
    else if(this.venueBusinessAddress ==  null  || this.venueBusinessAddress.length == 0){
      this.com.showToast('Business Address cannot be Blank');
      return;
    }
    else if(this.venueBusinessPincode == null || this.venueBusinessPincode.length == 0){
      this.com.showToast('Business Pincode cannot be Blank');
      return;
    }
    else if(this.venueBusinessName ==  null  || this.venueBusinessName.length == 0){
      this.com.showToast('Business Name cannot be Blank');
      return;
    }
    else if(this.venueName == null || this.venueName.length == 0){
      this.com.showToast('Venue Name Cannot be Blank');
      return;
    }
    else if(this.venueContactNumber ==  null  || this.venueContactNumber.length == 0){
      this.com.showToast('Business Contact Number cannot be Blank');
      return;
    }
    else if(this.venueEmail == null || this.venueEmail.length == 0){
      this.com.showToast('Email Cannot be Blank');
      return;
    }


    let param = {
      user_id : this.userData.user_id,
      business_name : this.venueBusinessName,
      business_address : this.venueBusinessAddress,
      category_id : 2,
      city : this.venueCity,
      "state":"Maharashtra",
      pincode : this.venueBusinessPincode,
      business_mobile_number : this.venueContactNumber,
      business_link : this.venueBusinessLink,
      business_description : this.venueBusinessDescription,
      email : this.venueEmail,
      user_name : this.venueName
    }

    // console.log(param);

    this.http.postData(url.signUpAsBusiness,param).then( (res: any) =>{
      console.log(res)
      this.com.showToast(res.msg).then( () => {
        this.com.navCtrl.navigateRoot('home-page')
      });
    }).catch(error => {
      console.log(error, 'error in response')
      if(error.error.status == 400){
        this.errorCase( error.error.data.errors[0].param,error.error.data.errors[0].msg).then( (data) => {
          this.com.showToast(data);
        });
      }
    });
  }


  async errorCase(label, msg){
    console.log(label, msg)
    var message;
         switch(label){
          case "business_address":
             message = 'Business Address ' + msg.toLowerCase();
          break;
    
          case "pincode":
             message = 'Business Pincode ' + msg.toLowerCase();
          break;
    
          case "email":
             message = 'Email ' + msg.toLowerCase();
          break;
    
          case "business_mobile_number":
             message = 'Contact Number ' + msg.toLowerCase();
          break;
    
          default:
            break;
        }
        return message;
      }

}
