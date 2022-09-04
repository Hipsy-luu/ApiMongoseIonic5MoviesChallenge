import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullMoviePage } from './fullMovie.page';

const routes: Routes = [
  {
    path: '',
    component: FullMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullMoviePageRoutingModule {}
