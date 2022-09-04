import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeClientPageRoutingModule } from './home-client-routing.module';
import { HomeClientPage } from './home-client.page';
import { CustomComponentsModule } from '../../../../components/customComponents.module';

import { NgbModule,NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeClientPageRoutingModule,
    CustomComponentsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  declarations: [
    HomeClientPage,
  ]
})
export class HomeClientPageModule {}
