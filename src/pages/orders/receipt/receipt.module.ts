import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptPage } from './receipt';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptPage),
    MyNavComponentModule
  ],
})
export class ReceiptPageModule {}
