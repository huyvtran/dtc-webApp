import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoiceCustomerPage } from './choice-customer';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    ChoiceCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoiceCustomerPage),
    MyNavComponentModule
  ],
})
export class ChoiceCustomerPageModule {}
