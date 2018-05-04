import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RejectOrderPage } from './reject-order';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    RejectOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(RejectOrderPage),
    MyNavComponentModule
  ],
})
export class RejectOrderPageModule {}
