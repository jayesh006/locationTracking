import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginMobileViewPage } from './login-mobile-view.page';

const routes: Routes = [
  {
    path: '',
    component: LoginMobileViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginMobileViewPageRoutingModule {}
