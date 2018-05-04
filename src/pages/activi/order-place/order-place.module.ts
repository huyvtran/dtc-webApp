import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPlacePage } from './order-place';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    OrderPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPlacePage),
    MyNavComponentModule
  ],
})
export class OrderPlacePageModule {}
