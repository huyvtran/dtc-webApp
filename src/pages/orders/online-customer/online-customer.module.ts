import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineCustomerPage } from './online-customer';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    OnlineCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(OnlineCustomerPage),
    MyNavComponentModule
  ],
})
export class OnlineCustomerPageModule {}
