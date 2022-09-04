import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseAppPageRoutingModule } from './close-app-routing.module';

import { CloseAppPage } from './close-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseAppPageRoutingModule
  ],
  declarations: [CloseAppPage]
})
export class CloseAppPageModule {}
