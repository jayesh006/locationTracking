import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPagePageRoutingModule } from './location-page-routing.module';

import { LocationPagePage } from './location-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPagePageRoutingModule
  ],
  declarations: [LocationPagePage]
})
export class LocationPagePageModule {}
