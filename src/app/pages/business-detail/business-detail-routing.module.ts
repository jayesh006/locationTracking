import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessDetailPage } from './business-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessDetailPageRoutingModule {}
