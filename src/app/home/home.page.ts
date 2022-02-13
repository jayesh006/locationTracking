import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { Storage } from '@ionic/storage-angular';

declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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

  constructor(
    private geolocation: Geolocation,
    public navCtrl: NavController, private plt: Platform, private storage: Storage, private altCtrl: AlertController) {
      
  }


  async ngOnInit() {
    this.loadMap();
    // This will initialized the storage  
    await this.storage.create();
  }

  // start loading the map and show coordinates
  loadMap() {
    this.altCtrl.create({message:'Please wait while Map is loading', backdropDismiss: false}).then( loadEl =>{
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

//  Load the stored path
  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
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

}
