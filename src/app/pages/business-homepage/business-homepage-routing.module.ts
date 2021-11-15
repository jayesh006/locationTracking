import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessHomepagePage } from './business-homepage.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessHomepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessHomepagePageRoutingModule {}
