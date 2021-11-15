import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessHomepagePageRoutingModule } from './business-homepage-routing.module';

import { BusinessHomepagePage } from './business-homepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessHomepagePageRoutingModule
  ],
  declarations: [BusinessHomepagePage]
})
export class BusinessHomepagePageModule {}
