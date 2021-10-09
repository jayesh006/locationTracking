import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpBusinessPage } from './sign-up-business.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpBusinessPageRoutingModule {}
