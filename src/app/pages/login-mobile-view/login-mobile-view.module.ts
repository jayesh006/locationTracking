import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginMobileViewPageRoutingModule } from './login-mobile-view-routing.module';

import { LoginMobileViewPage } from './login-mobile-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginMobileViewPageRoutingModule
  ],
  declarations: [LoginMobileViewPage]
})
export class LoginMobileViewPageModule {}
