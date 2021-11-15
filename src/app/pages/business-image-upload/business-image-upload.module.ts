import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessImageUploadPageRoutingModule } from './business-image-upload-routing.module';

import { BusinessImageUploadPage } from './business-image-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessImageUploadPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BusinessImageUploadPage]
})
export class BusinessImageUploadPageModule {}
