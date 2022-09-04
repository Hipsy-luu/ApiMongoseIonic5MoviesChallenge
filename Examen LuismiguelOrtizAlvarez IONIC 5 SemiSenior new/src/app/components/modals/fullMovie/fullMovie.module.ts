import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullMoviePageRoutingModule } from './fullMovie-routing.module';

import { FullMoviePage } from './fullMovie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullMoviePageRoutingModule
  ],
  declarations: [FullMoviePage],
  exports: [FullMoviePage]
})
export class LogoutPageModule {}
