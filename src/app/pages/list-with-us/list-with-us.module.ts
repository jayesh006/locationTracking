import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListWithUsPageRoutingModule } from './list-with-us-routing.module';

import { ListWithUsPage } from './list-with-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListWithUsPageRoutingModule
  ],
  declarations: [ListWithUsPage]
})
export class ListWithUsPageModule {}
