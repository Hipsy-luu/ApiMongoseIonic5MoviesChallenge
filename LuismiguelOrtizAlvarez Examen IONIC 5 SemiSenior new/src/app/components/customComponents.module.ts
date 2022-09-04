import { NavBarClientComponent } from './navigation/nav-bar-client/nav-bar-client.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfoReservedFooterComponent } from './footer/info-reserved-footer/info-reserved-footer.component';


import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LogoutPageModule } from './modals/fullMovie/fullMovie.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoutPageModule,

    NgxMaskModule.forRoot(maskConfig),
  ],
  /////////
  declarations: [
    NavBarClientComponent,
    InfoReservedFooterComponent,
  ],
  exports: [
    NavBarClientComponent,
    InfoReservedFooterComponent,
    LogoutPageModule,
  ]
})
export class CustomComponentsModule {}
