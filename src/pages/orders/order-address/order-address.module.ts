import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderAddressPage } from './order-address';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    OrderAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderAddressPage),
    MyNavComponentModule
  ],
})
export class OrderAddressPageModule {}
