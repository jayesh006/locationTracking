import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { alertController } from '@ionic/core';


declare var google:any;

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.page.html',
  styleUrls: ['./location-page.page.scss'],
})
export class LocationPagePage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
 
  positionSubscription: Subscription;

  address: string;

  latitude: number;
  longitude: number;
  showHide = true;

   // geocoder options
   nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(public plt: Platform, public androidPer: AndroidPermissions, public locationAccuracy: LocationAccuracy, public geolocation: Geolocation, private storage: Storage,public nativeGeocoder: NativeGeocoder, public altCtr: AlertController, public loadCtrl: LoadingController) { }

 async ngOnInit() {
    this.loadMap();
    await this.storage.create();
  }

  whereIAm(){
    this.plt.ready().then( () => {
      this.androidPer.checkPermission(this.androidPer.PERMISSION.ACCESS_COARSE_LOCATION).then(result => {
        if(result.hasPermission){
          console.log('Inside if : ', result.hasPermission);
          this.askToTurnOnGPS();
        }else{
          this.requestGPSPermission();
          console.log('Inside else ')
        }
      }, err => {
        console.log('android permission error ', err)
      })
    });

  }


  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPer.requestPermission(this.androidPer.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        console.log('Here 2')
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('res : ', resp)
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.showHide = false;
            this.getAddress(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      alert('Error getting location 1' + error);
    });
  }

  // Start tracing the coords
  startTracking() {
    this.showHide = true;
    this.isTracking = true;
    this.trackedRoute = [];
 
    // will the watch tha coords postion
    this.positionSubscription = this.geolocation.watchPosition().subscribe((data:any) => {
      console.log(data,"@@@")
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
        }, 0);
      });

 
  }
 
  // draw the line on map
  redrawPath(path) {
    console.log(path,'####')
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
 
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 10
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

// stop the tracking
stopTracking() {
  let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
  this.previousTracks.push(newRoute);
  this.storage.set('routes', this.previousTracks);
 
  this.isTracking = false;
  this.positionSubscription.unsubscribe();
  this.currentMapTrack.setMap(null);
}
 
// show stored routes
showHistoryRoute(route) {
  this.redrawPath(route);
}

 // start loading the map and show coordinates
 loadMap() {
  this.loadCtrl.create({message:'Please wait while Map is loading', backdropDismiss: false}).then( loadEl =>{
    loadEl.present();
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {
        this.showHide = true;

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        // this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
      this.showHide = false;
      loadEl.dismiss();

    }).catch((error) => {
      loadEl.dismiss();
      console.log('Error getting location', error);
    });
  })
}

// get Address
getAddress(lat,long){
  console.log('Late : ', lat, long)
  this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
  .then((res: NativeGeocoderResult[]) => {
    console.log('res', res);
    this.address = this.pretifyAddress(res[0]);
     this.altCtr.create({
    header: 'Alert',
    subHeader: 'Subtitle',
    message: this.address,
    buttons: ['OK']}).then(alt => {
      alt.present();
    })
  })
  .catch((error: any) => {
    alert('Error getting location 3'+ JSON.stringify(error));
  });
}
// address
pretifyAddress(address){
  let obj = [];
  let data = "";
  for (let key in address) {
    if(key != 'subThoroughfare')
      obj.push(address[key]);
    
  }
  obj.reverse();
  for (let val in obj) {
    if(obj[val].length)
    data += obj[val]+', ';
  }console.log('ihdjsbd : ', data)
  // return address.slice(0, -2);
  return data;
}

}
