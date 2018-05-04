import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentVoucherPage } from './payment-voucher';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    PaymentVoucherPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentVoucherPage),
    MyNavComponentModule
  ],
})
export class PaymentVoucherPageModule {}
