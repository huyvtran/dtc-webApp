import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryPage } from './delivery';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    DeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryPage),
    MyNavComponentModule
  ],
})
export class DeliveryPageModule {}
