import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { FivPasswordInputModule  } from '@fivethree/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CustomComponentsModule } from '../../../components/customComponents.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

/* import {NgxMaskIonicModule} from 'ngx-mask-ionic'; */


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterPageRoutingModule,
    FivPasswordInputModule,
    NgxMaskModule.forRoot(maskConfig),
    /* NgxMaskIonicModule.forRoot() */
    CustomComponentsModule,
  ],
  declarations: [
    RegisterPage,
  ]
})
export class RegisterPageModule {}
