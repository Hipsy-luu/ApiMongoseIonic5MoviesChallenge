import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { FivPasswordInputModule  } from '@fivethree/core';
import { CustomComponentsModule } from '../../../components/customComponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    FivPasswordInputModule,
    CustomComponentsModule,
  ],
  declarations: [
    LoginPage,
  ],
})
export class LoginPageModule {}
