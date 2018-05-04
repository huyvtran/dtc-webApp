import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiviCustomerPage } from './activi-customer';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    ActiviCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiviCustomerPage),
    MyNavComponentModule
  ],
})
export class ActiviCustomerPageModule {}
