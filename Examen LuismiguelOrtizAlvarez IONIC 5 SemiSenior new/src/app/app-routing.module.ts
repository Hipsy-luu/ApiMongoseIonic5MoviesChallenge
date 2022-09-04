import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  //Public & CMS
  {
    path: 'register',
    loadChildren: () => import('./views/public/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/public/login/login.module').then( m => m.LoginPageModule)
  },
  // Cliente
  {
    path: 'client/home',
    loadChildren: () => import('./views/users/client/home-client/home-client.module').then( m => m.HomeClientPageModule)
  },
  //MODALS
  {
    path: 'logout',
    loadChildren: () => import('./components/modals/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'close-app',
    loadChildren: () => import('./components/modals/close-app/close-app.module').then( m => m.CloseAppPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
