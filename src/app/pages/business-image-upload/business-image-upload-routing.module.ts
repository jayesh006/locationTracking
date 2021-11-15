import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessImageUploadPage } from './business-image-upload.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessImageUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessImageUploadPageRoutingModule {}
