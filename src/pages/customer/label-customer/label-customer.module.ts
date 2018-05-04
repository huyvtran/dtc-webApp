import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabelCustomerPage } from './label-customer';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    LabelCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(LabelCustomerPage),
    MyNavComponentModule
  ],
})
export class LabelCustomerPageModule {}
