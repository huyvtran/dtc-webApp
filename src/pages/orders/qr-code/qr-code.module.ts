import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodePage } from './qr-code';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    QrCodePage,
  ],
  imports: [
    IonicPageModule.forChild(QrCodePage),
    MyNavComponentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QrCodePageModule {}
