import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBusinessUserPageRoutingModule } from './create-business-user-routing.module';

import { CreateBusinessUserPage } from './create-business-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBusinessUserPageRoutingModule
  ],
  declarations: [CreateBusinessUserPage]
})
export class CreateBusinessUserPageModule {}
