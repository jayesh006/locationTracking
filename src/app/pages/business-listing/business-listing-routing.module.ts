import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessListingPage } from './business-listing.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessListingPageRoutingModule {}
