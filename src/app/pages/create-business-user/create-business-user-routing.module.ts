import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBusinessUserPage } from './create-business-user.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBusinessUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBusinessUserPageRoutingModule {}
