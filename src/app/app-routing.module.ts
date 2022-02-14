import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'location-page',
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
  {
    path: 'sign-up-business',
    loadChildren: () => import('./pages/sign-up-business/sign-up-business.module').then( m => m.SignUpBusinessPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./pages/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'create-password',
    loadChildren: () => import('./pages/create-password/create-password.module').then( m => m.CreatePasswordPageModule)
  },
  {
    path: 'business-image-upload',
    loadChildren: () => import('./pages/business-image-upload/business-image-upload.module').then( m => m.BusinessImageUploadPageModule)
  },
  {
    path: 'business-detail',
    loadChildren: () => import('./pages/business-detail/business-detail.module').then( m => m.BusinessDetailPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/business-listing/business-listing.module').then( m => m.BusinessListingPageModule)
  },
  {
    path: 'business-homepage',
    loadChildren: () => import('./pages/business-homepage/business-homepage.module').then( m => m.BusinessHomepagePageModule)
  },
  {
    path: 'location-page',
    loadChildren: () => import('./pages/location-page/location-page.module').then( m => m.LocationPagePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
