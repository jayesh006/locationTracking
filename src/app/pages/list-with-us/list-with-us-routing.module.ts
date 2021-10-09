import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListWithUsPage } from './list-with-us.page';

const routes: Routes = [
  {
    path: '',
    component: ListWithUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListWithUsPageRoutingModule {}
