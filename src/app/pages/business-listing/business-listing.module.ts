import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessListingPageRoutingModule } from './business-listing-routing.module';

import { BusinessListingPage } from './business-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessListingPageRoutingModule
  ],
  declarations: [BusinessListingPage]
})
export class BusinessListingPageModule {}
