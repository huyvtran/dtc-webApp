import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderAllPage } from './order-all';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    OrderAllPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderAllPage),
    MyNavComponentModule
  ],
})
export class OrderAllPageModule {}
