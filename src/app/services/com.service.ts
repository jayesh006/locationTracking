import { Injectable } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComService {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtr: ToastController) { 
  }

  showAlert(message?){
    return this.alertCtrl.create({message: message ? message : 'Please Wait !!', backdropDismiss: false, buttons: [{text: 'Okay'}]});
  }

  showToast(message, position?){
    return this.toastCtr.create({message :  message, position: position ? position : 'bottom',duration: 1000, color: 'primary'}).then( toastEl => {
      toastEl.present();
    });
  }
  
}
