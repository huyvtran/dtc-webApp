import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReturnOrderPage } from './return-order';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ReturnOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ReturnOrderPage),
    MyNavComponentModule
  ],
})
export class ReturnOrderPageModule {}
