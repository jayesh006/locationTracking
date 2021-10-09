import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full'
  },
  {
    path: 'login-mobile-view',
    loadChildren: () => import('./pages/login-mobile-view/login-mobile-view.module').then( m => m.LoginMobileViewPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./pages/home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'list-with-us',
    loadChildren: () => import('./pages/list-with-us/list-with-us.module').then( m => m.ListWithUsPageModule)
  },
  {
    path: 'create-business-user',
    loadChildren: () => import('./pages/create-business-user/create-business-user.module').then( m => m.CreateBusinessUserPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
