import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinCustomerPage } from './join-customer';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    JoinCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinCustomerPage),
    NgxQRCodeModule,
    MyNavComponentModule
  ],
})
export class JoinCustomerPageModule { }

