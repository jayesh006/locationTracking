import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpBusinessPageRoutingModule } from './sign-up-business-routing.module';

import { SignUpBusinessPage } from './sign-up-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpBusinessPageRoutingModule
  ],
  declarations: [SignUpBusinessPage]
})
export class SignUpBusinessPageModule {}
