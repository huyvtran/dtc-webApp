import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogisticsOrderPage } from './logistics-order';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    LogisticsOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(LogisticsOrderPage),
    MyNavComponentModule
  ],
})
export class LogisticsOrderPageModule {}
