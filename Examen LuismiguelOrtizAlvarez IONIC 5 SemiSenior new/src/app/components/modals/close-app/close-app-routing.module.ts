import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseAppPage } from './close-app.page';

const routes: Routes = [
  {
    path: '',
    component: CloseAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseAppPageRoutingModule {}
