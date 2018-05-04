import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseAddressPage } from './choose-address';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ChooseAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseAddressPage),
    MyNavComponentModule
  ],
})
export class ChooseAddressPageModule {}
