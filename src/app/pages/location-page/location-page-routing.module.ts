import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationPagePage } from './location-page.page';

const routes: Routes = [
  {
    path: '',
    component: LocationPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationPagePageRoutingModule {}
