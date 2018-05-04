import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseRecordPage } from './purchase-record';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    PurchaseRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseRecordPage),
    MyNavComponentModule
  ],
})
export class PurchaseRecordPageModule {}
